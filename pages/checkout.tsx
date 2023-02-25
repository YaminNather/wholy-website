import { NextPage } from "next";
import { CheckoutPageUI } from "../components/checkout_page/checkout_page_ui";
import { CheckoutPageController, CheckoutPageControllerContext } from "../components/checkout_page/checkout_page_controller";
import { Checkout, CouponAlreadyUsedException, CouponWithCodeNotAvailableException } from "../models/checkout";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Address as CheckoutPageAddress, createEmptyAddress } from "../components/checkout_page/address";
import { ContactInformation, createEmptyContactInformation } from "../components/checkout_page/contact_information";
import { loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import CartBridge from "../models/cart_bridge";
import { User, getAuth } from "firebase/auth";
import CartItem from "../models/cart_item";
import { PriceDetails, createEmptyPriceDetails } from "../components/checkout_page/price_details";
import { OpenPanelResponse, RazorpayClient } from "../razorpay_client/razorpay_client";
import { CreateOrderResponse } from "../razorpay_client/models/create_order_response";
import { CompleteCheckoutOptions, OrdersService } from "../models/orders_service";
import { OrderBridge } from "../models/order_bridge";
import { NextRouter, useRouter } from "next/router";
import { StoredAddressBridge } from "../models/last_ordered_address_bridge";
import { FirebaseLastOrderedAddressBridge } from "../models/firebase_last_ordered_address_bridge";
import { Address } from "../models/address"
;
import { FirebaseCheckout } from "../models/firebase_checkout";
import { CartService } from "../models/cart_service";
const CheckoutPage: NextPage = () => {
    const router: NextRouter = useRouter();

    const loadingIndicatorController = useContext(loadingIndicatorModalWrapperDataContext)!;
    
    const checkoutRef = useRef<Checkout | null>(null);
    
    const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
    const [priceDetails, setPriceDetails] = useState<PriceDetails>(createEmptyPriceDetails());
    
    const [couponCode, setCouponCode] = useState<string>("");
    const [contactInformation, setContactInformation] = useState<ContactInformation>(createEmptyContactInformation());
    const [address, setAddress] = useState<CheckoutPageAddress>(createEmptyAddress());    

    const setIsLoading = useCallback(
        (value: boolean): void => loadingIndicatorController.setIsLoading(value),
        [loadingIndicatorController]
    );

    const updateStateFromCheckout = useCallback(
        ():void => {
            const checkout: Checkout = checkoutRef.current!;

            setCartItems(Object.values(checkout.cart.cartItems!));

            const newPriceDetails: PriceDetails = {
                cartPrice: checkout.cart.price,
                couponCode: (checkout.couponCode === "") ? undefined : checkout.couponCode,
                couponCodeDiscountPrice: checkout.getCouponCodeDiscount(),
                shippingCost: checkout.getShippingMethodCost(),
                totalPrice: checkout.totalPrice
            };
            setPriceDetails(newPriceDetails);
        },
        []
    );

    const prefillFields = useCallback(
        (): void => {
            const contactInformation: ContactInformation = {
                firstName: "Yamin",
                lastName: "Nather",
                email: "yamin@cynfas.com",
                phone: "7598385116"
            };
            setContactInformation(contactInformation);

            const address: CheckoutPageAddress = {
                streetAddress0: "14-4-2, Old Hospital Street",
                streetAddress1: "Uthamapalayam",
                city: "Theni",
                pinCode: "625533",
                state: "Tamil Nadu"
            };
            setAddress(address);
        },
        []
    );

    const initialize = useCallback(
        async (): Promise<void> => {
            if(typeof(window) === "undefined" || getAuth().currentUser === null) return;            
                        
            setIsLoading(true);

            const cart: CartBridge = await (new CartService()).getCart();
            checkoutRef.current = new FirebaseCheckout(cart);

            await cart.pullDatabaseInfo();
            updateStateFromCheckout();

            const user: User = getAuth().currentUser!;
            setContactInformation({...createEmptyContactInformation(), email: user.email!});


            
            // prefillFields();
            
            const storedAddress: StoredAddressBridge = new FirebaseLastOrderedAddressBridge();
            await storedAddress.pullFromDatabase();
            if(storedAddress.address !== undefined) {
                const uiAddress: CheckoutPageAddress = {
                    streetAddress0: storedAddress.address.streetAddress0,
                    streetAddress1: storedAddress.address.streetAddress1,
                    city: storedAddress.address.city,
                    state: storedAddress.address.state,
                    pinCode: storedAddress.address.pinCode.toString()

                };
                setAddress(uiAddress);
            }
            
            setIsLoading(false);
        },
        [updateStateFromCheckout]
    );

    const onApplyCouponCodeButtonClicked = useCallback(
        async (): Promise<void> => {
            const checkout: Checkout = checkoutRef.current!;

            loadingIndicatorController.setIsLoading(true);
            
            try {
                await checkout.applyCoupon(couponCode);
            }
            catch (exception) {
                if (exception instanceof CouponWithCodeNotAvailableException) {
                    alert("Coupon with code is not available.");
                }
                else if (exception instanceof CouponAlreadyUsedException) {
                    alert("Coupon already used.");
                }

                setIsLoading(false);
                return;
            }
            updateStateFromCheckout();

            loadingIndicatorController.setIsLoading(false);
        },
        [couponCode, updateStateFromCheckout]
    );

    const onConfirmAndPayButtonClicked = useCallback(
        async (): Promise<void> => {
            const checkout: Checkout = checkoutRef.current!;

            if (contactInformation.phone.length !== 10) {
                alert("Enter valid phone number.");
                return;
            }

            if (address.pinCode.length !== 6 || address.pinCode[0] === "0") {
                alert("Enter a valid pin code.");
                return;
            }

            setIsLoading(true);

            const razorpayClient: RazorpayClient = new RazorpayClient();
            const createOrderResponse: CreateOrderResponse = await razorpayClient.createOrder(priceDetails.totalPrice * 100);

            const fullName: string = contactInformation.firstName + contactInformation.lastName;

            const openPanelResponse: OpenPanelResponse | undefined = await razorpayClient.openPanel({
                orderId: createOrderResponse.id,
                amount: createOrderResponse.amount,
                prefill: {
                    name: fullName,
                    contact: contactInformation.phone,
                    email: contactInformation.email
                },
            });
            
            if(openPanelResponse === undefined) {
                alert("Payment cancelled");
                return;
            }
            
            const ordersService: OrdersService = new OrdersService();
            const completeCheckoutOptions: CompleteCheckoutOptions = {
                firstName: contactInformation.firstName,
                lastName: contactInformation.lastName,
                address: new Address(address.streetAddress0, address.streetAddress1, address.city, address.state, Number(address.pinCode)),
                checkout: checkout,
                email: contactInformation.email,
                phone: contactInformation.phone
            };
            const order: OrderBridge = await ordersService.completeCheckout(completeCheckoutOptions);
            
            setIsLoading(false);

            router.push(`/order-confirmation?order=${order.id}`);
        },
        [contactInformation, address, priceDetails]
    );

    const isConfirmAndPayButtonDisabled = useCallback(
        (): boolean => {
            if(cartItems == undefined || cartItems!.length === 0) return true;
        
            if(contactInformation.email.length === 0) return true;
            
            if(contactInformation.firstName.length === 0) return true;
            
            if(address.streetAddress0.length === 0) return true;

            if (address.streetAddress1.length == 0) return true;
            
            if(address.city.length === 0) return true;                        
            
            if(address.pinCode.length === 0) return true;
            
            return false;
        },
        [cartItems, contactInformation, address]
    );

    useEffect(
        (): void => {
            initialize();
        },
        []
    );

    if (checkoutRef.current === null) return <></>;

    const controller: CheckoutPageController = {
        isLoading: loadingIndicatorController.isLoading,
        setIsLoading: (value) => loadingIndicatorController.setIsLoading(value),

        checkout: checkoutRef.current,
        cartItems: cartItems,
        priceDetails: priceDetails,
        
        couponCode: couponCode,
        setCouponCode: (value) => setCouponCode(value),
        onApplyCouponCodeButtonClicked: onApplyCouponCodeButtonClicked,
        
        contactInformation: contactInformation,
        setContactInformation: (value) => setContactInformation(value),
        
        address: address,
        setAddress: (value) => setAddress(value),

        onConfirmAndPayButtonClicked: onConfirmAndPayButtonClicked,
        isConfirmAndPayButtonDisabled: isConfirmAndPayButtonDisabled
    };
    
    return (
        <CheckoutPageControllerContext.Provider value={controller}>
            <CheckoutPageUI />
        </CheckoutPageControllerContext.Provider>
    );
};

export default CheckoutPage;
import { NextPage } from "next";
import { CheckoutPageUI } from "../components/checkout_page/checkout_page_ui";
import { CheckoutPageController, CheckoutPageControllerContext } from "../components/checkout_page/checkout_page_controller";
import { Checkout, CouponAlreadyUsedException, CouponNotAppliedException, CouponWithCodeNotAvailableException } from "../models/checkout";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Address as CheckoutPageAddress, createEmptyAddress } from "../components/checkout_page/address";
import { ContactInformation, createEmptyContactInformation } from "../components/checkout_page/contact_information";
import { loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import CartBridge from "../models/cart_bridge";
import { Unsubscribe, User, getAuth } from "firebase/auth";
import CartItem from "../models/cart_item";
import { PriceDetails, createEmptyPriceDetails } from "../components/checkout_page/price_details";
import { CompleteCheckoutOptions, OrdersService } from "../models/orders_service";
import { OrderBridge } from "../models/order_bridge";
import { NextRouter, useRouter } from "next/router";
import { StoredAddressBridge } from "../models/last_ordered_address_bridge";
import { FirebaseLastOrderedAddressBridge } from "../models/firebase_last_ordered_address_bridge";
import { Address } from "../models/address"
;
import { FirebaseCheckout } from "../models/firebase_checkout";
import { CartService } from "../models/cart_service";
import { AuthenticationService } from "../models/authentication_service";
import { useIsFirstRender } from "../ui_helpers/is_first_render/use_is_first_render";
import FirebaseCartBridge from "../models/firebase_cart_bridge";
import { IPaymentService } from "../services/i_payment_service";
import { OpenPortalOptions, StripePaymentService } from "../services/stripe_payment_service";
import { PaymentIntent } from "@stripe/stripe-js";
import { BackendClient, Stripe } from "backend_client";


const CheckoutPage: NextPage = () => {
    const isFirstRender = useIsFirstRender();

    const router: NextRouter = useRouter();

    const loadingIndicatorController = useContext(loadingIndicatorModalWrapperDataContext)!;
    const cartService = useMemo((): CartService => new CartService(), []);
    
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

    const onAuthStateChangedListenerExecutionCount = useRef<number>(0);

    const updateStateFromCheckout = useCallback(
        ():void => {
            const checkout: Checkout = checkoutRef.current!;

            const cartItems: CartItem[] = checkout.cart.cartItems;
            setCartItems(cartItems);

            let couponCode: string = "";
            let couponDiscount: number = 0.0;
            
            if (checkout.isUsingCouponCode) {
                couponCode = checkout.couponCodeName;
                couponDiscount = checkout.getCouponCodeDiscount();
            }

            const newPriceDetails: PriceDetails = {
                cartPrice: checkout.cart.price,
                couponCode: couponCode,
                couponCodeDiscountPrice: couponDiscount,
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

    const onLoginSetup = useCallback(
        async (): Promise<void> => {
            const user: User = getAuth().currentUser!;
            setContactInformation({...contactInformation, email: user.email!});

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
        },
        [contactInformation]
    );

    const onAuthStateChangedListener = useCallback(
        (): void => {
            if (!isFirstRender && onAuthStateChangedListenerExecutionCount.current === 0) {
                ++onAuthStateChangedListenerExecutionCount.current;
                return;
            }

            async function asyncPart(): Promise<void> {
                loadingIndicatorController.setIsLoading(true);
                
                const cart: CartBridge = await cartService.getCart();
                checkoutRef.current = new FirebaseCheckout(cart);
                
                await cart.pullDatabaseInfo();
                
                if (getAuth().currentUser !== null) await onLoginSetup();

                updateStateFromCheckout();

                loadingIndicatorController.setIsLoading(false);

                ++onAuthStateChangedListenerExecutionCount.current;
            }

            asyncPart();
        },
        [contactInformation, onLoginSetup]
    );

    const initialize = useCallback(
        async (): Promise<void> => {
            if(typeof(window) === "undefined") return;
                        
            setIsLoading(true);

            const cart: CartBridge = await (new CartService()).getCart();
            checkoutRef.current = new FirebaseCheckout(cart);

            await cart.pullDatabaseInfo();
            updateStateFromCheckout();

            const user: User | null = getAuth().currentUser;
            if (user !== null) {
                onLoginSetup();
            }
            else {
                setContactInformation(createEmptyContactInformation());
            }
            
            setIsLoading(false);
        },
        [contactInformation, updateStateFromCheckout, onAuthStateChangedListener]
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

    const onRemoveCouponCodeButtonClicked = useCallback(
        (): void => {
            checkoutRef.current!.removeCoupon();
            setCouponCode("");
            updateStateFromCheckout();
        },
        []
    );

    const onConfirmAndPayButtonClicked = useCallback(
        async (): Promise<void> => {
            const checkout: Checkout = checkoutRef.current!;

            if (contactInformation.phone[0] === "+") {
                alert("Do not include country code with phone number");
                return;
            }

            if (contactInformation.phone.length !== 10) {
                alert("Enter a valid phone number.");
                return;
            }

            if (address.pinCode.length !== 6 || address.pinCode[0] === "0") {
                alert("Enter a valid pin code.");
                return;
            }

            setIsLoading(true);

            const backendStripeClient: Stripe = BackendClient.instance.stripe;
            const paymentIntent: PaymentIntent = await backendStripeClient.createPaymentIntent(priceDetails.totalPrice * 100.0);
            
            const paymentService: IPaymentService = new StripePaymentService();
            let openPortalResponse: boolean | undefined;
            try {
                openPortalResponse = await paymentService.openPortal(new OpenPortalOptions(paymentIntent.client_secret!));
            }
            catch(exception) {
                console.log(`CustomLog: Payment through portal failed due to ${exception}`);
                alert("Payment failed");
                setIsLoading(false);
                return;
            }
            
            if(openPortalResponse === undefined) {
                alert("Payment cancelled");
                setIsLoading(false);
                return;
            }
            
            console.log(`CustomLog: Payment completed successfully`);
            
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

    const isGoogleSignInButtonVisible = useCallback((): boolean => getAuth().currentUser === null, []);

    const onGoogleSignInButtonClicked = useCallback(
        async (): Promise<void> => {
            const authenticationService: AuthenticationService = new AuthenticationService();
            
            loadingIndicatorController.setIsLoading(true);
            let user: User;
            try {
                user = await authenticationService.signInWithGoogle();
            }
            catch(exception) {
                alert(`Failed to sign up`);
                loadingIndicatorController.setIsLoading(false);
                return;
            }

            const cart: CartBridge = await new FirebaseCartBridge(user.uid);
            await cart.pullDatabaseInfo();
            const localCart: CartBridge = await cartService.getLocalCart();

            await cart.mergeCart(localCart);
            await localCart.clear();
            setCartItems(cart.cartItems);

            loadingIndicatorController.setIsLoading(false);
        },
        []
    );    

    // useEffect(
    //     (): void => {
    //         initialize();
    //     },
    //     []
    // );

    useEffect(
        () => {
            onAuthStateChangedListenerExecutionCount.current = 0;
            const unsubscriber: Unsubscribe = getAuth().onAuthStateChanged(onAuthStateChangedListener);

            return () => unsubscriber();
        },
        [onAuthStateChangedListener]
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
        isConfirmAndPayButtonDisabled: isConfirmAndPayButtonDisabled,

        isGoogleSignInButtonVisible: isGoogleSignInButtonVisible,
        onGoogleSignInButtonClicked: onGoogleSignInButtonClicked,
        onRemoveCouponCodeButtonClicked: onRemoveCouponCodeButtonClicked
    };
    
    return (
        <CheckoutPageControllerContext.Provider value={controller}>
            <CheckoutPageUI />
        </CheckoutPageControllerContext.Provider>
    );
};

export default CheckoutPage;
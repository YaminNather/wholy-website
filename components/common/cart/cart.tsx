import { NextRouter, useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import CartItem from "../../../models/cart_item";
import { TotalPriceInfoAreaDetails } from "../../checkout_page/checkout_section/total_price_info_area/total_price_info_area";
import { Checkout, CouponAlreadyUsedException, CouponWithCodeNotAvailableException } from "../../../models/checkout";
import { FirebaseCheckout } from "../../../models/firebase_checkout";
import FirebaseCartBridge from "../../../models/firebase_cart_bridge";
import { CartController, CartControllerContext } from "./cart_controller";
import { OpenPanelResponse, RazorpayClient } from "../../../razorpay_client/razorpay_client";
import { CreateOrderResponse } from "../../../razorpay_client/models/create_order_response";
import { OrdersService } from "../../../models/orders_service";
import { OrderBridge } from "../../../models/order_bridge";
import CartBridge from "../../../models/cart_bridge";
import { User, getAuth } from "firebase/auth";
import { CartUI } from "./cart_ui";
import { Address } from "./address";

export interface CartProps {
    isOpen: boolean;
    onCloseButtonClicked?: ()=>void;
    onOpen?: ()=>void;
    onClose?: ()=>void;
}

export const Cart: FC<CartProps> = (props) => {
    const router: NextRouter = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [pulledFromDatabase, setPulledFromDatabase] = useState<boolean>(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const [priceInfoAreaDetails, setPriceInfoAreaDetails] = useState<TotalPriceInfoAreaDetails>(
        {
            couponCodeDiscountPrice: 0.0,
            shippingCost: 0.0,
            totalPrice: 0.0
        }
    );
    
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<Address>(
        {
            streetAddress0: "",
            streetAddress1: "",
            city: "",
            state: "",
            postalCode: ""
        }
    );

    const [couponCode, setCouponCode] = useState<string>("");

    const checkout: Checkout = useMemo(() => new FirebaseCheckout(new FirebaseCartBridge()), []);

    const updateStateFromCheckout = useCallback(
        ():void => {
            setCartItems(Object.values(checkout.cart.cartItems!));

            const priceInfoAreaDetails: TotalPriceInfoAreaDetails = {
                couponCodeDiscountPrice: checkout.getCouponCodeDiscount(),
                shippingCost: checkout.getShippingMethodCost(),
                totalPrice: checkout.totalPrice
            };
            setPriceInfoAreaDetails(priceInfoAreaDetails);
        },
        [checkout, setCartItems, setPriceInfoAreaDetails]
    );

    const initialize = useCallback(
        async () => {
            const cart: CartBridge = checkout.cart;

            if(typeof(window) === "undefined" || getAuth().currentUser === null) return;
            
            setIsLoading(true);
            
            await cart.pullDatabaseInfo();
            setPulledFromDatabase(true);
            
            updateStateFromCheckout();
            checkout.setOnChangeListener(() => updateStateFromCheckout());


            // if(router.query["from"] === "authentication" && router.query["action"] === "buy-now") {
            //     const productId: string = router.query["product"] as string;
            //     await cart.addProduct(productId, 1);
            // }

            const user: User = getAuth().currentUser!;
            setEmail(user.email!);


            setIsLoading(false);            
        },
        [checkout, setIsLoading, router, setIsLoading, setPulledFromDatabase, updateStateFromCheckout]
    );

    const onApplyCouponCodeButtonClicked = useCallback(
        async (): Promise<void> => {
            setIsLoading(true);
            
            try {
                await checkout.applyCoupon(couponCode);
            }
            catch(exception) {
                if(exception instanceof CouponWithCodeNotAvailableException) {
                    alert("Coupon code not available!");
                }
                else if(exception instanceof CouponAlreadyUsedException) {
                    alert("Coupon code has already been used!");
                }
                else {
                    console.error(exception);
                }
            }                        
            
            setIsLoading(false);
        },
        [couponCode]
    );

    const onPlaceOrderButtonClicked = useCallback(
        async (): Promise<void> => {
            setIsLoading(true);

            const razorpayClient: RazorpayClient = new RazorpayClient();
            const createOrderResponse: CreateOrderResponse = await razorpayClient.createOrder(checkout.totalPrice * 100);
            const openPanelResponse: OpenPanelResponse | undefined = await razorpayClient.openPanel({
                orderId: createOrderResponse.id,
                amount: createOrderResponse.amount,
                prefill: {
                    name: fullName,
                    contact: "7598385116",
                    email: email
                },
            });
            
            if(openPanelResponse === undefined) {
                alert("Payment cancelled");
                return;
            }
            
            const ordersService: OrdersService = new OrdersService();
            const order: OrderBridge = await ordersService.completeCheckout({
                firstName: fullName.split(" ")[0],
                lastName: fullName.split(" ")[1],
                address: {
                    streetAddress: `${address.streetAddress0},${address.streetAddress1}`,
                    city: address.city,
                    pinCode: Number(address.postalCode),
                    state: address.state,                
                },
                checkout: checkout,
                email: email,
                phone: phone
            });
            
            setIsLoading(false);

            router.push(`/order-confirmation?order=${order.id}`);
        },
        []
    );

    const isPlaceOrderButtonDisabled = useCallback(
        (): boolean => {
            if(cartItems.length === 0) return true;
        
            if(email.length === 0) return true;
            
            if(fullName.length === 0) return true;
            
            if(address.streetAddress0.length === 0) return true;
            
            if(address.city.length === 0) return true;
            
            if(address.state.length === 0) return true;
            
            if(address.postalCode.length === 0) return true;
            
            return false;
        },
        [cartItems, email, fullName, address]
    ); 
    
    const onCloseButtonClicked = useCallback(
        (): void => {
            props.onCloseButtonClicked?.();
        },
        [props.onCloseButtonClicked]
    );

    const onDecreaseQuantityButtonClicked = useCallback(
        async (cartItem: CartItem): Promise<void> => {
            setIsLoading(true);
            
            await checkout.cart.removeProduct(cartItem.product.id, 1);
            
            setIsLoading(false);
        },
        []
    );
        
        const onIncreaseQuantityButtonClicked = useCallback(
            async (cartItem: CartItem): Promise<void> => {
            setIsLoading(true);
            
            await checkout.cart.addProduct(cartItem.product.id, 1);

            setIsLoading(false);
        },
        []
    );

    useEffect(
        (): void => {
            async function asyncPart(): Promise<void> {
                if (!pulledFromDatabase) return;

                setIsLoading(true);
                
                await checkout.cart.pullDatabaseInfo();
                
                setIsLoading(false);
            }

            asyncPart();
        },
        [props.isOpen]
    );

    const controller: CartController = {
        onOpen: props.onOpen,
        onClose: props.onClose,

        isOpen: props.isOpen,

        onCreated: initialize,

        pulledFromDatabase: pulledFromDatabase,
        setPulledFromDatabase: setPulledFromDatabase,
    
        checkout: checkout,
        
        cartItems: cartItems,        
        setCartItems: setCartItems,

        couponCode: couponCode,
        onCouponCodeFieldChanged: setCouponCode,

        isLoading: isLoading,

        onApplyCouponCodeButtonClicked: onApplyCouponCodeButtonClicked,

        fullName: fullName,
        onFullNameChanged: setFullName,
        
        email: email,
        onEmailChanged: setEmail,

        address: address,
        onAddressChanged: setAddress,

        phone: phone,
        onPhoneChanged: setPhone,        

        totalPriceInfoAreaDetails: priceInfoAreaDetails,
        setPriceInfoAreaDetails: setPriceInfoAreaDetails,

        isPlaceOrderButtonDisabled: isPlaceOrderButtonDisabled(),
        onPlaceOrderButtonClicked: onPlaceOrderButtonClicked,

        onCloseButtonClicked: onCloseButtonClicked,

        onDecreaseQuantityButtonClicked: onDecreaseQuantityButtonClicked,
        onIncreaseQuantityButtonClicked: onIncreaseQuantityButtonClicked 
    };

    return (
        <CartControllerContext.Provider value={controller}>
            <CartUI />
        </CartControllerContext.Provider>
    );
};
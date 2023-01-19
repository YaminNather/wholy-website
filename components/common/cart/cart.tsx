import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Checkout, CouponAlreadyUsedException, CouponWithCodeNotAvailableException } from "../../../models/checkout";
import { FirebaseCheckout } from "../../../models/firebase_checkout";
import FirebaseCartBridge from "../../../models/firebase_cart_bridge";
import { CheckoutSectionAddress } from "../../checkout_page/checkout_section/checkout_section";
import { TotalPriceInfoAreaDetails } from "../../checkout_page/checkout_section/total_price_info_area/total_price_info_area";
import CartItem from "../../../models/cart_item";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../../loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import { NextRouter, useRouter } from "next/router";

import { OpenPanelResponse, RazorpayClient } from "../../../razorpay_client/razorpay_client";
import { CreateOrderResponse } from "../../../razorpay_client/models/create_order_response";
import { OrdersService } from "../../../models/orders_service";
import { OrderBridge } from "../../../models/order_bridge";
import CartBridge from "../../../models/cart_bridge";
import { User, getAuth } from "@firebase/auth";
import { cartPageDataContext } from "./checkout_page_data";

import styles from "./cart_styles.module.scss";

export const Cart: FC = (props) => {
    const router: NextRouter = useRouter();

    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;

    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    const [pulledFromDatabase, setPulledFromDatabase] = useState<boolean>(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const [totalPriceInfoAreaDetails, setTotalPriceInfoAreaDetails] = useState<TotalPriceInfoAreaDetails>(
        {
            couponCodeDiscountPrice: 0.0,
            shippingCost: 0.0,
            totalPrice: 0.0
        }
    );
    
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<CheckoutSectionAddress>(
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

    const onApplyCouponCodeButtonClicked = useCallback(
        async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);
            
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
            
            loadingIndicatorData.setIsLoading(false);
        },
        [couponCode]
    );

    const onClickPlaceOrderButton = useCallback(
        async (): Promise<void> => {
            loadingIndicatorData.setIsLoading(true);

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
            
            loadingIndicatorData.setIsLoading(false);

            router.push(`/order-confirmation?order=${order.id}`);
        },
        []
    );
    
    useEffect(
        () => {
            const asyncPart = async (): Promise<void> => {
                const cart: CartBridge = checkout.cart;

                if(typeof(window) === "undefined" || getAuth().currentUser === null) return;
                
                loadingIndicatorData.setIsLoading(true);
                await cart.pullDatabaseInfo();

                if(router.query["from"] === "authentication" && router.query["action"] === "buy-now") {
                    const productId: string = router.query["product"] as string;
                    await cart.addProduct(productId, 1);
                }

                const user: User | null = getAuth().currentUser;
                if(user !== null) setEmail(user.email!);

                loadingIndicatorData.setIsLoading(false);
                setPulledFromDatabase(true);
            }

            asyncPart();
        },
        []
    );

    useEffect(
        () => {
            checkout.setOnChangeListener(() => {
                setCartItems(Object.values(checkout.cart.cartItems!));
                const totalPriceInfoAreaDetails: TotalPriceInfoAreaDetails = {
                    couponCodeDiscountPrice: checkout.getCouponCodeDiscount(),
                    shippingCost: checkout.getShippingMethodCost(),
                    totalPrice: checkout.totalPrice
                };
                setTotalPriceInfoAreaDetails(totalPriceInfoAreaDetails);
            });

            return () => checkout.removeOnChangeListener();
        }
    );

    

    if(!pulledFromDatabase) return <></>;
    
    console.log(`CustomLog: Full Name = ${fullName}`);
    console.log(`CustomLog: Email = ${email}`);

    return (
        <>
            <cartPageDataContext.Provider 
                value={{ 
                    checkout: checkout, 
                    cartItems: cartItems, setCartItems: setCartItems, 
                    onApplyCouponCodeButtonClicked: onApplyCouponCodeButtonClicked 
                }}
            >
                <CheckoutSection
                    fullName={fullName}
                    onFullNameChanged={(newFullName) => setFullName(newFullName)}
                    phone={phone}
                    onPhoneChanged={(newPhone) => setPhone(newPhone)}
                    email={email}
                    onEmailChanged={(newEmail) => setEmail(newEmail)}
                    address={address}
                    onAddressChanged={(newAddress) => setAddress(newAddress)}
                    couponCode={couponCode}
                    onCouponCodeChanged={(newCouponCode) => setCouponCode(newCouponCode)}
                    // shippingMethod={shippingMethod}
                    // onShippingMethodChanged={(newShippingMethod) => setShippingMethod(newShippingMethod)}
                    totalPriceInfoAreaDetails={totalPriceInfoAreaDetails}
                    onClickPlaceOrderButton={onClickPlaceOrderButton}
                />

            </cartPageDataContext.Provider>
        </>
    );
};
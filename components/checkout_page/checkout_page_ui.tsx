import { FC } from "react";
import { StepperArea } from "./stepper_area/stepper_area";
import { NavBar } from "../common/nav_bar/nav_bar";
import styles from "./checkout_page_ui_styles.module.scss";
import { MainArea } from "./main_area/main_area";
import classNames from "classnames";

export const CheckoutPageUI: FC = () => {
    return (
        <div className={classNames("light_theme", styles.checkout_page)}>
            <NavBar />

            <StepperArea />

            <hr className={styles.divider} />

            <MainArea />
        </div>
    );
};
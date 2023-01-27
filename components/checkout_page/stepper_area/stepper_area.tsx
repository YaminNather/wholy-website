import { FC } from "react";
import styles from "./stepper_area_styles.module.scss";

import Steps from "rsuite/Steps";

import classNames from "classnames";
import { ProgressStepper } from "../../common/progress_stepper/progress_stepper";
import { Step } from "../../common/progress_stepper/step/step";

export const StepperArea: FC = (props) => {
    return (
        <div className={classNames("container", styles.stepper_area)}>
            <ProgressStepper currentStepIndex={1}>
                <Step index={0} label="CART" />
                
                <Step index={1} label="CHECKOUT" />
                
                <Step index={2} label="PAYMENT" />
            </ProgressStepper>
        </div>
    );
};
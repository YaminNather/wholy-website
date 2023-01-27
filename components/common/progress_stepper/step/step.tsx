import { FC, useContext } from "react";
import Image from "next/image";

import styles from "./step_styles.module.scss";
import { ProgressStepperData, ProgressStepperDataContext } from "../progress_stepper_data";
import classNames from "classnames";

import checkmarkVector from "../../../../public/common_icons/checkmark.svg";

export interface StepProps {
    index: number;
    label: string;
}

export const Step: FC<StepProps> = (props) => {
    const stepperData: ProgressStepperData = useContext(ProgressStepperDataContext)!;

    const indexIndicatorContainerClass: string = (props.index <= stepperData.currentStepIndex) ? styles._index_indicator_container_enabled: styles.index_indicator_container_disabled;

    return (
        <div className={styles.step}>
            <div className={classNames(styles.index_indicator_container, indexIndicatorContainerClass)}>
                <p style={{display: (props.index >= stepperData.currentStepIndex) ? undefined : "none"}} className={styles.index_label}>{props.index}</p>
                
                <Image 
                    src={checkmarkVector} alt="" 
                    style={{display: (props.index < stepperData.currentStepIndex) ? undefined : "none"}} 
                    className={styles.checkmark}
                />
            </div>

            <p className={styles.label}>{props.label}</p>
        </div>
    );
};
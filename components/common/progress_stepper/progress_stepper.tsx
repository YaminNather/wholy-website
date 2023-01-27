import { FC, PropsWithChildren } from "react";
import { ProgressStepperDataContext } from "./progress_stepper_data";

import styles from "./progress_stepper_styles.module.scss";

export interface ProgressStepperProps extends PropsWithChildren {
    currentStepIndex: number;
}

export const ProgressStepper: FC<ProgressStepperProps> = (props) => {
    return (
        <ProgressStepperDataContext.Provider value={{ currentStepIndex: props.currentStepIndex }}>
            <div className={styles.progress_stepper}>
                {props.children}

                <div className={styles.line} />
            </div>
        </ProgressStepperDataContext.Provider>
    );
};
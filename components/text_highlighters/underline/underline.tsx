import { FC, PropsWithChildren } from "react";
import Image, { StaticImageData } from "next/image";
import { yellowLineImage } from "../../../common_imported_images/text-highlighters";

import styles from "./underline_styles.module.scss";

interface InternalUnderlineProps extends PropsWithChildren {
    lineImage: StaticImageData | string;    
}

const Underline: FC<InternalUnderlineProps> = (props) => {
    return (
        <span className={styles.area}>
            {props.children}

            <Image src={props.lineImage} alt={""}  />
        </span>
    );
};

export const YellowUnderline: FC<PropsWithChildren> = (props) => {
    return (
        <Underline lineImage={yellowLineImage}>{props.children}</Underline>
    );
};
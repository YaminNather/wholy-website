import Image, { StaticImageData } from "next/image";
import { FC, PropsWithChildren } from "react";

import styles from "./strike_through_styles.module.scss";
import { yellowLineImage } from "../../../common_imported_images/text-highlighters";

interface StrikeThroughProps extends PropsWithChildren {
    lineImage: StaticImageData | string;
}

const StikeTrough: FC<StrikeThroughProps> = (props) => {
    return (
        <span className={styles.area}>
            {props.children}

            <Image src={props.lineImage} alt="" />
        </span>
    );
};

export const YellowStrikeThrough: FC<PropsWithChildren> = (props) => {
    return <StikeTrough lineImage={yellowLineImage}>{props.children}</StikeTrough>;
};
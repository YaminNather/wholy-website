import Image, { StaticImageData } from "next/image";
import { FC, PropsWithChildren } from "react";

import styles from "./circled_styles.module.scss";
import { yellowCircleImage } from "../../../common_imported_images/text-highlighters";

interface InternalCircledProps extends PropsWithChildren {
    circleImage: StaticImageData | string;
}

const InternalCircled: FC<InternalCircledProps> = (props) => {
    return (
        <span className={styles.area}>
            {props.children}

            <Image src={props.circleImage} alt="" />
        </span>
    );
};

export const YellowCircled: FC<PropsWithChildren> = (props) => {
    return <InternalCircled circleImage={yellowCircleImage}>{props.children}</InternalCircled>;
};
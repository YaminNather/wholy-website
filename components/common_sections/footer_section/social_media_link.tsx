import { CSSProperties, FC } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./social_media_link_styles.module.scss";
import classNames from "classnames";

export interface SocialMediaLinkProps {
    style?: CSSProperties;
    className?: string; 
    image: StaticImageData | string;
}

export const SocialMediaLink: FC<SocialMediaLinkProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.container, props.className)}>
            <Image src={props.image} alt="" />
        </div>
    );
};
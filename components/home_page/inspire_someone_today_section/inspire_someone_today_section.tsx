import { FC, ReactNode, useState } from "react";
import Image from "next/image";
import styles from "./inspire_someone_today_section_styles.module.scss";

import backgroundImage from "../../../public/yellow-textured-background.jpeg";
import paintStrokesImage from "../../../public/home/paint-strokes.png";
import classNames from "classnames";

const changingTexts: string[] = [    
    "workout",
    "meditate",
    "run",
    "change",
    "treat themselves",
    "check out Wholy"
];

export const InspireSomeoneTodaySection: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const [isRemoved, setIsRemoved] = useState<boolean>(false);

    const buildChangingText = (text: string, index: number): ReactNode => {
        return (
            <span
                className={styles.changing_text}
                style={{display: (currentTextIndex === index) ? undefined : "none"}}
                onAnimationEnd={(event) => {
                    console.log(`CustomLog: Animation on text[${index}] ended`);

                    if(currentTextIndex < changingTexts.length - 1)setCurrentTextIndex(currentTextIndex + 1);
                    else setIsOpen(false);
                }}
            >
                {text}

                <span className={styles.changing_text_overlay}>{text}</span>
            </span>
        );
    };

    return (
        <section 
            id="hero-section" 
            className={styles.inspire_someone_today_section} 
            style={{
                display: (isRemoved) ? "none" : "revert",
                animation: (!isOpen) ? `${styles.page_peel} 1000ms forwards` : "none"
            }}
            onAnimationEnd={(event) => {
                if(event.animationName === styles.page_peel) setIsRemoved(true);
            }}
        >
            <div className={styles.main_content}>
                <Image src={backgroundImage} alt={""} className="background_image" />
                
                <div className={classNames("container", styles.container)}>
                    <p>Go on inspire someone to</p>                    
                    
                    <div className={styles.bottom_area}>
                        <p className={styles.changing_text_container}>
                            {changingTexts.map((changingText, index, array) => buildChangingText(changingText, index))}

                            <Image src={paintStrokesImage} alt="" className={styles.paint_strokes} />
                        </p>

                        <span>today</span>
                    </div>
                </div>            

            </div>
            
            <div className={styles.papers_back} />
        </section>
    );
};
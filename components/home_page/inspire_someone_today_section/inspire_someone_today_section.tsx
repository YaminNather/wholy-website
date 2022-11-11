import { FC, useState } from "react";
import Image from "next/image";
import styles from "./inspire_someone_today_section_styles.module.scss";

import backgroundImage from "../../../public/yellow-textured-background.jpeg";
import paintStrokesImage from "../../../public/home/paint-strokes.png";
import classNames from "classnames";

const texts: string[] = [
    "Go on. Inspire someone today.",
    "Workout.",
    "Meditate.",
    "Run.",
    "Change.",
    "Treat Themselves.",
    "Check out Wholy"
];

export const InspireSomeoneTodaySection: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    return (
        <section 
            id="hero-section" 
            className={styles.inspire_someone_today_section} 
            style={{animation: (!isOpen) ? `${styles.page_peel} 1000ms forwards` : "none"}}
        >
            <div className={styles.main_content}>
                <Image src={backgroundImage} alt={""} className="background_image" />
                
                <div className={classNames("container", styles.container)}>
                    {texts.map(
                        (text, index, array) => {
                            return (
                                <p
                                    key={index} 
                                    style={{display: (currentTextIndex === index) ? "revert" : "none"}}
                                    onAnimationEnd={(event) => {
                                        console.log(`CustomLog: Animation on text[${index}] ended`);

                                        if(currentTextIndex < texts.length - 1)setCurrentTextIndex(currentTextIndex + 1);
                                        else setIsOpen(false);
                                    }}
                                >
                                    {text}
                                </p>
                            );
                        }
                    )}
                    
                    <div className={styles.bottom_area}>
                        <Image src={paintStrokesImage} alt="" className={styles.paint_strokes} />
                    </div>
                </div>            

            </div>
            
            <div className={styles.papers_back} />
        </section>
    );
};
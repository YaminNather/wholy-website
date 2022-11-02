import { NextPage } from "next";
import Link from "next/link";
import { BrandTileSection } from "../components/home_page/brand_tile_section/brand_tile_section";
import { InspireSomeoneTodaySection } from "../components/home_page/inspire_someone_today_section/inspire_someone_today_section";
import { ProductInfoSection } from "../components/home_page/product_info_section/product_info_section";
import { NavBar } from "../components/nav_bar/NavBar";

export const HomePage: NextPage = () => {
    if(typeof(window) !== "undefined") {
        console.log(`Window size = ${window.innerWidth}`);
    }

    return (
        <>
            <NavBar>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    
                    <li><Link href="/products">Products</Link></li>
                    
                    <li><Link href="/authentication">Sign up/Login</Link></li>
                </ul>
            </NavBar>

            <InspireSomeoneTodaySection />

            <BrandTileSection />

            <ProductInfoSection />
        </>
    );
};

export default HomePage;
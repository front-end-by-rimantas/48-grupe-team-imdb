import { CardsSection } from "../../components/home-sections/cards-section/CardsSection";
import { HeroSection } from "../../components/home-sections/hero-section/HeroSection";
import { InfoSection } from "../../components/home-sections/info-section/InfoSection";

export function PageHome () {
    return (
        <>
            <HeroSection/>
            <CardsSection/>
            <InfoSection/>
        </>
    );
}
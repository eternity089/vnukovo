import HeroSection from "./sections/HeroSection.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import GallerySection from "./sections/GallerySection.jsx";
import ReviewSection from "./sections/ReviewSection.jsx";
import FAQSection from "./sections/FAQSection.jsx";

export default function Home(){
    return(
        <main className="overflow-x-hidden">
            <HeroSection/>
            <AboutSection/>
            <GallerySection/>
            <ReviewSection/>
            <FAQSection/>
        </main>
    )
}
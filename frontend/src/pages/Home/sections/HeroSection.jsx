import MainPage from "../../../assets/img/main-page.png"
import Button from "../../../components/ui/Button/Button.jsx";
import {Link} from "react-router-dom";

export default function HeroSection(){
    return(
        <section className="relative h-screen bg-cover bg-center" style={{backgroundImage: `url(${MainPage}`}}>
            <div className="absolute inset-0 bg-black/30">
                <div className="relative z-10 h-full flex flex-col items-center justify-center pt-80 text-center px-4">
                    <h3 className="text-white text-inter text-lg font-light sm:text-xl lg:text-2xl">Место уединения с природой</h3>
                    <h1 className="text-white mt-2 text-5xl font-extralight sm:text-6xl lg:text-7xl">Хутор Внуково</h1>
                    <Link to="/services">
                        <Button variant="outline" classname="mt-8">Подробнее</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
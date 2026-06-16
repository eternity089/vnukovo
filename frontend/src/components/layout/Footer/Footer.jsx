import Container from "../../ui/Container/Container.jsx";
import {Link} from "react-router-dom";
import logo from "../../../assets/icons/logo.png"
import vk from "../../../assets/icons/vk.png"
import {navigationLinks} from "../Header/navigation.js";
import Button from "../../ui/Button/Button.jsx";

export default function Footer(){
    return(
        <footer className="bg-hover py-12 text-white">
            <Container>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-10 lg:flex-row items-center lg:items-start lg:justify-between">
                        <Link to="/" className="w-fit">
                            <img src={logo} alt="Логотип" className="w-16 h-16 rounded-full object-cover"/>
                        </Link>
                        <div className="flex flex-col gap-10 sm:flex-row w-11/12 sm:justify-between lg:w-2/3">
                            <nav className="flex flex-col gap-5">
                                {navigationLinks.slice(0,3).map((link) => (
                                    <Link to={link.path} key={link.path} className="group relative">{link.label}
                                    <div className="absolute h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></div></Link>
                                ))}
                            </nav>
                            <nav className="flex flex-col gap-5">
                                {navigationLinks.slice(3).map((link) => (
                                    <Link to={link.path} key={link.path} className="group relative">{link.label}
                                    <div className="absolute h-px w-0 bg-white transition-all duration-300 group-hover:w-full"></div></Link>
                                ))}
                            </nav>
                            <div>
                                <Button variant="outline" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Наверх</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 border-t border-white/20 pt-6 md:flex-row items-center md:justify-between">
                        <a href="https://vk.com/hutor_vnukovo?from=groups" target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3">
                            <img src={vk} alt="VK" className="h-6 w-6"/>
                            <span className="text-white">Мы ВКонтакте</span>
                            <div className="absolute h-px w-0 -bottom-2 bg-white transition-all duration-300 group-hover:w-full"></div>
                        </a>
                        <Link to={'privacy_policy'}>Политика конфиденциальности</Link>
                        <Link to={'privacy_agreement'}>Пользовательское соглашение</Link>
                        <span className="text-sm text-white"> © Хутор Внуково, 2026</span>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
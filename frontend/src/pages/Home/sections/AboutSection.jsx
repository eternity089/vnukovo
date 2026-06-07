import aboutImg from "../../../assets/img/main-gallery/firstpage.png"
import Container from "../../../components/ui/Container/Container.jsx";

export default function AboutSection(){
    return (
        <Container className="mt-16">


        <section className="flex flex-row items-center justify-center">
            <div className="w-9/10 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-40">
                <img src={aboutImg} alt=""/>
                <div className="lg:w-1/3">
                    <h2>О хуторе Внуково</h2>
                    <p>Хутор Внуково — это уютный комплекс деревянных домиков и бань для тех, кто ценит тишину и единение с
                        природой. Мы создали идеальное место для отдыха от городской суеты, где можно наслаждаться панорамным видом
                        на живописную реку и бескрайний лес.
                        Приезжайте, чтобы провести время с близкими, попариться в бане с целебным ароматом дубового веника и
                        зарядиться энергией природы. Ваш идеальный отпуск начинается здесь!</p>
                </div>
            </div>
        </section>
        </Container>
    )
}
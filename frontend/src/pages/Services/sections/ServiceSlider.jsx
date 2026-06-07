import Slider from "../components/Slider.jsx";
import img1 from "../../../assets/img/price-gallery/slide1.png";
import img2 from "../../../assets/img/price-gallery/slide2.png";
import img3 from "../../../assets/img/price-gallery/slide3.png";
import img4 from "../../../assets/img/price-gallery/slide4.png";
import img5 from "../../../assets/img/price-gallery/slide5.png";
import img6 from "../../../assets/img/price-gallery/slide6.png";
import img7 from "../../../assets/img/price-gallery/slide7.png";
import Container from "../../../components/ui/Container/Container.jsx";

export default function ServiceSlider(){
    const images = [img1, img2,img3,img4,img5,img6,img7]
    return(
        <Container>
            <Slider images={images}/>
        </Container>
    )
}
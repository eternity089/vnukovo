import Button from "../../../components/ui/Button/Button.jsx";
import div1 from "../../../assets/img/main-gallery/gallery1.png"
import div2 from "../../../assets/img/main-gallery/gallery2.png"
import div3 from "../../../assets/img/main-gallery/gallery3.png"
import div4 from "../../../assets/img/main-gallery/gallery4.png"
import div5 from "../../../assets/img/main-gallery/gallery5.png"
import div6 from "../../../assets/img/main-gallery/gallery6.png"
import Container from "../../../components/ui/Container/Container.jsx";
import {Link} from "react-router-dom";

export default function GallerySection(){
  return(
        <section className="flex py-12 mt-12 flex-col items-center gallery bg-bg">
          <h2 className="text-center">Галерея счастливых моментов</h2>
          <div className="gallery-container mt-15 flex flex-col sm:grid sm:grid-cols-6 sm:grid-rows-9 gap-x-[2vw] gap-y-[2vh] items-end">
            <div className="div1 w-[90vw] sm:w-[30vw] sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-6"><img src={div1} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div2 w-[90vw] sm:w-[30vw] sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-5"><img src={div2} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div3 w-[90vw] sm:w-[30vw] sm:col-start-5 sm:col-end-7 sm:row-start-2 sm:row-end-6"><img src={div3} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div4 w-[90vw] sm:w-[30vw] sm:col-start-1 sm:col-end-3 sm:row-start-6 sm:row-end-10"><img src={div4} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div5 w-[90vw] sm:w-[30vw] sm:col-start-3 sm:col-end-5 sm:row-start-5 sm:row-end-9"><img src={div5} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div6 w-[90vw] sm:w-[30vw] sm:col-start-5 sm:col-end-7 sm:row-start-6 sm:row-end-10"><img src={div6} className="w-full h-full" loading="lazy" alt=""></img></div>
            <div className="div7 w-[90vw] sm:w-[30vw] sm:col-start-3 sm:col-end-5 sm:row-start-9 sm:row-end-10 flex justify-center items-start">
                <Link to="/gallery" className="lg:w-1/3"><Button variant="primary"classname="w-full">Галерея</Button></Link></div>
          </div>
        </section>
  )
}
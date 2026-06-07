import {useRef} from "react";

export default function Slider({images = []}){
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const handleMouseDown = (e) => {
        isDragging.current = true;
        sliderRef.current.classList.add("cursor-grabbing");
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
    };
    const handleMouseLeave = () => {
        isDragging.current = false;
    };
    const handleMouseUp = () => {
        isDragging.current = false;
    };
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };
    return(
        <div className="mb-10 lg:my-20 flex gap-5 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory select-none cursor-grab no-scrollbar w-full max-w-[90vw]"
        ref={sliderRef}  onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {images.map((img, index) =>(
                <div key={index} className="snap-center flex-shrink-0 w-97vw]  sm:w-[70vw] lg:w-[50vw] xl:w-[40vw] overflow-hidden">
                    <img src={img} alt={`slide-${index}`} draggable='false' className='h-[250px] lg:h-[500px] w-full object-cover pointer-events-none'/>
                </div>
            ))}
        </div>
    )
}
import Modal from "../../../components/ui/Modal/Modal.jsx";
import ServicePrice from "../sections/ServicePrice.jsx";
import ServiceSlider from "../sections/ServiceSlider.jsx";
import {useState} from "react";

export default function ServicePriceOptions({
    title, options =[], onOpenModal
    }){

    return(
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start   lg:gap-20">
            <h3 className="text-2xl font-medium uppercase text-h sm:text-3xl lg:w-1/3 lg:shrink-0">
                {title}
            </h3>

            <div className="flex flex-col gap-3 lg:w-fit">
                {options.map((item, index) => {
                    return(
                        <button key={index} type="button" onClick={() => item.modal && onOpenModal(item.modal)}
                        className={`w-fit text-left text-lg font-light leading-relaxed transition-colors duration-300
                        ${item.modal
                        ? 'cursor-pointer underline hover:text-h'
                        : 'cursor-default'}`}>{item.text}</button>
                    )
                })}
            </div>
        </div>
    )
}
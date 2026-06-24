import {useEffect} from "react";

export default function Modal({isOpen, onClose, children, title, list}){
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    if(!isOpen) return null
    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white w-[90vw] max-h-[90vh] md:max-h-[85vh] max-w-2xl rounded-xl relative flex flex-col">
               <div className="p-6 pb-0 w-full flex items-center justify-between mb-6 mx-auto">
                   <h2>{title}</h2>
                   <button onClick={onClose} className='text-2xl text-h hover:text-input leading-none'>✕</button>
               </div>
               <div className='p-6 overflow-y-auto flex-1 min-h-0'>
                   {children}
               </div>
           </div>
        </div>
    )
}
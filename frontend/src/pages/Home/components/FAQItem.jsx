import toggleIcon from "../../../assets/icons/up.png"

export default function FAQItem({question, answer}){
    return(
        <details className="group overflow-hidden rounded-2xl bg-white px-6 py-5 transition-all duration-300">
            <summary className="flex items-center justify-between cursor-pointer list-none text-lg sm:text-xl font-medium text-h">
                <span className="pr-4">{question}</span>
                <img src={toggleIcon} alt="toggle" className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"/>
            </summary>
            <div className="pt-4 text-body leading-relaxed">
                {answer}
            </div>
        </details>
    )
}
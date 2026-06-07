import FAQItem from "../components/FAQItem.jsx";
import Container from "../../../components/ui/Container/Container.jsx";

export default function FAQSection(){
    const faqItems = [
         {
          id: 1,
          question: "Во сколько заезд и выезд?",
          answer:
            "Заселение начинается с 14:00, выезд — до 11:30."
        },

        {
          id: 2,
          question: "Можно ли с животными?",
          answer:
            "Можно только с собаками. Доплата — 1000 рублей."
        },

        {
          id: 3,
          question: "На сколько человек рассчитан домик?",
          answer:
            "В домике 4 спальных места с возможностью установить ещё 2 дополнительных."
        },

        {
          id: 4,
          question: "Какое расстояние до Тотьмы?",
          answer:
            "Расстояние от хутора до Тотьмы — 3 километра."
        }
    ];
    return(
        <section className="bg-bg py-20">
            <Container>
                <div className="mx-auto flex w-9/10 flex-col gap-10 lg:flex-row lg:justify-between">
                    <h2 className="text-center lg:w-1/3 lg:text-left">Частые вопросы, которые у вас могут возникнуть</h2>
                    <div className="flex w-full flex-col gap-4 lg:w-1/2">
                        {faqItems.map((item) => (
                            <FAQItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
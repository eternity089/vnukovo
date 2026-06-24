import { useEffect, useState} from "react";
import bathImage from "../../../assets/img/price/bath.png";
import Container from "../../../components/ui/Container/Container.jsx";
import ServicePriceOptions from "../components/ServicePriceOptions.jsx";
import Modal from "../../../components/ui/Modal/Modal.jsx";
import { API_URL } from "../../../shared/api.js";
import EditableField from "../../../components/layout/EditableField/EditableField.jsx";

export default function ServicePrice({user}) {
    const endpoint = `${API_URL}/api/bath-programs`;
    const [sections, setSections] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [programs, setPrograms] = useState([]);
    const isAdmin = user ? Boolean(user.is_superuser) : false;
    useEffect(() => {
        fetch(`${API_URL}/api/services/`)
            .then(res => res.json())
            .then(data => {
                const updatedData = data.map((section) => {
                    if (section.title === "Аренда бани") {
                        return { ...section, image: bathImage };
                    }
                    return section;
                });

                setSections(updatedData);
            })
            .catch(err => console.error("services error:", err));
    }, []);
    useEffect(() => {
        fetch(`${API_URL}/api/bath-programs/`)
            .then(res => res.json())
            .then(setPrograms)
            .catch(err => console.error("programs error:", err));
    }, []);
    return (
        <section className="my-10 lg:my-20">
            <Container>
                <div className="flex flex-col gap-24">
                    {sections.map((section) => (
                        <div key={section.id} className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:items-start">
                            <div className="flex-1 space-y-10">
                                <h2 className="text-3xl uppercase text-h sm:text-4xl">{section.title}</h2>
                                <div className="space-y-8">
                                    {section.filters.map((filter, index) => (
                                        <ServicePriceOptions key={index} title={filter.title} options={filter.options} onOpenModal={setActiveModal} isAdmin={isAdmin}/>
                                    ))}
                                </div>
                            </div>
                            {section.image && (
                                <div className="flex justify-center lg:w-[40%]">
                                    <img src={section.image} alt={section.title} className="w-full max-w-[800px] object-cover"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
            <Modal isOpen={activeModal === "program"} title="Программа парения" onClose={() => setActiveModal(null)}>
                {programs.map((program) => (
                    <div key={program.id} className="mb-6">
                        <h3 className="font-semibold text-2xl text-h flex items-baseline gap-2">
                            <EditableField
                                value={program.name}
                                endpoint={`${endpoint}/${program.id}/`}
                                field="name"
                                type='text'
                                isAdmin={isAdmin}
                                className='flex'
                            />
                            <EditableField
                                value={program.price}
                                endpoint={`${endpoint}/${program.id}/`}
                                field="price"
                                type="text"
                                isAdmin={isAdmin}
                                className='flex'
                            />
                            <span>руб.</span>
                        </h3>
                        <p className="text-body text-[1rem]">
                            <EditableField
                                value={program.description}
                                endpoint={`${endpoint}/${program.id}/`}
                                field="description"
                                isAdmin={isAdmin}
                            />
                        </p>
                        <EditableField
                            value={program.list}
                            endpoint={`${endpoint}/${program.id}/`}
                            field="list"
                            isAdmin={isAdmin}
                            type="list"
                        />
                    </div>
                ))}
            </Modal>
        </section>
    );
}
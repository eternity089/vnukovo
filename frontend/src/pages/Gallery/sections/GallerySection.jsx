import {useEffect, useState} from "react";
import Container from "../../../components/ui/Container/Container.jsx";
import GalleryItem from "../components/GalleryItem.jsx";
import {API_URL} from "../../../shared/api.js";

export default function GallerySection(){
    const [images, setImages] = useState([])
    useEffect(() => {
        fetch(`${API_URL}/api/gallery/`)
            .then(res => res.json())
            .then(data => setImages(data))
    }, []);
    return(
        <Container className='min-h-[70vh]'>
            <div className="mx-auto">
                <h2>Галерея</h2>
                <div className="flex flex-wrap gap-5 my-10">
                    {images.map((img) => (
                        <GalleryItem key={img.id} src={img.image} alt={img.title || 'галерея'}/>
                    ))}
                </div>
            </div>
        </Container>
    )
}
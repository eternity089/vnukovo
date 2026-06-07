export default function GalleryItem({src, alt}){
    return(
        <div className='overflow-hidden w-full sm:w-[46vw] lg:w-[30vw]'>
            <img src={src} alt={alt} className='w-full h-full object-cover' draggable='false'/>
        </div>
    )
}
import Container from "../../components/ui/Container/Container.jsx";
import phone from "../../assets/icons/phone.png"
import map from "../../assets/icons/map.png"
import vk from "../../assets/icons/social.png"
export default function Contacts(){
    return (
        <Container>
            <div className="w-[90vw] flex flex-col lg:flex-row justify-between items-center my-10">
                <div className="content w-full">
                    <h2>Контакты</h2>
                    <div className='my-6 flex items-center gap-3'>
                        <img src={phone} alt="phone"/>
                        <a href="tel:+79814384161"><h3 className='text-2xl font-inter text-h'>+7 (981) 438-41-61</h3></a>
                    </div>
                    <div className='my-6 flex items-center gap-3'>
                        <img src={map} alt="map"/>
                        <a href="https://yandex.ru/maps/geo/khutor_vnukovo/53145609/?from=mapframe&ll=42.744024%2C59.933393&z=16" target="_blank">
                            <h3 className='text-2xl font-inter text-h'>Как добраться</h3></a>
                    </div>
                    <div className='my-6 flex items-center gap-3'>
                        <img src={vk} alt="vk"/>
                        <a href="https://vk.com/hutor_vnukovo?from=groups" target="_blank">
                            <h3 className='text-2xl font-inter text-h'>Мы ВКонтакте</h3></a>
                    </div>
                </div>
                <div className="map w-[90vw] h-[50vh] lg:w-[100vw] lg:h-[60vh]">
                    <iframe className='w-full h-full'
                        src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=42.744024%2C59.933393&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE0NTYwORKIAdCg0L7RgdGB0LjRjywg0JLQvtC70L7Qs9C-0LTRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KLQvtGC0LXQvNGB0LrQuNC5INC80YPQvdC40YbQuNC_0LDQu9GM0L3Ri9C5INC-0LrRgNGD0LMsINGF0YPRgtC-0YAg0JLQvdGD0LrQvtCy0L4iCg0F-CpCFVS8b0I%2C&z=16"
                        allowFullScreen="true"></iframe>
                </div>
            </div>
        </Container>
    )
}
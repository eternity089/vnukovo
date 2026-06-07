import ServicePrice from "./sections/ServicePrice.jsx";
import {
  bathFiltersData,
  homeFiltersData,
  serviceImages
} from "./data/servicesData";
import ServiceSlider from "./sections/ServiceSlider.jsx";

export default function Services(){
    return (
        <main>
            <ServicePrice/>
            <ServiceSlider/>
        </main>
    )
}
import UserProfile from "./sections/UserProfile.jsx";
import Container from "../../components/ui/Container/Container.jsx";

export default function Cabinet(){
    return(
        <Container className={`w-[90vw] min-h-[70vh]`}>
            <UserProfile/>
        </Container>
    )
}
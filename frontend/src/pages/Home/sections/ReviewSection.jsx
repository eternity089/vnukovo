import Review from "../components/Review.jsx";
import Container from "../../../components/ui/Container/Container.jsx";
import {useEffect, useState} from "react";
import {API_URL} from "../../../shared/api.js";

export default function ReviewSection(){
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch(`${API_URL}/api/reviews`).then((response) => response.json()).then((data) => {setReviews(data)})
    }, []);
    return(
       <Container className="mx-4 lg:mx-12">
          <section className="flex flex-col items-center my-12">
              <h2 className="text-center">Наша цель-ваши эмоции</h2>
              <div className="flex flex-wrap mt-12 justify-between gap-8">
                  {reviews.map((review) => (
                      <Review
                      key={review.id}
                      {...review}
                      />
                  ))}
              </div>
          </section>
       </Container>
    )
}
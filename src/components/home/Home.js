import Carousel from "../utilities/Carousel/Carousel";
import { Link } from "react-router-dom"

export default function Home(){
    const imagesArr = [
      "https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/346726/pexels-photo-346726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/610294/pexels-photo-610294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.unsplash.com/photo-1593037515490-c4d56a9ff5ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    ];

    return (
      <>
        <Carousel imagesArr={imagesArr} />
        <div className="home center mt-2">
          <h1 className="font-size-l medium letter-spaced">
            Welcome to The Healing Store
          </h1>
          <h2 className="font-size-m mt-1 light letter-spaced">A hobby is the perfect way to start the healing process, get some mental peace and to spend some me time.</h2>
          <h2 className="font-size-m mt-1 extra-light letter-spaced">Start a new hobby with handpicked products from experts</h2>
          <Link to="/products">
              <button className="btn btn-col btn-primary mt-1 font-size-m border-round">Start Shopping</button>
          </Link>
        </div>
      </>
    );
}
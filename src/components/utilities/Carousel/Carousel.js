import { useState, useEffect } from "react";

export default function Carousel({ imagesArr }) {
  const [currentImage, setCurrentImage] = useState(0);

  function increaseIndex() {
    setTimeout(() => {
      if (currentImage < imagesArr.length - 1) {
        setCurrentImage(currentImage + 1);
      } else {
        setCurrentImage(0);
      }
    }, 2000);
  }

  useEffect(() => {
    increaseIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return (
    <div className="carousel">
      <img alt="" className="responsive-image" src={imagesArr[currentImage]} />
    </div>
  );
}

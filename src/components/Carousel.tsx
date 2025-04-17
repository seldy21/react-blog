import { useState } from "react";
// import { LiaChevronLeftSolid } from "react-icons/lia";

const IMAGE_URLS = [
  "https://i.pinimg.com/736x/84/46/e2/8446e20338f4878d25997efa0eb83ae2.jpg",
  "https://i.pinimg.com/736x/5c/cb/59/5ccb59e3166f7b0f40a4b8df1600a922.jpg",
  "https://i.pinimg.com/736x/fa/8d/76/fa8d767eee6358efb56af91994394829.jpg",
];

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(IMAGE_URLS[0]);

  return (
    <div>
      <div className="carousel">
        <ul className="carousel__slides">
          {IMAGE_URLS.map((url, index) => (
            <li
              key={index}
              className={`carousel__slide-container ${
                activeImage === url ? "active" : ""
              }`}
            >
              <img src={url} alt={`Slide ${index + 1}`} />
            </li>
          ))}
        </ul>
        <div className="carousel__controls">
          {IMAGE_URLS.map((url, index) => (
            <button
              key={index}
              className={`carousel__control-button ${
                activeImage === url ? "active" : ""
              }`}
              onClick={() => setActiveImage(url)}
            ></button>
          ))}
        </div>
        <div className="carousel__controls">
          {/* <LiaChevronLeftSolid /> */}
        </div>
      </div>
    </div>
  );
}

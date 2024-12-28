import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img_1 from "../imgs/img1.jpg";
import Img_2 from "../imgs/img2.jpg";
import Img_3 from "../imgs/img3.jpg";
import Img_4 from "../imgs/img4.jpg";

const imgs = [
  { id: 1, src: Img_1, title: "Image 1" },
  { id: 2, src: Img_2, title: "Image 2" },
  { id: 3, src: Img_3, title: "Image 3" },
  { id: 4, src: Img_4, title: "Image 4" },
];

const CustomArrow = ({ className, style, onClick, direction }) => {
    return (
      <button
        className={`${className} ${direction === 'left' ? 'left-4' : 'right-4'} absolute top-1/2 transform -translate-y-1/2 z-10`}
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          padding: "10px",
        }}
        onClick={onClick}
      >
        {direction === "left" ? "<" : ">"}
      </button>
    );
  };

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
   
  };


  return (
    <Slider {...settings}>
      {imgs.map((img) => (
        <div key={img.id}>
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-[83vh] object-cover mb-1"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Home;

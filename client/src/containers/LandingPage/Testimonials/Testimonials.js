import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";
import testimonials from "./testimonials.json";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={"nextArrowWrapper"} onClick={onClick}>
      <div class="arrow-right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={"previousArrowWrapper"} onClick={onClick}>
      <div class="arrow-left" />
    </div>
  );
}

const getTestimonials = () => {
  return testimonials.map(({ name, image, city, text }) => {
    return (
      <div className="testimonialItemWrapper">
        <img className="testimonialItemImage" src={image} />
        <div className="testimonialItemName">{name}</div>
        <div className="testimonialItemCity">{city}</div>
        <div className="testimonialItemText">{text}</div>
      </div>
    );
  });
};

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    className: "center",
    centerMode: true,
    centerPadding: "20px",
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = getTestimonials();

  return testimonials.length ? (
    <div className="TestimonialsBackground">
      <h2 className="TestimonialsTitle">See what our users have to say.</h2>
      <div className="TestimonialsWrapper">
        <Slider {...settings}>{testimonials}</Slider>
      </div>
    </div>
  ) : null;
};

export default Testimonials;

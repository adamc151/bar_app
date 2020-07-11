import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";
import tom from '../../images/tom_1.jpg';
import becki from '../../images/becki_1.jpg';
import adam from '../../images/tom_1.jpg';
import ria from '../../images/tom_1.jpg';

const testimonials = [
  {
    "image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
    "name": "Adam",
    "city": "London",
    "text": "\"When someone is visiting my city and asks me for recommendations on where to grab a drink I just send them to Hapihour as they have all the information right there.\""
  },
  {
    "image": tom,
    "name": "Tom",
    "city": "Leeds",
    "text": "\"I discovered 3 new bars in Leeds because of this website.\""
  },
  {
    "image": "https://pratimasharma.com.np/wp-content/uploads/2019/04/bitmoji-20190410013747-1.png",
    "name": "Ria",
    "city": "London",
    "text": "\"When I finish work I often want to grab a drink somewhere near the office. This website is great for finding the happy hours that are on now or will be starting soon close by.\""
  },
  {
    "image": becki,
    "name": "Becki",
    "city": "Leeds",
    "text": "\"I like how easy the website is to navigate and how they keep up to date information on all the bars in my city. \""
  }
];

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

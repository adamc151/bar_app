import React from "react";
import "./Bar.css";
import bar from "../List/deafultBarImg.jpg";
import Deal from "./Deal";
import Image from "../Image/Image";
import Slider from "react-slick";

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  getSkeleton() {
    return (
      <div className="detailsTextWrapper">
        <div className="titleSkeleton"></div>
        <div className="detailsSkeleton"></div>
        <div className="dealsTitleSkeleton"></div>
        <div className="detailsSkeleton"></div>
      </div>
    );
  }

  renderBar() {
    const { loading } = this.props;
    let details = this.props.singleBar;

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      className: "detailsCarousel",
      centerMode: true,
      centerPadding: "0px",
      initialSlide: 0
    };

    const multipleImages = details.imgUrls && details.imgUrls.length > 0;
    const images = multipleImages ? details.imgUrls : [details.imgUrl];

    return (
      <div className="detailsWrapper">
        <Slider ref={node => (this.slick = node)} {...settings}>
          {images.map(image => {
            return <Image src={image} className="barDetailsImage" />;
          })}
        </Slider>
        {loading && !details.name ? (
          this.getSkeleton()
        ) : (
          <div className="detailsTextWrapper">
            {details.name && <div className="detailsName">{details.name}</div>}
            {details.address && (
              <div className="detailsAddress">{details.address}</div>
            )}
            {details.website && (
              <a href={details.website} className="detailsWebsite">
                Website
              </a>
            )}
            {<div className="dealsTitle">Today's Deals</div>}
            {this.renderTodayDeals()}
            {details.otherDeals && details.otherDeals[0] && (
              <div className="dealsTitle">Other Deals</div>
            )}
            {details.otherDeals &&
              details.otherDeals[0] &&
              this.renderOtherDeals()}
          </div>
        )}
      </div>
    );
  }

  renderTodayDeals() {
    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === "")
      return null;

    return details.deals.map((data, i) => {
      return <Deal key={i} index={i} data={data} />;
    });
  }

  renderOtherDeals() {
    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === "")
      return null;

    return details.otherDeals.map((data, i) => {
      return <Deal key={i} index={i} data={data} />;
    });
  }

  render() {
    return this.renderBar();
  }
}

export default Bar;

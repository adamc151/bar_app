import React from "react";
import "./Bar.css";
import Deal from "./Deal";
import Image from "../Image/Image";
import Slider from "react-slick";
import arrow from "../../containers/icons/back.png";
import photosIcon from "../../containers/icons/photo.png";

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMorePressed: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.photos !== this.props.photos) {
      this.slick.slickGoTo(1);
    }
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
    const { loading, getPhotos, photos, loadingPhotos } = this.props;
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

    const multipleImages = photos && photos.length > 0;
    let images;
    if (multipleImages) {
      const [first, ...rest] = photos;
      images = [details.imgUrl, ...rest];
    } else {
      images = [details.imgUrl];
    }

    return (
      <div className="detailsWrapper">
        {false && (
          <div
            className="moreImages"
            onClick={() => {
              getPhotos();
              this.setState({ showMorePressed: true });
            }}
          >
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
          </div>
        )}

        <Slider ref={node => (this.slick = node)} {...settings}>
          {images.map((image, i) => {
            const contain = i > 0 ? "barImageContain" : "";
            return (
              <Image
                src={image}
                className={`barDetailsImage ${contain}`}
                imageClassName={contain}
              />
            );
          })}
        </Slider>
        {loadingPhotos ? (
          <div className="loading-dots">
            <div className="loadingdot dot1">.</div>
            <div className="loadingdot dot2">.</div>
            <div className="loadingdot dot3">.</div>
            <div className="loadingdot dot4">.</div>
            <div className="loadingdot dot5">.</div>
            <div className="loadingdot dot6">.</div>
            <div className="loadingdot dot7">.</div>
            <div className="loadingdot dot8">.</div>
            <div className="loadingdot dot9">.</div>
            <div className="loadingdot dot10">.</div>
          </div>
        ) : (
          <div className="loading-dots" />
        )}

        {loading && !details.name ? (
          this.getSkeleton()
        ) : (
          <div className="detailsTextWrapper">
            {details.name && <div className="detailsName">{details.name}</div>}
            {details.address && (
              <div className="detailsAddress">{details.address}</div>
            )}
            <div className="tagsWrapper">
              {details.website && (
                <a href={details.website} className="detailsWebsite">
                  Website
                </a>
              )}
              <img
                src={photosIcon}
                className={`morePhotos ${
                  this.state.showMorePressed ? "morePhotosPressed" : ""
                }`}
                onClick={() => {
                  !this.state.showMorePressed && getPhotos();
                  this.setState({ showMorePressed: true });
                }}
              />
            </div>

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

import React from "react";
import "./Bar.css";
import Deal from "./Deal";
import Image, { ImageWithBlur } from "../Image/Image";
import Slider from "react-slick";
import arrow from "../../containers/icons/back.png";
import photosIcon from "../../containers/icons/photo.png";
import website from "../../containers/icons/website.png";

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMorePressed: false,
      loaded: false,
    };

    this.handleBodyClick = this.handleBodyClick.bind(this);
  }

  componentDidMount() {
    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    if (!isMobile) {
      document.addEventListener("mousedown", this.handleBodyClick, false);
      //document.addEventListener("keydown", this.handleEscKey, false);
      document.addEventListener("touchstart", this.handleBodyClick, false);
    }

    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    if (!isMobile) {
      document.removeEventListener("mousedown", this.handleBodyClick, false);
      //document.removeEventListener("keydown", this.handleEscKey, false);
      document.removeEventListener("touchstart", this.handleBodyClick, false);
    }
  }

  handleBodyClick = (e) => {
    if (this.node === null || this.node.contains(e.target)) {
      return;
    } else {
      this.props.history.push(`/map`);
    }
  };

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

    const multipleImages = photos && photos.length > 0;
    let images;
    if (multipleImages) {
      const [first, ...rest] = photos;
      images = [details.imgUrl, ...rest];
    } else {
      images = new Array(10).fill();
      images[0] = details.imgUrl;
    }

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      className: "detailsCarousel",
      centerMode: true,
      centerPadding: "0px",
      initialSlide: 0,
      swipe: !loadingPhotos,
      draggable: !loadingPhotos,
      afterChange: () => {
        !multipleImages && getPhotos();
      },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
          },
        },
      ],
    };

    return (
      <div
        className="detailsWrapper"
        ref={(node) => (this.node = node)}
        style={{
          transform: this.state.loaded ? "scale(1)" : "scale(0.8)",
        }}
      >
        <Slider ref={(node) => (this.slick = node)} {...settings}>
          {images.map((image, i) => {
            const blurImageClassNames = {
              blurImage: "barBlurImage",
              mainImage: "barMainiMage",
              container: "barBlurImageContainer",
            };
            return i > 0 ? (
              <ImageWithBlur
                src={image}
                className={`barDetailsImage`}
                blurClassNames={blurImageClassNames}
              />
            ) : (
              <Image src={image} className={`barDetailsImage`} />
            );
          })}
        </Slider>
        {loadingPhotos && false ? (
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
                  <img className="websiteIcon" src={website} />
                </a>
              )}
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

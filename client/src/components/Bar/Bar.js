import React, { useEffect, useRef } from "react";
import "./Bar.css";
import Deal from "./Deal";
import Image, { ImageWithBlur } from "../Image/Image";
import Slider from "react-slick";
import website from "../../containers/icons/website.png";
import facebook_icon from "../../containers/icons/facebook2.png";
import instagram_icon from "../../containers/icons/instagram2.png";
import twitter_icon from "../../containers/icons/twitter2.png";
import announcement_icon from "../../containers/icons/announcement.png";

const Bar = (props) => {
  const wrapperEl = useRef(null);

  useEffect(() => {

    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    if (!isMobile) {
      document.addEventListener("mousedown", (e) => handleBodyClick(e, props), false);
      document.addEventListener("touchstart", (e) => handleBodyClick(e, props), false);
    }

    return () => {
      const isMobile = window.matchMedia("(max-width: 1000px)").matches;
      if (!isMobile) {
        document.removeEventListener("mousedown", (e) => handleBodyClick(e, props), false);
        document.removeEventListener("touchstart", (e) => handleBodyClick(e, props), false);
      }
    }
  }, [props.photos])


  const handleBodyClick = (e, props) => {
    if (wrapperEl.current === null || wrapperEl.current.contains(e.target)) {
      return;
    } else {
      props.history.push(`/map`);
    }
  };

  const getSkeleton = () => {
    return (
      <div className="detailsTextWrapper">
        <div className="titleSkeleton"></div>
        <div className="detailsSkeleton"></div>
        <div className="dealsTitleSkeleton"></div>
        <div className="detailsSkeleton"></div>
      </div>
    );
  }

  const renderBar = (props) => {
    const { loading, getPhotos, photos, loadingPhotos } = props;
    let details = props.singleBar;

    const { post, time } = details.announcement || {};

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
      <div className="detailsWrapper" ref={wrapperEl}>
        <Slider {...settings}>
          {images.map((image, i) => {
            const blurImageClassNames = {
              blurImage: "barBlurImage",
              mainImage: "barMainiMage",
              container: "barBlurImageContainer",
            };
            return i > 0 ? (
              <ImageWithBlur
                src={image}
                className={`barDetailsImage barDetailsImage2`}
                blurClassNames={blurImageClassNames}
              />
            ) : (
                <Image
                  src={image}
                  className={`barDetailsImage`}
                  noLazyLoad={window.matchMedia("(max-width: 1000px)").matches}
                />
              );
          })}
        </Slider>

        {post && (
          <div className="BarAnnouncement">
            <img src={announcement_icon} alt="Announcement Icon" />
            <div className="BarAnnouncementMessages">
              <div className="BarAnnouncementMessage">{post}</div>
              <div className="BarAnnouncementTime">{time}</div>
            </div>
          </div>
        )}

        {loading && !details.name ? (
          getSkeleton()
        ) : (
            <div>
              <div className="detailsTextWrapper">
                {details.name && (
                  <div className="detailsName">{details.name}</div>
                )}

                {details.address && (
                  <div className="detailsAddress">{details.address}</div>
                )}

                <div className="socialWrapper">
                  <a href={details.website}>
                    <img className="websiteIcon" src={website} />
                  </a>
                  {details.social && details.social.facebook !== "" ? (
                    <a href={details.social.facebook}>
                      <img className="facebook_icon" src={facebook_icon} />
                    </a>
                  ) : null}
                  {details.social && details.social.instagram !== "" ? (
                    <a href={details.social.instagram}>
                      <img src={instagram_icon} />
                    </a>
                  ) : null}
                  {details.social && details.social.twitter !== "" ? (
                    <a href={details.social.twitter}>
                      <img src={twitter_icon} />
                    </a>
                  ) : null}
                </div>

                <div className="dealsTitle">Today's Deals</div>
                {renderTodayDeals(props)}
                {details.otherDeals && details.otherDeals[0] && (
                  <div className="dealsTitle">Other Deals</div>
                )}

                {details.otherDeals &&
                  details.otherDeals[0] &&
                  renderOtherDeals(props)}

                {
                  <div className="pleaseNote">
                    Last updated: {details.lastUpdated || "1st March 2020"}
                  </div>
                }
              </div>
            </div>
          )}
      </div>
    );
  }

  const renderTodayDeals = (props) => {
    let details = props.singleBar;
    if (details.name === undefined || !details.name || details.name === "")
      return null;

    return details.deals.map((data, i) => {
      return <Deal key={i} index={i} data={data} />;
    });
  }

  const renderOtherDeals = (props) => {
    let details = props.singleBar;
    if (details.name === undefined || !details.name || details.name === "")
      return null;

    return details.otherDeals.map((data, i) => {
      return <Deal key={i} index={i} data={data} />;
    });
  }


  return renderBar(props);

}

export default Bar;

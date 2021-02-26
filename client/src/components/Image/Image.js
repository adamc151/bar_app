import React, { useState } from "react";
import "./Image.css";
import ViewportObserver from "../ViewportObserver/ViewportObserver";

const Image = (props) => {

  const [imageLoading, setImageLoading] = useState(true);
  const { src, className, imageLoadedStyle, noLazyLoad, alt } = props;
  const imageLoaded = !imageLoading ? imageLoadedStyle || "imgLoaded" : "";

  return (
    <div className={`imgSkeleton ${className}`}>
      <ViewportObserver>
        {(intersected) => {
          const loadImage = intersected || noLazyLoad;
          return (
            loadImage && (
              <img
                src={src}
                className={`img ${imageLoaded} ${className}`}
                alt={alt || ""}
                onLoad={() => {
                  setImageLoading(false);
                }}
              />
            )
          );
        }}
      </ViewportObserver>
    </div>
  );
}

export const ImageWithBlur = (props) => {

  const [imageLoading, setImageLoading] = useState(true);

  const { src, className, imageLoadedStyle, blurClassNames } = props;
  const imageLoaded = !imageLoading ? imageLoadedStyle || "imgLoaded" : "";
  const { blurImage, mainImage, container } = blurClassNames || {};

  return (
    <div className={`imgSkeleton ${className}`}>
      <ViewportObserver>
        {(intersected) => {
          return (
            intersected && (
              <div className={`BlurImgContainer ${container}`}>
                <img
                  src={src}
                  className={`img ${imageLoaded} blurImage ${blurImage}`}
                  alt=""
                  onLoad={() => {
                    setImageLoading(false);
                  }}
                />
                <img
                  src={src}
                  className={`img ${imageLoaded} blurMainImage ${mainImage}`}
                  alt=""
                  onLoad={() => {
                    setImageLoading(false)
                  }}
                />
              </div>
            )
          );
        }}
      </ViewportObserver>
    </div>
  );

}

export default Image;

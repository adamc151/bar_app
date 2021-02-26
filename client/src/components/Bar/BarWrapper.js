import React, { useEffect } from "react";
import "./BarWrapper.css";
import navigate from "../../containers/icons/back.png";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

const BarWrapper = (props) => {

  useEffect(() => {
    return () => {
      props.clearPhotos();
    }
  }, [])

  return (
    <div className="wrapper barDetailsWrapper">
      <Helmet>
        <meta
          charSet="utf-8"
          name="description"
          content="hapihour is an application that lets you
                find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
                information you need to decide where to go next."
        />
        <title>Hapihour | Details</title>
        <link rel="canonical" href="hapihour.io" />
      </Helmet>
      <Link className="navigationClass" to={"/map"} alt="back">
        <img src={navigate} className="bottomTextbackNavigation" />
      </Link>

      <div className="barContainer">
        <div className="barContainerGrow">{props.children}</div>
      </div>

    </div>
  );
}

export default BarWrapper;

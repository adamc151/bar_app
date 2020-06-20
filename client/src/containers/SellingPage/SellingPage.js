import React, { Component } from "react";
import "./SellingPage.css";
import { Route, Link } from "react-router-dom";
import Header from "../LandingPage/Header/Header";
import Footer from "../LandingPage/Footer/Footer";
import Image from "../../components/Image/Image";
import AdminPreview from "../images/admin_preview.png";

class SellingPage extends Component {

  render() {

    return (
      <Route
        render={({ history }) => (
          <div className="SellingPage">
            <Header history={history} />
            <div className="SellingPageTopBlock">
              <div className="SellingPageTopBlockTitle">Make your happy hour deals stand out amoungst the noise.</div>
              <div className="SellingPageTopBlockMicroTitle">We feature your deals so that customers can see what YOU have to offer.</div>
              <button className="">Sign Up For A Spot</button>
            </div>
            <img className="SellingPagePreviewImage" src={AdminPreview}/>
            <Footer />
          </div>
        )}
      />
    );
  }
}

export default SellingPage;
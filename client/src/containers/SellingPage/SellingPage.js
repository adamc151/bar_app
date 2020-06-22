import React, { Component } from "react";
import "./SellingPage.css";
import { Route, Link } from "react-router-dom";
import Header from "../LandingPage/Header/Header";
import Footer from "../LandingPage/Footer/Footer";
import AdminPreview from "../images/admin_preview.png";
import FeatureIcon from "../images/example.png";
import TopOfList from "../icons/top_of_list.svg";
import Verified from "../icons/verified.svg";
import UploadPhoto from "../icons/photo_upload.svg";

class SellingPage extends Component {
  render() {
    return (
      <Route
        render={({ history }) => (
          <div className="SellingPage">
            <Header history={history} theme="Black" />
            <div className="SellingPageTopBlock">
              <div className="SellingPageTopBlockTitle">
                Make your happy hour deals stand out amoungst the noise.
              </div>
              <div className="SellingPageTopBlockMicroTitle">
                <b style={{ fontFamily: "Circular-Black", fontSize: "26px" }}>
                  Sign up
                </b>{" "}
                to manage your details and we will feature{" "}
                <b style={{ fontFamily: "Circular-Black", fontSize: "26px" }}>
                  your
                </b>{" "}
                deals so that customers can see what{" "}
                <b style={{ fontFamily: "Circular-Black", fontSize: "26px" }}>
                  you
                </b>{" "}
                have to offer.
              </div>
              <button className="">Get Access To The Admin Centre</button>
              <p>Free earlybird access • No credit card required</p>
            </div>

            <img className="SellingPagePreviewImage" src={AdminPreview} />

            <div className="SellingPageProblem">
              <h1>Own a bar and want featured listings?</h1>
              <p>
                With there being so many happy hours in your city it is hard to
                stand out in the crowd. Signing up for a managed account will
                give you the tools to get your deals seen and your customers
                excited.
              </p>
            </div>

            <div className="SellingPageFeature">
              <div>
                <h4># First in line</h4>
                <h2>Move to the top of the list</h2>
                <p>
                  When you sign up your happy hour offering will jump to the top
                  of the list so customers will instantly see you.
                </p>
              </div>
              <div>
                <img src={TopOfList} style={{width: '320px', marginBottom: '-150px'}}></img>
              </div>
            </div>

            <div className="SellingPageFeature">
              <div>
                <img src={Verified}></img>
              </div>
              <div>
                <h4># Trusted source</h4>
                <h2>Get a verified icon on your listing</h2>
                <p>
                  With a managed account, potential customers can trust that
                  your deals are always up-to-date and are never dissapointed.
                </p>
              </div>
            </div>

            <div className="SellingPageFeature">
              <div>
                <h4># Looking good</h4>
                <h2>Choose your own photographs and descriptions</h2>
                <p>
                  Upload your own stunning photographs & add appealing
                  descriptions to make the customers excited to try your
                  deals. No more generic listings.
                </p>
              </div>
              <div>
                <img src={UploadPhoto}></img>
              </div>
            </div>

            <div className="SellingPageCallToAction">
              <h2>Get free access to these great features.</h2>
              <button className="">Get Access To The Admin Centre</button>
              <p>Free earlybird access • No credit card required</p>
            </div>
            <Footer />
          </div>
        )}
      />
    );
  }
}

export default SellingPage;

import React, { Component } from "react";
import "./SellingPage.css";
import { Route, Link } from "react-router-dom";
import Header from "../LandingPage/Header/Header";
import Footer from "../LandingPage/Footer/Footer";
import AdminPreview from "../images/admin_preview.png";

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
                <b style={{ fontFamily: "Circular-Black", fontSize: "30px" }}>
                  Sign up
                </b>{" "}
                to manage your details and we will feature{" "}
                <b style={{ fontFamily: "Circular-Black", fontSize: "30px" }}>
                  your
                </b>{" "}
                deals so that customers can see what{" "}
                <b style={{ fontFamily: "Circular-Black", fontSize: "30px" }}>
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
                Describe your customer’s biggest, most expensive pain point. Use
                the same words they use when talking about it. Drive it home
                with emotion.
              </p>
            </div>

            <div>Feature 1</div>
            <div>Feature 2</div>
            <div>Feature 3</div>

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

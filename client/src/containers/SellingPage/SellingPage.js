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
            <Header history={history} />
            <div className="SellingPageTopBlock">
              <div className="SellingPageTopBlockTitle">
                Make your happy hour deals stand out amoungst the noise.
              </div>
              <div className="SellingPageTopBlockMicroTitle">
              <b style={{fontFamily: 'Circular-Black', fontSize: '36px'}}>Sign up</b> to manage your details and we will feature <b style={{fontFamily: 'Circular-Black', fontSize: '36px'}}>your</b> deals so that customers can see what <b style={{fontFamily: 'Circular-Black', fontSize: '36px'}}>you</b> have to
                offer.
              </div>
              <button className="">Get Access To The Admin Centre</button>
            </div>

            <img className="SellingPagePreviewImage" src={AdminPreview} />

            <div className="SellingPageProblem">
              <h1>Own a bar or resturant and want featured listings?</h1>
              <p>
                Describe your customer’s biggest, most expensive pain point. Use
                the same words they use when talking about it. Drive it home
                with emotion.
              </p>
            </div>

            <div className="SellingPageCallToAction">
              <h1>Remind them why they came</h1>
              <button className="">Request Featured Listing</button>
            </div>
            <Footer />
          </div>
        )}
      />
    );
  }
}

export default SellingPage;

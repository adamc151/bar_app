import React, { Component } from "react";
import "./FAQ.css";
import { Route } from "react-router-dom";
import { Parallax, Background } from "react-parallax";
import desktopHeader from "./images/jess_ash_2.jpg";
import Helmet from "react-helmet";
import Image from "../components/Image/Image";
import Header from "./LandingPage/Header/Header";
import Footer from "./LandingPage/Footer/Footer";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

const placeholders = [
  {
    heading: "How do I submit a hapihour for review?",
    panel:
      "If you think that there is a hapi hour that we need to know about, you can submit a request through our web app. Simply search for the bar or restaurant that you are interested in on the map page and a pop-up will become available. Alternatively, you can let us know on social media via our Twitter, Instagram or Facebook accounts. We also have an email address that you can send suggestions to.",
  },
  {
    heading: "I added a new hapihour but I can’t see it in the list, why?",
    panel:
      "To ensure data integrity we review each of the hapihours that are submitted. This process might involve checking with the premises to verify that the hapihour is still valid. Once we can confirm this we will set the hapihour to be visible for everyone.",
  },
  {
    heading: "There was an error submitting a hapihour, what happened?",
    panel:
      "There are a number of potential reasons for a hapihour submission to have failed. This could have been due to a duplicated hapihour that is currently under review, poor internet connection or a problem with our servers. If you are consistently seeing a problem, please let us know through social media or via email.",
  },
  {
    heading: "There are no hapihours in my location, will there be any?",
    panel:
      "We are currently operating in the Leeds and London areas. Once we gain popularity we will be adding hapihours to a wider area. However, if you think that there is a hapihour that we need to know about in your area please submit it via the map pop-up, via social media or email and we will get it on the site.",
  },
  {
    heading: "The information on a hapihour is wrong, will you update this?",
    panel:
      "The process of keeping data up to date is quite difficult and we try to keep the data that you see up-to-date, however, we might not get it right all the time. If you know something is wrong with a hapihour, please let us know via social media or email and we will get the information updated.",
  },
];

class FAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Route
        render={({ history }) => (
          <div className="FAQ">
            <Helmet>
              <meta
                charSet="utf-8"
                name="description"
                content="hapihour is an application that lets you
              find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
              information you need to decide where to go next."
              />
              <title>Hapihour | Frequently Asked Questions</title>
              <link rel="canonical" href="hapihour.io" />
            </Helmet>

            <Header history={history} />
            <div className="photosLandingWrapper FAQPhoto">
              <Parallax strength={300}>
                <Background className="custom-bg">
                  <Image
                    className="photoLanding FAQPhoto"
                    imageLoadedStyle="photoLandingLoaded"
                    src={desktopHeader}
                  />
                </Background>
              </Parallax>
            </div>

            <div className="photosLandingWrapper overlayWrapper FAQTitle">
              <div className="titleDescriptionLandingWrapper">
                <div className="titleDescriptionLanding">
                  Frequently Asked Questions/ Contact Details
                </div>
              </div>
            </div>

            <div className="FAQBlock">
              <div className="FAQContact">
                <div className="FAQContactTitle">
                  <svg
                  className="FAQQuestionIcon"
                    height="30pt"
                    width="30pt"
                    viewBox="0 0 477.867 477.867"
                  >
                    <g>
                      <g>
                        <path d="M460.8,68.267H17.067l221.867,182.75L463.309,68.779C462.488,68.539,461.649,68.368,460.8,68.267z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M249.702,286.31c-6.288,5.149-15.335,5.149-21.623,0L0,98.406v294.127c0,9.426,7.641,17.067,17.067,17.067H460.8    c9.426,0,17.067-7.641,17.067-17.067V100.932L249.702,286.31z" />
                      </g>
                    </g>
                  </svg>
                  Contact Us
                </div>
                <div className="FAQContactItem">
                  Please refer to our FAQs for any initial queries. If something
                  is still not clear please get in contact via any of the
                  following methods.
                </div>
                <div className="FAQContactItem">contact block</div>
                <div className="FAQContactItem">contact block</div>
                <div className="FAQContactItem">contact block</div>
                <div className="FAQContactItem">contact block</div>
              </div>

              <div className="FAQQuestions">
                <div className="FAQQuestionsTitle">
                  <svg
                    className="FAQQuestionIcon"
                    height="30pt"
                    viewBox="0 0 512 512"
                    width="30pt"
                  >
                    <path d="m512 346.5c0-63.535156-36.449219-120.238281-91.039062-147.820312-1.695313 121.820312-100.460938 220.585937-222.28125 222.28125 27.582031 54.589843 84.285156 91.039062 147.820312 91.039062 29.789062 0 58.757812-7.933594 84.210938-23.007812l80.566406 22.285156-22.285156-80.566406c15.074218-25.453126 23.007812-54.421876 23.007812-84.210938zm0 0" />
                    <path d="m391 195.5c0-107.800781-87.699219-195.5-195.5-195.5s-195.5 87.699219-195.5 195.5c0 35.132812 9.351562 69.339844 27.109375 99.371094l-26.390625 95.40625 95.410156-26.386719c30.03125 17.757813 64.238282 27.109375 99.371094 27.109375 107.800781 0 195.5-87.699219 195.5-195.5zm-225.5-45.5h-30c0-33.085938 26.914062-60 60-60s60 26.914062 60 60c0 16.792969-7.109375 32.933594-19.511719 44.277344l-25.488281 23.328125v23.394531h-30v-36.605469l35.234375-32.25c6.296875-5.761719 9.765625-13.625 9.765625-22.144531 0-16.542969-13.457031-30-30-30s-30 13.457031-30 30zm15 121h30v30h-30zm0 0" />
                  </svg>
                  Frequently Asked Questions
                </div>
                <Accordion allowZeroExpanded={true}>
                  {placeholders.map((placeholder) => (
                    <AccordionItem key={placeholder.heading}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {placeholder.heading}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {placeholder.panel}
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <Footer />
          </div>
        )}
      />
    );
  }
}

export default FAQ;

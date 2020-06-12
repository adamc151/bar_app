import React, { Component } from "react";
import "./FAQ.css";
import { Route } from "react-router-dom";
import { Parallax, Background } from "react-parallax";
import desktopHeader from "./images/jess_ash_2.jpg";
import Helmet from "react-helmet";
import Image from "../components/Image/Image";
import Header from "./LandingPage/Header/Header";
import Footer from "./LandingPage/Footer/Footer";
import MailIcon from "../containers/icons/mail.svg";

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
                    className="ContactIcon"
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
                  <div>Contact Us</div>
                </div>
                <div className="FAQContactItem">
                  Please refer to our FAQs for any initial queries.
                  
                  <br/><br/>If something
                  is still not clear please get in contact via any of the
                  following methods.
                </div>
                <a href="https://twitter.com/hapihour_io">
                  <div className="FAQContactItem">
                    <svg
                      id="twitter-24"
                      viewBox="0 0 24 24"
                      className="FAQContactIcon"
                    >
                      <path d="M8.068 20.714c8.004 0 12.381-6.63 12.381-12.381 0-.188-.004-.376-.012-.562a8.853 8.853 0 0 0 2.17-2.254 8.68 8.68 0 0 1-2.499.685 4.367 4.367 0 0 0 1.914-2.407c-.84.499-1.772.861-2.763 1.057a4.352 4.352 0 0 0-7.415 3.968 12.356 12.356 0 0 1-8.97-4.547 4.34 4.34 0 0 0-.59 2.188c0 1.51.769 2.842 1.937 3.622a4.32 4.32 0 0 1-1.971-.544v.055c0 2.108 1.5 3.867 3.49 4.266a4.356 4.356 0 0 1-1.965.075 4.356 4.356 0 0 0 4.065 3.022 8.73 8.73 0 0 1-5.404 1.863c-.351 0-.698-.02-1.038-.06a12.318 12.318 0 0 0 6.67 1.954"></path>
                    </svg>
                    <p>Twitter</p>
                  </div>
                </a>

                <a href="https://www.facebook.com/hapihour.io">
                  <div className="FAQContactItem">
                    <svg
                      id="facebook-24"
                      viewBox="0 0 24 24"
                      className="FAQContactIcon"
                    >
                      <path d="M13.544 22.018H9.37V12H7.325V8.544h2.07v-2.07c0-2.822 1.17-4.492 4.492-4.492h2.763v3.456h-1.72c-1.294 0-1.377.485-1.377 1.386v1.72h3.122L16.308 12h-2.764z"></path>
                    </svg>
                    <p>Facebook</p>
                  </div>
                </a>

                <a href="https://www.instagram.com/hapihour.io/">
                  <div className="FAQContactItem">
                    <svg
                      id="instagram-24"
                      viewBox="0 0 24 24"
                      className="FAQContactIcon"
                    >
                      <path d="M12 1.501c2.851 0 3.21.012 4.329.063 1.117.051 1.88.229 2.548.488.7.264 1.336.677 1.86 1.211.534.525.947 1.16 1.211 1.86.26.668.437 1.43.488 2.548.024.523.04.88.049 1.4.01.597.014 1.408.014 2.929 0 2.851-.012 3.209-.063 4.329-.051 1.117-.229 1.88-.488 2.548a5.368 5.368 0 0 1-3.07 3.07c-.668.26-1.432.438-2.55.489-1.119.05-1.476.063-4.328.063-2.851 0-3.209-.012-4.328-.063-1.118-.051-1.881-.229-2.55-.488a5.144 5.144 0 0 1-1.859-1.211 5.145 5.145 0 0 1-1.21-1.86c-.26-.667-.438-1.43-.489-2.548-.05-1.12-.063-1.478-.063-4.329s.012-3.209.063-4.329c.051-1.117.229-1.88.488-2.548.264-.7.677-1.335 1.211-1.86a5.145 5.145 0 0 1 1.86-1.21c.668-.26 1.43-.438 2.548-.489 1.12-.05 1.478-.063 4.33-.063zm4.243 1.953c-1.107-.05-1.44-.061-4.243-.061-2.803 0-3.135.01-4.242.06-1.024.048-1.58.219-1.95.362a3.25 3.25 0 0 0-1.207.786 3.253 3.253 0 0 0-.786 1.207c-.143.37-.315.926-.361 1.95-.05 1.107-.061 1.439-.061 4.242 0 2.804.01 3.136.06 4.243.047 1.023.219 1.58.362 1.95.169.455.437.868.786 1.206a3.25 3.25 0 0 0 1.207.786c.37.144.926.315 1.95.361 1.106.05 1.438.062 4.242.062a458.62 458.62 0 0 0 2.38-.007 43.158 43.158 0 0 0 1.863-.055c1.023-.046 1.58-.217 1.95-.361a3.477 3.477 0 0 0 1.992-1.993c.144-.37.315-.926.361-1.95.05-1.107.061-1.438.061-4.242 0-2.803-.01-3.135-.06-4.242-.048-1.024-.219-1.58-.362-1.95a3.255 3.255 0 0 0-.786-1.207 3.254 3.254 0 0 0-1.207-.786c-.37-.143-.926-.314-1.95-.361zm1.362 4.202a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52zM6.608 12a5.391 5.391 0 1 1 10.782 0A5.391 5.391 0 0 1 6.61 12zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                    </svg>
                    <p>Instagram</p>
                  </div>
                </a>

                <a href="mailto:hapihour.io@gmail.com" target="_top">
                  <div className="FAQContactItem">
                    <img src={MailIcon} className="FAQContactIcon" />
                    <p className="FAQEmail">hapihour.io@gmail.com</p>
                  </div>
                </a>
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

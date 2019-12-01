import React, { Component } from "react";
import "./FAQ.css";
import { Route } from "react-router-dom";
import twitterIcon from "./twitter.png";
import beerIcon from "./beer.png";
import instagramIcon from "./instagram.png";
import emailIcon from "./email.png";
import Helmet from 'react-helmet';
 
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';

const placeholders = [
  {
    heading: "How do I submit a hapihour for review?",
    panel: "If you think that there is a hapi hour that we need to know about, you can submit a request through our web app. Simply search for the bar or restaurant that you are interested in on the map page and a pop-up will become available. Alternatively, you can let us know on social media via our Twitter, Instagram or Facebook accounts. We also have an email address that you can send suggestions to."
  },
  {
    heading: "I added a new hapihour but I can’t see it in the list, why?",
    panel: "To ensure data integrity we review each of the hapihours that are submitted. This process might involve checking with the premises to verify that the hapihour is still valid. Once we can confirm this we will set the hapihour to be visible for everyone."
  },
  {
    heading: "There was an error submitting a hapihour, what happened?",
    panel: "There are a number of potential reasons for a hapihour submission to have failed. This could have been due to a duplicated hapihour that is currently under review, poor internet connection or a problem with our servers. If you are consistently seeing a problem, please let us know through social media or via email."
  },
  {
    heading: "There are no hapihours in my location, will there be any?",
    panel: "We are currently operating in the Leeds and London areas. Once we gain popularity we will be adding hapihours to a wider area. However, if you think that there is a hapihour that we need to know about in your area please submit it via the map pop-up, via social media or email and we will get it on the site."
  },
  {
    heading: "The information on a hapihour is wrong, will you update this?",
    panel: "The process of keeping data up to date is quite difficult and we try to keep the data that you see up-to-date, however, we might not get it right all the time. If you know something is wrong with a hapihour, please let us know via social media or email and we will get the information updated."
  },
]

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // console.log("FAQ page");

    return (
      <Route render={({ history }) => (
        <div className="wrapper barDetailsWrapper">
            <Helmet>
              <meta charSet="utf-8" name="description" content="hapihour is an application that lets you 
              find great drinks deals that are happing right now near you. hapihour displays your available options on a map with the crucial
              information you need to decide where to go next." />
              <title>Hapihour | Frequently Asked Questions</title>
              <link rel="canonical" href="hapihour.io" />
            </Helmet>
            <div className="header"><div className="headerTextHapi" onClick={() => { history.push(`/`);}}>hapi</div><div className="headerTextHour" onClick={() => { history.push(`/`);}}>hour</div> <img src={beerIcon} className="beerIconLanding" onClick={() => { history.push(`/`);}}/></div>
            <div className="barContainer">

              <div className="faqTitle">FREQUENTLY ASKED QUESTIONS</div>

              <Accordion className="accordianFAQ" allowZeroExpanded={true}>
                {placeholders.map((placeholder) => (
                    <AccordionItem key={placeholder.heading}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {placeholder.heading}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>{placeholder.panel}</AccordionItemPanel>
                    </AccordionItem>
                ))}
              </Accordion>

              {/* <div class="footerCenter">
                  <div className="footerItemTitle">CONTACT US</div>
                  <a href="https://twitter.com/hapihour_io" className="inline"><img src={twitterIcon}/></a>
                  <a className="inline dot">•</a>
                  <a href="https://www.instagram.com/hapihour.io/" className="inline"><img src={instagramIcon}/></a>
                  <a className="inline dot">•</a>
                  <a href="mailto:hapihour.io@gmail.com" className="inline" target="_top"><img src={emailIcon}/></a>
              </div> */}

            </div>
        </div>
      )} />
    );
  }
}

export default FAQ;

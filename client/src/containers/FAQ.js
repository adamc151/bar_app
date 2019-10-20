import React, { Component } from "react";
import "./FAQ.css";
import navigate from "./back.png";
import { Route } from "react-router-dom";
import twitterIcon from "./twitter.png";
import beerIcon from "./beer.png";
import instagramIcon from "./instagram.png";
import emailIcon from "./email.png";
 
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const placeholders = [
  {
    heading: "Question 1",
    panel: "this is the answer to that question"
  },
  {
    heading: "Question 2",
    panel: "this is the answer to that question"
  },
  {
    heading: "Question 3",
    panel: "this is the answer to that question"
  },
  {
    heading: "Question 4",
    panel: "this is the answer to that question"
  },
  {
    heading: "Question 5",
    panel: "this is the answer to that question"
  },
  {
    heading: "Question 6",
    panel: "this is the answer to that question"
  },
]

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    console.log("FAQ page");

    return (
      <Route render={({ history }) => (
        <div className="wrapper barDetailsWrapper">
            <div className="header" onClick={() => { history.push(`/`);}}><div className="headerTextHapi">hapi</div><div className="headerTextHour">hour</div> <img src={beerIcon} className="beerIconLanding"/></div>
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
            </div>
            <div class="footerCenter">
                <div className="footerItemTitle">CONTACT US</div>
                <a href="https://twitter.com/hapihour_io" className="inline"><img src={twitterIcon}/></a>
                <a className="inline dot">•</a>
                <a href="https://www.instagram.com/hapihour.io/" className="inline"><img src={instagramIcon}/></a>
                <a className="inline dot">•</a>
                <a href="mailto:hapihour.io@gmail.com" className="inline" target="_top"><img src={emailIcon}/></a>
            </div>
        </div>
      )} />
    );
  }
}

export default FAQ;

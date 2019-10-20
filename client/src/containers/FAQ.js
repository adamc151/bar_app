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

const placeholders = [
  {
    heading: "How do I submit a happy hour for review?",
    panel: "This is the answer to that question if you have any more questions please ask. This is ont a full answer but should look like one for test purposes. If you want to know more then please ask, if not, then dont."
  },
  {
    heading: "I added a new happy hour but I can’t see it in the list, why?",
    panel: "this is the answer to that question"
  },
  {
    heading: "There was an error submitting a happy hour, what happened?",
    panel: "this is the answer to that question"
  },
  {
    heading: "There are no happy hours in my location, will there be any?",
    panel: "this is the answer to that question"
  },
  {
    heading: "The information on a happy hour is wrong, will you update this?",
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

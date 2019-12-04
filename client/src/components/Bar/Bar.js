import React from "react";
import "./Bar.css";
import bar from "../List/deafultBarImg.jpg";
import Deal from "./Deal";
import Image from '../Image/Image';

class Bar extends React.Component {

  constructor(props) {
    super(props);
  }

  getSkeleton() {
    return (
      <div className='detailsTextWrapper' >
        <div className='titleSkeleton' ></div>
        <div className='detailsSkeleton' ></div>
        <div className='dealsTitleSkeleton' ></div>
        <div className='detailsSkeleton' ></div>
      </div>);
  }

  componentDidMount() {
    const details = this.props.singleBar;
    const googleId = window.location.pathname.split("/").pop()
    !details.name && this.props.fetchOne(googleId);
  }

  renderBar() {
    const { loading } = this.props;
    let details = this.props.singleBar;

    return (
      <div className="detailsWrapper">
        <Image src={details.imgUrl} className="barDetailsImage" />
        {loading && !details.name ?
          this.getSkeleton() :
          <div className="detailsTextWrapper">
            {details.name && <div className="detailsName">{details.name}</div>}
            {details.address && <div className="detailsAddress">{details.address}</div>}
            {details.website && <a href={details.website} className="detailsWebsite">Website</a>}
            {/* {<div className="line">--</div>} */}
            {<div className="dealsTitle">Today's Deals</div>}
            {this.renderTodayDeals()}
            {details.otherDeals && details.otherDeals[0] && <div className="dealsTitle">Other Deals</div>}
            {details.otherDeals && details.otherDeals[0] && this.renderOtherDeals()}
          </div>}
      </div>
    );
  }

  renderTodayDeals() {

    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === '') return null;

    return details.deals.map((data, i) => {
      return (
        <Deal
          key={i}
          index={i}
          data={data}
        />
      );
    });
  }

  renderOtherDeals() {

    let details = this.props.singleBar;
    if (details.name === undefined || !details.name || details.name === '') return null;

    return details.otherDeals.map((data, i) => {
      return (
        <Deal
          key={i}
          index={i}
          data={data}
        />
      );
    });
  }

  componentWillReceiveProps(nextProps) { }

  render() {
    return this.renderBar();
  }
}

export default Bar;

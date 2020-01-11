import React from "react";
import "./AdminForm.css";
import axios from "axios";
import Image from "../Image/Image";
import "../Bar/Bar.css";

class AdminForm extends React.Component {
  constructor(props) {
    super(props);

    let initialStateArray = [];

    const { deals = [], otherDeals = [] } = this.props.singleBar;
    [...deals, ...otherDeals].map((val, idx) => {
      let dealObj = {
        weekDays: val.weekDays.toString(),
        startTime: val.startTime,
        endTime: val.endTime,
        deals: val.description.toString()
      };
      return initialStateArray.push(dealObj);
    });

    this.state = {
      deals: initialStateArray,
      Name: this.props.singleBar.name,
      Address: this.props.singleBar.address,
      Validated: this.props.singleBar.validated,
      URL: this.props.singleBar.imgUrl,
      URLs: this.props.singleBar.imgUrls,
      place_id: this.props.singleBar.place_id
    };
  }

  handleChange = e => {
    if (
      ["weekDays", "startTime", "endTime", "deals"].includes(e.target.className)
    ) {
      let deals = [...this.state.deals];
      deals[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ deals }, () => console.log(this.state.deals));
    } else {
      this.setState({ [e.target.weekDays]: e.target.value });
    }
  };

  addDeal = e => {
    this.setState(prevState => ({
      deals: [
        ...prevState.deals,
        { weekDays: "", startTime: "", endTime: "", deals: "" }
      ]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    let tmpBar = this.props.singleBar;
    tmpBar.validated = this.state.Validated;
    tmpBar.imgUrls = this.state.URLs;
    tmpBar.imgUrl = this.state.URL;
    tmpBar.place_id = this.state.place_id;

    let tmpDealsArray = [];
    this.state.deals.map((val, idx) => {
      let tmpDealsObj = {
        description: val.deals.split(","),
        endTime: val.endTime.trim(),
        fullDescription: "placeholder description",
        startTime: val.startTime.trim(),
        weekDays: val.weekDays.split(",").map(Number)
      };

      for (var i = 0; i < tmpDealsObj.description.length; i++) {
        tmpDealsObj.description[i] = tmpDealsObj.description[i].trim();
      }

      return tmpDealsArray.push(tmpDealsObj);
    });

    this.props.singleBar.deals = tmpDealsArray;

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .put(
        "/api/bar?place_id=" + this.props.singleBar.place_id,
        this.props.singleBar,
        config
      )
      .then(function(response) {
        console.log("submitted");
      })
      .catch(function(error) {
        console.log(`error: ${error}`);
      });
  };

  handleDelete = e => {
    console.log(`delete: ${e.target.id}`);
    let tmpArray = this.state.deals.splice(e.target.id, 1);
    this.forceUpdate();
  };

  handleValidatedChange = e => {
    this.setState({ Validated: !this.state.Validated });
  };

  handleUrlChange = url => {
    var array = [...this.state.URLs]; // make a separate copy of the array
    var index = array.indexOf(url);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ URLs: array });
    } else {
      this.setState({ URLs: [...array, url] });
    }
  };

  handleUrlChange1 = e => {
    this.setState({ URL: e.target.value });
  };

  handlePlaceIdChange = e => {
    this.setState({ place_id: e.target.value });
  };

  render() {
    let { Name, deals, Validated, URLs, URL, place_id } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        className={"detailsWrapper"}
      >
        <button onClick={this.props.getPhotos}>Load photos</button>

        {this.props.photos &&
          this.props.photos.map(photo => {
            return (
              <div
                className={`${URLs.includes(photo) &&
                  "imageBorder"} googleImages`}
                onClick={() => this.handleUrlChange(photo)}
              >
                <Image src={photo} className="barDetailsImage" />
              </div>
            );
          })}
          <div className="adminUrl">
          Place ID:
          <input
            className="adminUrlInput"
            type="text"
            onChange={this.handlePlaceIdChange}
            value={place_id}
          />
        </div>
        <div className="adminUrl">
          Image Url:
          <input
            className="adminUrlInput"
            type="text"
            onChange={this.handleUrlChange1}
            value={URL}
          />
        </div>
        <div className="adminTitle">
          <label htmlFor="name">{Name}</label>
        </div>
        <br />
        <div className="adminValidated">
          <label className="container">
            Displayed
            <input
              type="checkbox"
              name="isValidated"
              checked={Validated}
              onChange={this.handleValidatedChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <br />

        <div className="adminFlexContainer">
          <div className="buttonsWrapper">
            <button className="button" onClick={this.addDeal}>
              Add new Deal
            </button>
            <input className="button" type="submit" value="Submit" />
          </div>
          {deals.map((val, idx) => {
            let wdId = `wd-${idx}`,
              stId = `st-${idx}`,
              etId = `et-${idx}`,
              dId = `d-${idx}`;
            return (
              <div className="dealItem" key={idx}>
                <label className="dealLabel">Deal {idx + 1}</label>
                <br />
                <a
                  className="close"
                  onClick={this.handleDelete}
                  id={idx}
                ></a>
                <br />
                <label className="itemLabel" htmlFor={wdId}>
                  Week Days:
                </label>
                <br />
                <input
                  type="text"
                  name={wdId}
                  data-id={idx}
                  id={wdId}
                  defaultValue={deals[idx].weekDays}
                  className="weekDays"
                />
                <br />
                <label className="itemLabel" htmlFor={stId}>
                  Start Time:
                </label>
                <br />
                <input
                  type="text"
                  name={stId}
                  data-id={idx}
                  id={stId}
                  defaultValue={deals[idx].startTime}
                  className="startTime"
                />
                <br />
                <label className="itemLabel" htmlFor={etId}>
                  End Time:
                </label>
                <br />
                <input
                  type="text"
                  name={etId}
                  data-id={idx}
                  id={etId}
                  defaultValue={deals[idx].endTime}
                  className="endTime"
                />
                <br />
                <label className="itemLabel" htmlFor={etId}>
                  Deals:
                </label>
                <br />
                <input
                  type="text"
                  name={dId}
                  data-id={idx}
                  id={dId}
                  defaultValue={deals[idx].deals}
                  className="deals"
                />
              </div>
            );
          })}
        </div>
      </form>
    );
  }
}
export default AdminForm;

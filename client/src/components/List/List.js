import React from "react";
import ListItem from "./ListItem";
import "./List.css";
import sadFace from "./sad.png";

class List extends React.Component {
  renderList() {
    // console.log("this.props.data", this.props.data);
    if (!this.props.data) return null;

    return this.props.data.map((data, i) => {
      return (
        <ListItem
          key={i}
          index={i}
          data={data}
          onClick={this.props.onClick}
          onHover={this.props.onHover}
        />
      );
    });
  }

  renderEmptyList() {
    console.log("no results, dislaying default message");
    return (
      <div className="empty-display">
        <img src={sadFace} className="empty-icon" alt="sadFace" />
        <br />
        <div className="empty-text"> No hapi hours available... </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return this.props.data[0] ? (
      <div className="listContainer">{this.renderList()}</div>
    ) : (
      <div className="emptyListContainer">{this.renderEmptyList()}</div>
    );
  }
}

export default List;

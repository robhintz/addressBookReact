import React, { Component } from "react";
import { MapComponent } from "./MapComponent";

export default class DistanceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latOne: "",
      lngOne: "",
      latTwo: "",
      lngTwo: "",
      distanceResponse: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=",
      this.state.latOne,
      ",",
      this.state.lngOne,
      "&destinations=",
      this.state.latTwo,
      "C",
      this.state.lngTwo,
      "&key=AIzaSyBQsZkPQSA1EB-NtI02TqQsXadZOXlYEXw"
    )
      .then((res) => res.json())
      .then((ParsedData) =>
        this.setState({
          distanceResponse: ParsedData,
        })
      );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="latOne"
            name="latOne"
            value={this.state.latOne}
            placeholder="latOne"
            onChange={this.handleChange}
          />
          <input
            type="text"
            id="lngOne"
            name="lngOne"
            value={this.state.lngOne}
            placeholder="lngOne"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="text"
            id="latTwo"
            name="latTwo"
            value={this.state.latTwo}
            placeholder="latTwo"
            onChange={this.handleChange}
          />
          <input
            type="text"
            id="lngTwo"
            name="lngTwo"
            value={this.state.lngTwo}
            placeholder="lngTwo"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

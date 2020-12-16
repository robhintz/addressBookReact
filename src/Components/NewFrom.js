import React, { Component } from "react";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://addressbookbackend.herokuapp.com/";
}

const rememberMe =
  "walmart Northern Fort collins walmart Buissness 40.585990 -105.054930 bob bob's house residental 40.558659 -105.129417 X";

export default class NewFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      tag: "",
      lat: "",
      lng: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //   name: String,
  //   description: String,
  //   tag: String,
  //   lat: String,
  //   lng: String,

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(baseURL + "/addressbook", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        tag: this.state.tag,
        lat: this.state.lat,
        lng: this.state.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.props.handleAddAddress(response);
        this.setState({
          name: "",
          description: "",
          tag: "",
          lat: "",
          lng: "",
        });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="address name"
          />

          <label htmlFor="description"></label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
            placeholder="description"
          />

          <label htmlFor="tag"></label>
          <input
            type="text"
            id="tag"
            name="tag"
            onChange={this.handleChange}
            value={this.state.tag}
            placeholder="tag"
          />

          <label htmlFor="lat"></label>
          <input
            type="text"
            id="lat"
            name="lat"
            onChange={this.handleChange}
            value={this.state.lat}
            placeholder="lat"
          />

          <label htmlFor="lng"></label>
          <input
            type="text"
            id="lng"
            name="lng"
            onChange={this.handleChange}
            value={this.state.lng}
            placeholder="lng"
          />

          <input type="submit" value="add marker" />
        </form>
      </div>
    );
  }
}

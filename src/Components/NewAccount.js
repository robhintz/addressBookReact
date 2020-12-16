import React, { Component } from "react";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "YOUR API BACKEND URL HERE!!!!!!!!!!111";
}

export default class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(baseURL + "/account", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        this.props.handleAddAccount(resJson);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="desired username"
          />
          <label htmlFor="password"></label>
          <input
            type="text"
            id="password"
            name="username"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="password"
          />
          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import NewFrom from "./NewFrom";
import UserAddresses from "./UserAddresses";
import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://addressbookbackend.herokuapp.com/";
}
// baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
console.log("current base URL:", baseURL);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      accounts: [],
    };
    this.getAddressData = this.getAddressData.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
    // this.deleteAddress = this.deleteAddress.bind(this);
    this.getAccountData = this.getAccountData.bind(this);
  }

  componentDidMount() {
    this.getAddressData();
    this.getAccountData();
  }

  getAccountData() {
    fetch(baseURL + "/account")
      .then(
        (data) => {
          return data.json();
        },
        (err) => console.log(err)
      )
      .then(
        (parsedData) => this.setState({ accounts: parsedData }),
        (err) => console.log(err)
      );
  }

  handleAddAccount(account) {
    const copyAccounts = [...this.state.accounts];
    copyAccounts.unshift(account);
    this.setState({
      accounts: copyAccounts,
    });
  }

  //\\\\\\\\\\\\\\\\\\\\\\\\\\\address related fetchs and functions/////////////////////////////
  handleAddAddress(address) {
    const copyAddresses = [...this.state.addresses];
    copyAddresses.unshift(address);
    this.setState({
      addresses: copyAddresses,
    });
  }

  getAddressData() {
    fetch(baseURL + "/addressbook")
      .then(
        (data) => {
          console.log(data);
          return data.json();
        },
        (err) => console.log(err)
      )
      .then(
        (parsedData) => this.setState({ addresses: parsedData }),
        (err) => console.log(err)
      );
  }

  // deleteAddress(id) {
  //   fetch(baseURL + "/addressbook/" + id, {
  //     method: "DELETE",
  //   }).then((response) => {
  //     const findIndex = this.state.addresses.findIndex(
  //       (address) => address._id === id
  //     );
  //     const copyAddresses = [...this.state.addresses];
  //     copyAddresses.splice(findIndex, 1);
  //     this.setState({ address: copyAddresses });
  //   });
  //   this.getAddressData();
  // }

  //

  render() {
    return (
      <div className="app">
        <NewFrom handleAddAddress={this.handleAddAddress} />
        <UserAddresses addresses={this.state.addresses} />
        <MapComponent
          addresses={this.state.addresses}
          deleteAddress={this.deleteAddress}
          getAddressData={this.getAddressData}
        />
      </div>
    );
  }
}

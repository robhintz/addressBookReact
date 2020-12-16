import React, { Component } from "react";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "YOUR API BACKEND URL HERE!!!!!!!!!!111";
}

export default class UserAddresses extends Component {
  constructor(props) {
    super(props);
    this.deleteAddress = this.deleteAddress.bind(this);
  }

  deleteAddress(id) {
    fetch(baseURL + "/addressbook/" + id, {
      method: "DELETE",
    }).then((response) => {
      const findIndex = this.props.addresses.findIndex(
        (address) => address._id === id
      );
      const copyAddresses = [...this.props.addresses];
      copyAddresses.splice(findIndex, 1);
      this.setState({ address: copyAddresses });
    });
    this.getAddressData();
  }

  getAddressData() {
    fetch(baseURL + "/addressbook")
      .then(
        (data) => {
          return data.json();
        },
        (err) => console.log(err)
      )
      .then(
        (parsedData) => this.setState({ addresses: parsedData }),
        (err) => console.log(err)
      );
  }

  render() {
    return (
      <div className="UserAddresses">
        <table>
          <tbody>
            {this.props.addresses.map((address) => {
              return (
                <tr key={address._id}>
                  <td> {address.name} </td>
                  <td> {address.description} </td>
                  <td> {address.tag} </td>
                  <td> {address.lat} </td>
                  <td> {address.lng} </td>
                  <td onClick={() => this.deleteAddress(address._id)}>X</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

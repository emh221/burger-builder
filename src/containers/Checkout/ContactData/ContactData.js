import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner'
import Classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Eric",
        address: {
          street: "Teststreet",
          zipcode: "97030",
          state: "OR"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false});
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false});
      });
  };

  render() {
      let form = (<form>
        <input
          className={Classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={Classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={Classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={Classes.Input}
          type="text"
          name="postalCode"
          placeholder="Your Zip Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>);
      if(this.state.loading){
          form = <Spinner/>
      }
    return (
      <div className={Classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

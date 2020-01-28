import React, { Component } from 'react';
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Aux/Aux'

class OrderSummary extends Component {
  componentDidUpdate() {
    // console.log('[OrderSummary] will update')
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(el => {
      return <li key = {el}><span style ={{ textTransform: 'capitalize'}}>{el}</span>: {this.props.ingredients[el]} $</li>;
    })

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: $ {this.props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType = 'Danger' clicked = {this.props.purchaseCancelled}>
      CANCEL
      </Button>
      <Button btnType = 'Success' clicked = {this.props.purchaseContinued}>
      CONTINUE
      </Button>
    </Aux>
  )
  }
}

export default OrderSummary;

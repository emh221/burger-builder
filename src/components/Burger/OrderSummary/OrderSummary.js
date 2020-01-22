import React from 'react';
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Aux'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(el => {
      return <li key = {el}><span style ={{ textTransform: 'capitalize'}}>{el}</span>: {props.ingredients[el]} $</li>;
    })

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: $ {props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType = 'Danger' clicked = {props.purchaseCancelled}>
      CANCEL
      </Button>
      <Button btnType = 'Success' clicked = {props.purchaseContinued}>
      CONTINUE
      </Button>
    </Aux>
  )
}

export default OrderSummary;

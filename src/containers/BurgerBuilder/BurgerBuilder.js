import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
// import Backdrop from '../../components/UI/Backdrop/Backdrop'

const INGREDIENT_PRICES = {
  salad: .25,
  cheese: .25,
  meat: .75,
  bacon: .50
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: .75,
    canBuy: false,
    isBuying: false,
  }

  purchaseHandler = () => {
    this.setState({isBuying: true});
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({canBuy : sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);

  }

  subtractIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount -1
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const newPrice = this.state.totalPrice -INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseCancelHandler = () => {
    this.setState({isBuying: false})
  }

  purchaseContinueHandler = () => {
    alert('You choose to continue!')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return(
      <Aux>
        <Modal
          show ={this.state.isBuying}
          modalClosed = {this.purchaseCancelHandler}> <OrderSummary
            price = {this.state.totalPrice.toFixed(2)}
            ingredients = {this.state.ingredients}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler} />
        </Modal>
        <Burger
          ingredients = {this.state.ingredients} />
        <BuildControls
          price = {`$ ${this.state.totalPrice.toFixed(2)}`}
          ingredientAdded = {this.addIngredientHandler}
          ingredientSubtracted = {this.subtractIngredientHandler}
          disabled ={disabledInfo}
          canBuy = {this.state.canBuy}
          isBuying = {this.purchaseHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;

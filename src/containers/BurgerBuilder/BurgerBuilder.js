import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders.js'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import Backdrop from '../../components/UI/Backdrop/Backdrop'

const INGREDIENT_PRICES = {
  salad: .25,
  cheese: .25,
  meat: .75,
  bacon: .50
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: .75,
    canBuy: false,
    isBuying: false,
    loading: false,
    error: false
  }
// https://cors-anywhere.herokuapp.com/https://react-my-burger-ab5c1.firebaseio.com
  componentDidMount () {
    console.log(this.props)
    console.log('[BurgerBuilder.js] did mount')
    axios.get('/ingredients.json')
    .then(response => {
      this.setState({ingredients : response.data})
    })
    .catch(err => {
      this.setState({error : true})
    })
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
        const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
    
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if(this.state.ingredients){
     burger = (
      <Aux>
      <Burger ingredients = {this.state.ingredients} />
    <BuildControls
      price = {`$ ${this.state.totalPrice.toFixed(2)}`}
      ingredientAdded = {this.addIngredientHandler}
      ingredientSubtracted = {this.subtractIngredientHandler}
      disabled ={disabledInfo}
      canBuy = {this.state.canBuy}
      isBuying = {this.purchaseHandler}/>
      </Aux>
    );
    orderSummary = <OrderSummary
      price = {this.state.totalPrice.toFixed(2)}
      ingredients = {this.state.ingredients}
      purchaseCancelled = {this.purchaseCancelHandler}
      purchaseContinued = {this.purchaseContinueHandler} />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return(
      <Aux>
        <Modal
          show ={this.state.isBuying}
          modalClosed = {this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

import { useContext, useState, Fragment } from "react";

import CartContext from "../../store/cart-context";

import CartItem from "./CartItem";

import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };
  
  const submitOrderHandler = async ( userData ) => {

    setIsSubmitting(true);
    await fetch("http://localhost:3600/orders",{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,

      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
    {CartItems}
      <div className={classes.total}>
        <span> Total Amount </span>
        <span> {totalAmount} </span>
      </div>
      {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckOut && modalActions}
    </Fragment>
  )

  const isSubmittingModalContent = <p> Sending order data.... </p>

  const didSubmitModalContent = (
    <Fragment>
    <p>Order Confirmed! Thanks for choosing ZwiggySomato!!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </Fragment>
    );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

// <div className={classes.total}>
//   { +totalAmount.split("₹")[1] !== 0 ? <div><span>Total Amount</span>
//   <span>{totalAmount} </span>  </div>: <span>no items</span>}
// </div>

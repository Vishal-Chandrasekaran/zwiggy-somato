import CartIcon from "../Cart/CartIcon";

import classes from './HeaderCartButton.module.css'

import { useContext, useEffect, useState} from "react";

import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

  const[btnIsHiglighted, setbtnIsHighlighted] = useState(false); 

  const cartCtx = useContext(CartContext);
  
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item)=>{
    return(curNumber + item.amount);
  },0);

  
  const btnclasses = `${classes.button} ${ btnIsHiglighted ? classes.bump : '' }`;

  useEffect(()=>{
    if(items.length === 0 ){
      return;
    }
    setbtnIsHighlighted(true);

    const timer = setTimeout(()=>{
      setbtnIsHighlighted(false);
    },300);

    return() => {
      clearTimeout(timer);
    }

  },[items]);

    return(
        <button className={btnclasses} onClick={props.onClick}>
          <span className={classes.icon} >
            <CartIcon />
          </span>
          <span> Your Cart </span>
          <span className={classes.badge} > {numberOfCartItems} </span>
        </button>
    )
};

export default HeaderCartButton;
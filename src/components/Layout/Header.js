import {Fragment} from "react";

import stockImage from '../../assets/meals.jpg';

import classes from './Header.module.css'

import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return(
        <Fragment>
          <header className= {classes.header} >
            <h1> Zwiggy Somato </h1>
            <HeaderCartButton onClick={props.onShowCart} />
          </header>
          <div className= {classes['main-image']} >
            <img src={stockImage} alt=" It is filled with mouth-watering foods " />
          </div>
        </Fragment>
    )
};

export default Header;
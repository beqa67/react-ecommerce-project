import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";


// import './navigation.style.scss'
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <div className={styles.navigation}>
        <Link className={styles.logoContainer} to='/'>
         <CrwnLogo />
        </Link>
        <div className={styles.navLinksContainer}>
          <Link className={styles.navLink} to='/shop'>
            SHOP
          </Link>
            <span className={styles.navLink} onClick={signOutUser}> SIGN OUT </span>
          { currentUser ? (
            <span className={styles.navLink} onClick={signOutUser}> SIGN OUT </span>
          ) : (
            <Link className={styles.navLink} to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, arrow, cart } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCart = () => {
  const { cart, setCart, subtotal, setSubtotal } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState({});
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
  let theTotal = 0;
  let newArray = cart.map((item) => {
    let count = cart.filter((el) => el.id === item.id).length;
    return { ...item, count: count };
  });

  let unique = [...new Set(newArray.map((a) => a.name))];
  let newCart = [];
  newArray.forEach((item) => {
    if (unique.includes(item.name)) {
      newCart.push(item);
      unique = unique.filter((e) => e !== item.name);
    }
  });
  // console.log("cart madness.", newArray);
  console.log("BEHOLD THE NEW CART", newCart);
  console.log("cart contents on shopping cart page", cart);

const sumCart = (obj) => {
  for (let i=0; i<obj.length; i++){
    theTotal += parseFloat(obj[i].price);
  }
  console.log("NEW CART TOTAL CALCULATION", theTotal);
}
// sumCart(cart)
console.log("each cart total", cartTotal)
console.log('the SUB TOTAL', subtotal)

  // useEffect(() => {
  //   if (cart.length !== 0) {
  //     setSubtotal(sumValues(cartTotal));
  //   }
  // }, [cartTotal]);

useEffect(()=>{
  if (cart.length !== 0) {
    setSubtotal(sumValues(cartTotal));
  }
  sumCart(cart)
  setSubtotal(theTotal)
}, [cartTotal])

  // useEffect(()=>{
  //   (async() =>{
  //     const newTotal = await(sumCart(cart))
  //     console.log("newTOTAL", newTotal)
  //     // setSubtotal(newTotal)
  //   })();
  // }, [theTotal])


  // useEffect(()=>{
  //   (async () => {
  //     const newTotal = await(sumValues(cartTotal))
  //     setSubtotal(newTotal)
  //   })();
  // }, [cartTotal])



  return (
    <div className="cart-page">
      <section className="left-cart-wrapper">
        <div className="mk-logo">
          <Link to="/">
            <img src={logo} alt="market avenue logo" />
          </Link>
        </div>
        <div className="back-arrow">
          <Link to="/customerHome">
            <img src={arrow} alt="backwards arrow" />
            back to products
          </Link>
        </div>
        {/* <div className='subtotal'>SUBTOTAL: {subtotal}</div> */}
        <div className="left-content">
          {newCart.length > 0 ? (
            newCart.map((item) => (
              <ShoppingCartItem
                item={item}
                setSubtotal={setSubtotal}
                setCartTotal={setCartTotal}
                cartTotal={cartTotal}
              />
            ))
          ) : (
            <h1>Shopping Cart is empty</h1>
          )}
        </div>
      </section>
      <section className="right-cart-wrapper">
        <h1>Subtotal: ${subtotal.toFixed(2)} </h1>
        {/* <h1>CartTotal: {}</h1> */}
        <p>Taxes(where applicable) added at checkout</p>
        <button className="checkout-btn">Checkout</button>
      </section>
    </div>
  );
};
export default ShoppingCart;

// cart -> count of items -> only unique items ->

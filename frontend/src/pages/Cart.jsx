import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cart";
import { useAuth } from "../components/context/context";
import Layout from "../components/Layout";
import Dropin from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const removeCart = async (id) => {
    try {
      let myCart = [...cart];
      let filter = myCart.filter((filter) => filter._id !== id);
      myCart.splice(filter, 1);
      setCart(filter);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //   total price
  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // get payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/braintree/token`
      );
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product/braintree/payment`,
        nonce,
        cart
      );
      localStorage.removeItem("cart");
      setCart([]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You have ${cart?.length} item in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((cart) => {
              return (
                <div key={cart._id} className="row m-2 card flex-row mb-2">
                  <div className="col-md-4">
                    <img src="oip" alt="bad img" />
                  </div>
                  <div className="col-md-8">
                    <h4>{cart.name}</h4>
                    <p>{cart.description}</p>
                    <p>Price : ${cart.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCart(cart._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            <Dropin
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
          </div>
        </div>
        <div className="mt-2">
          <button className="btn btn-primary" onClick={handlePayment}>
            make payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

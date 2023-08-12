import React from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { productReducer } from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
function Products(props) {
    const navigate = useNavigate();
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    cart: [],
  });
  const getProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
    dispatch({
      type: "PRODUCT ADDED",
      payload: data,
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (prod) => {
    const alreadyInCart = state.cart.some((cart) => cart.id === prod.id);
    if(alreadyInCart){
        alert("Item is Already in Your cart")
    }else{
        dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: prod.id,
        title: prod.title,
        thumbnail: prod.thumbnail,
        qty: prod.qty,
        price: prod.price,
      },
    });

    axios.post(`${process.env.REACT_APP_API_URL}/cart`, prod).then((res) => console.log(res.data))
    }
  };

  return (
    <div>
        <button onClick={()=>navigate('/cart')} style={{padding:"20px"}}>Cart</button>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {state.products.map((prod) => {
        return (
          <div
            key={prod.id}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 10,
              border: "1px solid grey",
              width: "30%",
              marginTop: 10,
              gap: 10,
            }}
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              style={{ height: 200, objectFit: "cover" }}
            />
            <h2>{prod.title}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <h3>Rs. {prod.price}</h3>
              <h3>Rating: {prod.rating}</h3>
            </div>

            <button
              onClick={()=>handleAddToCart(prod)}
              style={{
                padding: "10px",
                width: "100%",
                backgroundColor: "green",
                color: "white",
                fontSize: "20px",
              }}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Products;

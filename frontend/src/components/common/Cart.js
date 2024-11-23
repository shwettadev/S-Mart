import React, { useEffect, useState } from "react";
import { getAPIDetails } from "../../utility/api";
import Card from "./Card/Card";
import "./Cart.scss";

export default function Cart(props) {
  const { dialogRef, closePanel } = props;
  const [productList, setProductList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const groupBy = (array, key) => {
    return array.reduce((accumulator, currentItem) => {
      const groupKey = currentItem[key];

      if (!accumulator[groupKey]) {
        accumulator[groupKey] = [];
      }

      accumulator[groupKey].push(currentItem);
      return accumulator;
    }, {});
  };

  const getCartList = () => {
    const getProductList = getAPIDetails("http://localhost:8080/getCart")
      .then((res) => {
        setTotalValue(res?.data?.value);
        setProductList(groupBy(res?.data?.cartItems, "id"));
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    getCartList();
  }, []);

  return (
    <dialog ref={dialogRef} className="my-panel-dialog">
     
      {Object.values(productList).map((item) => 
        <Card 
        data={[item[0]]}
        cartItem = {item.length}
        />
      )}

      <h5>Total Value : {totalValue}</h5>
      <button onClick={() => closePanel()}>Buy Now</button>
      <button onClick={() => closePanel()}>Cancel</button>
    </dialog>
  );
}

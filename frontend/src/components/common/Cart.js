import React, { useEffect, useState } from "react";
import { getAPIDetails } from "../../utility/api";

export default function Cart() {
    const [productList, setProductList] = useState([]);
    const getCartList = () => {
        const getProductList = getAPIDetails("http://localhost:8080/getCart")
        .then((res) => setProductList([...res?.data]))
        .catch((err) => console.log("error", err));
    }
useEffect(() => {
    getCartList();
},[])

  return <></>;
}

import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import { PRODUCT_LIST } from '../../utility/constant';
import { getProductList } from '../../redux/action/dashboard.action';
import { getAPIDetails } from '../../utility/api';

export default function Dashboard(){
    const [productList, setProductList] = useState([]);
useEffect(() =>{
    // // getProductList("http://localhost:8080/dashboard")

    // .then((res) => console.log("check response",res))
    // .catch((err) => console.log("error",err)
    // )
    const getProductList = getAPIDetails("http://localhost:8080/dashboard")
            .then((res) => setProductList([...res?.data]))
    .catch((err) => console.log("error",err)
    )
},[])
    return(
        <>
        <Header/>
        <Card
        data = {productList}/>
        </>
    )
}
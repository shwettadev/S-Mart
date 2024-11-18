import React, { useState } from 'react';
import MotherDairy from "../../../images/mother dairy milk.avif"
import { postAPIDetails } from '../../../utility/api';

function Card(props){

const {data} = props

const [productList, setProductList] = useState([]);

const addToCart = (item) =>{
  const getProductList = postAPIDetails(`http://localhost:8080/addToCart?id=${item?.id}`)
  .then((res) => setProductList([...res?.data]))
.catch((err) => console.log("error",err)
)
}
return(
    <div>
    {data.map((item) =>
    <div className="card" style={{width: "18rem"}}>
  <img src={item.path} class="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <h5 className="card-title">Price: {item.price}</h5>
    <a href="#" className="btn btn-primary" onClick={() => addToCart(item)}>Add To Cart</a>
  </div>
</div>
)}
    </div>
)
}

export default Card
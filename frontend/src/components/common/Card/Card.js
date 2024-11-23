import React, { useEffect, useState } from 'react';
import MotherDairy from "../../../images/mother dairy milk.avif"
import { postAPIDetails } from '../../../utility/api';
import Dashboard from '../../../pages/Dashboard/Dashboard';

function Card(props){

const {data,addToCart,stock,cartItem} = props

return(
    <div>
    {data.map((item) =>
    <div className="card" style={{width: "18rem" , marginBottom: "10px"}}>
  <img src={item.imgSrc} class="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <h5 className="card-title">Price: {item.price}</h5>
    {stock &&  <h5 className="card-title">{item?.quantity > 0 ? `Only ${item?.quantity} Left` : "Out Of Stock"}</h5> }
    {cartItem && <button>{cartItem} in cart</button>}
    <a href="#" className="btn btn-primary" onClick={() => addToCart(item)}>Add To Cart</a>
  </div>
</div>
)}
    </div>
)
}

export default Card
import React, { useEffect, useState } from 'react';
import MotherDairy from "../../../images/mother dairy milk.avif"
import { postAPIDetails } from '../../../utility/api';
import Dashboard from '../../../pages/Dashboard/Dashboard';

function Card(props){

const {data,addToCart} = props


return(
    <div>
    {data.map((item) =>
    <div className="card" style={{width: "18rem"}}>
  <img src={item.imgSrc} class="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <h5 className="card-title">Price: {item.price}</h5>
    <h5 className="card-title">{item?.quantity > 0 ? `Left Only ${item?.quantity}` : "Out Of Stock"}</h5>
    <a href="#" className="btn btn-primary" onClick={() => addToCart(item)}>Add To Cart</a>
  </div>
</div>
)}
    </div>
)
}

export default Card
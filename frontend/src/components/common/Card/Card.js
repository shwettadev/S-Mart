import React from 'react';
import MotherDairy from "../../../images/mother dairy milk.avif"

function Card(props){
const {data} = props
return(
    <div>
    {data.map((item) =>
    <div className="card" style={{width: "18rem"}}>
  <img src={item.path} class="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <h5 className="card-title">Price: {item.price}</h5>
    <a href="#" className="btn btn-primary">Add To Cart</a>
  </div>
</div>
)}
    </div>
)
}

export default Card
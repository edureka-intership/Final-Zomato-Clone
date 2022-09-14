import React from 'react'
import { Link,useParams } from 'react-router-dom'; 
export default function Mealtype(props)
{
  return (
    
    <Link className="col-sm-12 col-md-12 col-lg-4" to={`/filter/${props.item.name}`}>
    <div className="tileContainer">
        <div className="tileComponent1">
        <img src={require('../../'+props.item.image)} height="150" width="140" />
        </div>
        <div className="tileComponent2">
          <div className="componentHeading">
              {props.item.name}
          </div> 
          <div className="componentSubHeading">
          {props.item.content}
          </div>
        </div>
        </div>
    </Link>
  )
}

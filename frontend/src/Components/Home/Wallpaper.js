import React, { Component } from 'react'
import wallpaper from '../../assets/homepageimg.png'
import '../../style/Wallpaper.css'
import { Link } from 'react-router-dom';



export default class  extends Component {
    constructor(){
        super();
        this.state={
            locations:[],
            restaurants:[]
        }
    }
    
    componentDidMount(){
        fetch('http://localhost:9090/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({locations:data.data}))
    }
    fetchRestaurants=(event)=>{
        // console.log(event.target.value)
        fetch(`http://localhost:9090/restaurant/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurants:data.data}))
    }




  render() {
    // console.log(this.state.restaurants)
    const locationList= this.state.locations.length && this.state.locations.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)
    const restaurantList = <ul>
                                                                {
                                                                    this.state.restaurants.map(item=>
                                                                        <li key={item.name}>
                                                                            <Link to={`/details/${item.name}`}>
                                                                                    {item.name}
                                                                            </Link>
                                                                             
                                                                        </li>
                                                                      
                                                                        )
                                                                }
                                                            </ul>
    return (

        <div>
        <div>
        <img src={wallpaper} width='100%' height='450' />

        <div className="logo">
            <p>e!</p>
        </div>
        <div className="headings">
            Find the best restaurants, cafes, bars 
                </div>
        <div className="locationSelector">
            <select className="locationDropdown" onChange={this.fetchRestaurants}>
             <option value="0">select</option>
              {locationList}
            </select>
            <div  id="notebooks">
            <div class="input-group-text bg-white rounded-0 restaurantsinput" id="basic-addon1" ><i className="bi bi-search ps-2"></i>
                <input className="restaurantsinput" type="text" placeholder="Search Restaurant on" />
               
                {restaurantList}
                <span className="glyphicon glyphicon-search search"></span>
                </div>
            </div>
           
        </div>
    </div >
    </div>
    )
  }
}

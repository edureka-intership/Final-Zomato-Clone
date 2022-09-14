import React, { useState , useEffect} from 'react'
import Header from '../Common/Header'
import {useParams} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../style/Details.css'
import Modal from 'react-modal';
export default function RestaurantsDetails() {
  //hooks


  
  const [restaurant,setRestaurant]=useState({})
  const[isMenuModalOpen,setMenuModal]=useState(false)
  const[menu, setMenu]=useState([])
  const[totalPrice,setTotalPrice]=useState(0)
  let {rName}=useParams()




  //  const fetchMenu=()=>{
  //  fetch(`http://localhost:9090/menu/${rName}`,{method:'GET'})
  //  .then(response=>response.json())
  //  .then(data=>setMenu(data.data))
  // }
 const fetchMenu=()=>{
  fetch(`http://localhost:9090/menu/${rName}`,{method:'GET'})
  .then(response=>response.json())
  .then(data=>setMenu(data.data))
}
  // console.log("menu:",menu)
  const calTotalPrice=(item)=>{
    let price=totalPrice+ item.itemPrice;
    setTotalPrice(price)
  }
  const calTotalPRice=(item)=>{ 
    let price=totalPrice- item.itemPrice;
    setTotalPrice(price)
  }
  
  //LifeCycle hooks: CompountDidMount and compoutdidUpdate
  useEffect(()=>{
    fetch(`http://localhost:9090/restaurant/details/${rName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>setRestaurant(data.data))
  },[])



  const loadScript=(rpScript)=>{
    console.log("script is getting added..",rpScript)
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=rpScript;
        script.onload=()=>{
          console.log("success"); 
          openRazorpay();
          resolve(true)
        }
  
        script.onerror=()=>{
        console.log("failure") ;
          resolve(false);
        }
        document.body.appendChild(script);
        console.log(document.body.getElementsByTagName('script'))
    })
     
      

   }

   const openRazorpay=async()=>{
   try{
        //call API that would generate order in the backend 
       let orderData;
       orderData= await fetch('http://localhost:9090/payment',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({amount:totalPrice})
        }).then(resp=>resp.json())
        
        

        const options={
            key:"rzp_test_bfPUFMRsFHrlFB",
            amount:orderData.amount,
            order_id:orderData.id,
            currency:orderData.currency,
            name:'Zomato food delivery app',

            prefill:{
                email:'hahiri5791@shbiso.com',
                contact:'202-555-0183'  
            },
            handler:function(response){
              console.log(response)
              fetch('http://localhost:9090/payment/save',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              razorpay_orderid:response.razorpay_order_id,
              razorpay_payementid:response.razorpay_payement_id,
              razorpay_signature:response.razorpay_signature,
              razorpay_amount:orderData.amount
            })
        }).then(resp=>console.log(resp))

            }
        }
    
        const paymentWindow= new window.Razorpay(options);
        paymentWindow.open()
   



   }catch(error){
    console.log(error)
   }

    
       
       
   }


  const{name, thumb, address, Cuisine, cost}=restaurant
  const cuisineList=!(Cuisine==undefined) && Cuisine.length &&<ul>
                                                                    {Cuisine.map(item=>
                                                                      <li key={item.name}>
                                                                          {item.name}
                                                                      </li>
                                                                      )}

                                                               </ul>

  return (
    <div>
      <Header/>
      <div>
        <img src={thumb} height="400px" width="100%"/>
      </div>
      <div>
        <h2>{name}
        <button className='btn btn-danger' style={{float:'right'}} onClick={()=>{fetchMenu();setMenuModal(true)}}>Place Online Order</button>
        </h2>
      </div>
      <div>
          <Tabs>
               <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Contact</Tab>
                </TabList>

               <TabPanel>
                     <div className='about'>About the Place</div>
                     <div className='head'>Cuisine</div>
                     {cuisineList}
                     <div className='head'>average Cost</div>
                     <div className='value'>&#8377;{cost}</div>

                </TabPanel>
                <TabPanel>
                      <div className='head'>Phone Number</div>
                      <div >+91-123344564234</div>
                      <div className='head'>{name}</div>
                      <div className='value'>{address}</div>
                </TabPanel>
           </Tabs>
      </div>
      <Modal
      isOpen={isMenuModalOpen}
      >
        <div>
        <h2>Menu 
        <button onClick={()=>setMenuModal(false)} className="btn btn-outline-danger float-end">X</button>
        </h2>
        </div>
        <div>
        <ul>
          {
            menu.length &&
                  menu.map((item, index)=><li key={index}> <div>
                  {item.isVeg ? <span className='text-success'>{item.itemName}<i className="bi bi-check-circle-fill m-2"></i></span>: <span className='text-danger'>{item.itemName}<i className="bi bi-check-circle-fill m-2"></i></span>}
   
             </div> 
             <div>
             &#8377; {item.itemPrice}
                            </div> 
                            <div>
                              {item.restaurantId}
                              </div>  
                            <div>
                                 {item.itemDescription}
                            </div>  
                            <div>
                            {/* className='btn btn-primary' style={{height:'40px',width:"50px",background:"red",float:"right",textAlign:'center'}} */}
                            {/* <span class="input-group-text bg-white rounded-0" id="basic-addon1"  onClick={()=>calTotalPrice(item)}><i class="bi bi-plus-circle"></i></span> */}
                                {/* <button  onClick={()=>calTotalPrice(item)}><i class="bi bi-plus-circle"></i></button> */}
                                <i className="bi bi-plus-circle text-success " onClick={()=>calTotalPrice(item)}></i>

                                <i className="bi bi-dash-circle text-danger m-2" onClick={()=>calTotalPRice(item)}></i>
                            </div>
               </li>)
          }
        </ul>
        <br/>
            <hr/>
              <h3>
                
                Total Price:&#8377;{totalPrice}

                 {/* two steps to get executed : 1.  to attach a js to the current web page  2. call a method from that attached js to see payment window */}
                 <button className='btn btn-danger'style={{height:'40px',width:"100px",background:"red",float:"right"}}  onClick={()=>{setMenuModal(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay()}}>Pay Now</button> 

              </h3>
      </div>
      </Modal>
      
    </div>
  )
}

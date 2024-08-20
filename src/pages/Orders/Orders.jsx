import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { assets } from '../../assets/assets';



const Orders = ({url}) => {


  const [orders,setOrders] = useState([]);
  


  const fetchUserOrders = async () =>{
   
    try {
      const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
    } catch (error) {
      console.log(error);
      console.error("Error fetching orders:",error);
      toast.error("An error occurred while fetching orders. Please try again.");
      
    }
    
  }


  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchUserOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the order status.");
    }
  };


  useEffect(()=>{
    fetchUserOrders();
  },[])



  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
        <div key={index} className='order-item'>
          <img src={assets.parcel_icon} alt="" />
          <div>
            <p className='order-item-prod'>
              {order.items.map((item,index)=>{
                if (index===order.items.length-1) {
               return item.name + " x " + item.quantity

                } else {
                  return item.name + " x " + item.quantity + " , "
                }
              })}
            </p>
            <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
            <div className='order-item-address'>
              <p>{order.address.address+","}</p>
              <p>{order.address.city+", "+order.address.county+" , "+order.address.country+" , "+order.address.postcode}</p>
            </div>
            <p className='order-item-phone'>{order.address.phone}</p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>£{order.amount}</p>
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
            <option value="Order processing">Order Processing</option>
            <option value="Order confirmed">Order Confirmed</option>
            <option value="Ready for delivery">Ready for delivery</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Order Delivered</option>
          </select>
        </div>
        ))}
      </div>
      
    </div>
  )
}


 
export default Orders
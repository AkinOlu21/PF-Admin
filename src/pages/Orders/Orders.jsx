import React, { useEffect } from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { assets } from '../../assets/assets';



const Orders = ({url}) => {


  const [orders,setOrders] = useState([]);


  const fetchUserOrders = async () =>{
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }


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
              <p>{order.address.city+", "+order.address.county+" , "+order.address.country+" , "+order.address.postcoddiv}</p>
            </div>
            <p className='order-item-phone'>{order.address.phone}</p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>£{order.amount}</p>
          <select >
            <option value="Order processing">Order Processing</option>
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
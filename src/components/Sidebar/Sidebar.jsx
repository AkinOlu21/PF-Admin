import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <div className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </div>
            <div className="sidebar-option">
                <img src={assets.list_items} alt="" />
                <p>List Items</p>
            </div>
            <div className="sidebar-option">
                <img src={assets.check_order} alt="" />
                <p>Currrent orders</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
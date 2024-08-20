import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Prescriptions.css';

const Prescriptions = () => {

    const url = "http://localhost:4000"

    const [prescriptions,setPrescriptions] = useState([]);
    

    const fetchPrescriptions = async () => {
        try {
            const response = await axios.get(url+"/api/prescription/prescriptionlist");
            console.log(response.data);
            if (response.data.success) {
                setPrescriptions(response.data.data);
                
                console.log("Prescriptions loaded");
            } else {
                console.log("Prescriptions not available");
            }
            
        } catch (error) {
            console.error("Error fetching prescriptions:",error);   
        }
        
    };

    const statusHandler = async (event, prescriptionId) => {
        try {
          const response = await axios.post(`${url}/api/order/prescriptionstatus`, {
            prescriptionId,
            status: event.target.value
          });
          if (response.data.success) {
            await fetchPrescriptions();
          }
        } catch (error) {
          console.error("Error updating prescription status:", error);
        }
      };


    useEffect(()=>{
        fetchPrescriptions();
        
    },[]);


    

  return (
    <div>
        <h1>Current Prescriptions orders</h1>
     
        <div className="prescription-list">
            
            {prescriptions.map((prescription) => (
          <div key={prescription._id}className='prescription-items'>

            <div className='pres-medi-note'>
                <p>Medication: {prescription.medication}</p>
                <p>Note:{prescription.Note}</p>  
            </div>

            <div className='pres-CT'>
                <p>Collection Type: {prescription.collectionType}</p>
            </div>

            <div className='pres-dosage'>
                <p>Dosage: {prescription.Dosage}</p>
            </div>
            
                   
        <select onChange={(event)=> statusHandler(event,prescription._id)} value={prescription.status} >
            <option value="Order processing">Order Processing</option>
            <option value="Ready for delivery">Ready for delivery</option>
            <option value="Ready for collection">Ready for Collection</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Order Delivered</option>
            <option value="Collected">Order Collected</option>
        </select>
        </div>
        ))}
    </div>
    
    </div>
  );
};



export default Prescriptions
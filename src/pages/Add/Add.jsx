import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../../../apiconfig'

const Add = () => {

    const url = "http://localhost:4000";
const [image,setImage] = useState(false);
const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Allergy and Hayfever"
})

const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
}

useEffect(()=>{
    console.log(data);

},[data])


const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`${API_BASE_URL}add`,formData);
    if (response.data.success) {
        setData({
            name:"",
            description:"",
            price:"",
            category:"Allergy and Hayfever"
    })
        setImage(false)
        toast.success(response.data.message)
    }
    else {
        toast.error(response.data.message)
    }

}

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col" >
                <p>Name of product</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Name of product' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea   onChange={onChangeHandler}  value={data.description} name="description" rows="6" placeholder='Product description here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler}  name="category" >
                        <option value="Allergy and Havfever">Allergy and Hayfever</option>
                        <option value="Vitamins">Vitamins</option>
                        <option value="Supplements">Supplements</option>
                        <option value="Pain">Pain</option>
                        <option value="First Aid">First Aid</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Eyecare">Eyecare</option>
                        <option value="Heartburn and Indigestion">HeartBurn and Indigestion</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='enter price' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>

    </div>
  )
}

export default Add
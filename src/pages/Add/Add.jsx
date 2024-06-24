import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

const Add = () => {
  return (
    <div className='add'>
        <form className='flex-col'>
            <div className="add-image-upload flex-col">
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={assets.upload} alt="" />
                </label>
                <input type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col" >
                <p>Name of product</p>
                <input type="text" name='name' placeholder='Name of product' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="description" rows="6" placeholder='product description here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Prodcut category</p>
                    <select name="category" >
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
                    <input type="number" name='price' placeholder='enter price' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>

    </div>
  )
}

export default Add
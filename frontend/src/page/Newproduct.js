import React, { useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';


const Newproduct = () => {

  const [data,setData] = useState({
    name:"",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e) =>{
    const {name,value}=e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
  const uploadImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
//    console.log(data)
    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })

  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body :JSON.stringify(data)
    })

    const fetchRes = await fetchData.json()
    console.log(fetchData)
  }
  return (
    <div className="p-4">
      <form
        className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />
        <label htmlFor='category'>Category</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='category' onChange={handleOnChange}
          name='category'
          value={data.category}
        >
          <option value="other">Select category</option>
          <option value="rice">Rice</option>
          <option value="pasta">Pasta</option>
          <option value="kottu">Kottu</option>
          <option value="noodless">Noodles</option>
          <option value="burger">Burger</option>
          <option value="cuttleFish">CuttleFish</option>
          <option value="soups">Soups</option>
          <option value="salad">Salad</option>
          <option value="sandwich">Sandwich</option>
          <option value="freshJuice">Fresh Juice</option>
        </select>

      <label htmlFor='image'>Image
      <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer '>
      {
        data.image ? <img src={data.image} className='h-full'/> :<span className='text-5xl'><BsCloudUpload /></span>
      }
 
      <input type={"file"} accept='image/*' id="image" onChange={uploadImage} className='hidden'/>
      </div>
      </label>
      <label htmlFor='price' className='my-1'>Price</label>
      <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

      <label htmlFor='description'>Description</label>
      <textarea rows={3} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>
      <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>

      </form>
        
    </div>
  )
}


export default Newproduct;



/*import React, { useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64'; // assuming you have this function

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });

  const uploadImage = async (e) => {
    const base64Image = await ImagetoBase64(e.target.files[0]); // Convert image to base64
    setData({ ...data, image: base64Image }); // Update the state with base64 image
  };

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    console.log(data);
  };

  return (
    <div className="p-4">
      <form
        className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white'
        onSubmit={handleSubmit}
      >

        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          className='bg-slate-200 p-1 my-1'
          value={data.name}
          onChange={handleOnChange}
        />

        <label htmlFor='category'>Category</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='category'
          name='category'
          value={data.category}
          onChange={handleOnChange}
        >
          <option value="other">Select category</option>
          <option value="rice">Rice</option>
          <option value="pasta">Pasta</option>
          <option value="kottu">Kottu</option>
          <option value="noodless">Noodles</option>
          <option value="burger">Burger</option>
          <option value="cuttleFish">CuttleFish</option>
          <option value="soups">Soups</option>
          <option value="salad">Salad</option>
          <option value="sandwich">Sandwich</option>
          <option value="freshJuice">Fresh Juice</option>
        </select>

        <label htmlFor='image'>Image</label>
        <div
          id='image'
          className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
          {data.image ? (
            <img src={data.image} alt="Uploaded" className='h-full object-cover' />
          ) : (
            <span className='text-5xl'>
              <BsCloudUpload />
            </span>
          )}
          <input type="file" accept="image/*" id="image" onChange={uploadImage} className='hidden' />
        </div>

        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          className='bg-slate-200 p-1 my-1'
          value={data.price}
          onChange={handleOnChange}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          rows={3}
          className='bg-slate-200 p-1 my-1 resize-none'
          name="description"
          value={data.description}
          onChange={handleOnChange}
        ></textarea>

        <button type="submit" className="bg-blue-500 hover:bg-red-600 text-white text-lg font-medium my-2 p-2 mt-3">
          Submit
        </button>

      </form>
    </div>
  );
};

export default Newproduct;
*/
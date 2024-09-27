import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import {GrPrevious,GrNext} from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const homeProductCartList = productData.slice(9, 13);
  const homeProductCartListRice = productData.filter(el => el.category === "rice");
  console.log(homeProductCartListRice);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };



  // Filter data logic moved outside of map()

 

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-red-100 w-32 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Online Delivery</p>
            <img src="https://tse3.mm.bing.net/th?id=OIP.X-U08vfbPskx2Df-mj_dhQHaHa&pid=Api&P=0&h=220" className='h-7 w-full'/>
          </div>
          <h2 className='text-5xl md:text-7xl font-bold py-3'>A Delightful Experience in <span className='text-red-900'>Every Bite!</span></h2>
          <p className='py-3 text-base'>We bring you a curated selection of the finest meals made with fresh ingredients, catering to a variety of tastes and preferences. Whether you're stopping by for a quick coffee, a hearty breakfast, or a delicious lunch, we’ve got something for everyone. Explore our menu and discover why we’re the neighborhood’s favorite spot for comfort food and great vibes.</p>
          <button className='font-bold bg-red-700 text-slate-200 px-4 py-2 rounded'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList[0] ?
              homeProductCartList.map((el, index) => (
                <HomeCard
                  key={el._id || index}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              ))
              :
              loadingArray.map((el, index) => (
                <HomeCard
                  key={index+"loading"}
                  loading={"Loading..."}
                />
              ))
          }
        </div>
      </div>
      
      <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Popular Categories
          </h2>
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
          </div>
        </div>
        
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          
        {
  homeProductCartListRice[0] ? 
    homeProductCartListRice.map((el) => {
      return (  // Ensure the return statement is present
        <CardFeature
          key={el._id + "rice"}  // Use unique identifier as the key
          id={el._id}
          name={el.name}
          category={el.category}
          price={el.price}
          image={el.image}
        />
      );
    })
  :
    loadingArrayFeature.map((el,index) => (
      <CardFeature loading="Loading..." key={index+"cartLoading"} />
    
    ))
    }

        </div>
      </div>
      <AllProduct heading={"Available Food For You"}/>

     
    </div>
  );
};

export default Home;






/*
import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  const homeProductCartList = productData.slice(9, 13);
  const homeProductCartListRice = productData.filter((e1) => e1.category === "rice",[]);
  console.log(homeProductCartListRice);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  // State for category filtering
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState(productData);

  const handleFilterProduct = (category) => {
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase());
    setDataFilter(()=>{
      return[
        ...filter
      ]
    })
  };




  
  const categoryList = [...new Set(productData.map(el => el.category))];
  console.log(categoryList);






  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-red-100 w-32 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Online Delivery</p>
            <img src="https://tse3.mm.bing.net/th?id=OIP.X-U08vfbPskx2Df-mj_dhQHaHa&pid=Api&P=0&h=220" className='h-7 w-full' />
          </div>
          <h2 className='text-5xl md:text-7xl font-bold py-3'>A Delightful Experience in <span className='text-red-900'>Every Bite!</span></h2>
          <p className='py-3 text-base'>We bring you a curated selection of the finest meals made with fresh ingredients, catering to a variety of tastes and preferences. Whether you're stopping by for a quick coffee, a hearty breakfast, or a delicious lunch, we’ve got something for everyone. Explore our menu and discover why we’re the neighborhood’s favorite spot for comfort food and great vibes.</p>
          <button className='font-bold bg-red-700 text-slate-200 px-4 py-2 rounded'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList.length > 0 ?
              homeProductCartList.map((e1, index) => (
                <HomeCard
                  key={e1.id || index}
                  image={e1.image}
                  name={e1.name}
                  price={e1.price}
                  category={e1.category}
                />
              ))
              :
              loadingArray.map((_, index) => (
                <HomeCard
                  key={index}
                  loading={"Loading..."}
                />
              ))
          }
        </div>
      </div>

      <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Delicious Food
          </h2>
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
          </div>
        </div>

        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListRice.length > 0 ? homeProductCartListRice.map(e1 => (
              <CardFeature
                key={e1._id}
                name={e1.name}
                category={e1.category}
                price={e1.price}
                image={e1.image}
              />
            ))
              :
              loadingArrayFeature.map((_, index) => <CardFeature key={index} loading="Loading..." />)
          }
        </div>
      </div>

      <div className='my-5'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>
          Available Food For You
        </h2>

        <div className='flex gap-4 justify-center overflow-scroll scroll scrollbar-none'>
          {
            categoryList.length > 0 && categoryList.map((el, index) => (
              <FilterProduct key={index} category={el} setFilterBy={setFilterBy} />
            ))
          }
        </div>

        <div className=''>
          {
            dataFilter.map(e1 => (
              <CardFeature
                key={e1.id}
                image={e1.image}
                name={e1.name}
                category={e1.category}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;



*/
/*import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import {GrPrevious,GrNext} from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';

const Home= () => {
  const productData = useSelector((state)=>state.product.productList);
  console.log(productData);
  const homeProductCartList = productData.slice(9,13);
  const homeProductCartListRice = productData.filter(e1 => e1.category ==="rice");
  console.log(homeProductCartListRice)

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  
  const slideProductRef = useRef();
  const nextProduct = ()=> {
    slideProductRef.current.scrollLeft += 200;
  }
  const preveProduct = () =>{
    slideProductRef.current.scrollLeft -= 200;

  }
  const categoryList = [...new Set(productData.map(el=>el.category))];  
  console.log(categoryList);

  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    const filter = productData.filter(el => el.category.toLowerCase() === filterby.toLowerCase());
    setDataFilter(filter);
  }, [filterby, productData]);


  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-red-100 w-32 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Online Delivery</p>
            <img src="https://tse3.mm.bing.net/th?id=OIP.X-U08vfbPskx2Df-mj_dhQHaHa&pid=Api&P=0&h=220" className='h-7 w-full'/>
          </div>
          <h2 className='text-5xl md:text-7xl font-bold py-3'>A Delightful Experience in <span className='text-red-900'>Every Bite!</span></h2>
          <p className='py-3 text-base'>We bring you a curated selection of the finest meals made with fresh ingredients, catering to a variety of tastes and preferences. Whether you're stopping by for a quick coffee, a hearty breakfast, or a delicious lunch, we’ve got something for everyone. Explore our menu and discover why we’re the neighborhood’s favorite spot for comfort food and great vibes.</p>
        <button className='font-bold bg-red-700 text-slate-200 px-4 py-2 rounded'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
        homeProductCartList[0] ?
       homeProductCartList.map((el, index) => (
        
        //filter data display
        /*const [filterby,setFilterBy] = useState("")
        const [dataFilter,setDataFilter] = useState([])
        useEffect(()=>{
          const filter = productData.filter(el => el.category.toLowerCase() === filterby.toLowerCase())
          setDataFilter(()=>{
            return[
              ...filter
            ]
          })
        },[filterby])*/

        //return (
  /*        <HomeCard
            key={el.id || index}  // Use `e1.id` or fall back to index if id is missing
            image={el.image}
            name={el.name}
            price={el.price}
            category={el.category}
          />
        ))
      
      :
      loadingArray.map((el,index)=>{
      
          <HomeCard
          key={index}
          loading={"Loading..."}
          />
        ))
      }
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>
          Delicious Food
          </h2>
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>

          </div>

        </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
             homeProductCartListRice[0]? homeProductCartListRice.map((el) =>{
                return(
                  <CardFeature
                  key={el._id}
                  name={e1.name}
                  category={e1.category}
                  price={e1.price}
                  image={e1.image}
                  />

                )
              )
              :
              loadingArrayFeature.map(el => <CardFeature key={index} loading="Loading..."/>)
            }
          </div>
        </div>

    <div className='my-5'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4'>
          Available Food For You
        </h2>

        <div className='flex gap-4 justify-center overflow-scroll scroll scrollbar-none'>
            {
              categoryList[0] && categoryList.map((el,index) =>{
                return(
                  <FilterProduct category={el}/>


                )
              })
            }
        </div>

        <div className=''>
        {
          dataFilter.map(e1 =>{
            return(
              <CardFeature
                key={el.id}
                image={el.image}
                name={el.name}
                category={el.category}
              />
            )
          }          
          )

        }
        </div>


    </div>

    </div>
  )
}

export default Home;
*/
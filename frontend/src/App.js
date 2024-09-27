
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
/*import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        const resData = await res.json();
        console.log(resData)
        dispatch(setDataProduct(resData))
        // Optionally handle the data (e.g., set it to state)
     
        // console.log(resData);
        //console.log(productData)

      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to fetch products');
      }
    })(); // <-- Invoke the function here
  }, []); // Dependency array ensures it runs once after the component mounts
  console.log(productData)

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;


/*import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      //console.log(resData)
    })
  })
  return (
    <>
    <Toaster />
    <div>
       <Header/>
       <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
         <Outlet/>
       </main>
   </div>

    
    </>
          
  );
}

export default App;
*/
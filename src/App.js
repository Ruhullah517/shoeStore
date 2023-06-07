import React, { useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/footer/footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/about/about';
import Shop from './Components/shop/shop';
import Contact from './Components/contact/contact';
import ProductDetail from './Components/productDetail/productDetail';
import Login from './Components/login/login';
import Signup from './Components/signup/signup';
import Cart from './Components/cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Admin from "./Admin/admin"
import CheckoutSuccess from './Components/checkoutSucces/checkoutSuccess';
import ErrorPage from './Components/errorPage/errorPage';

function App() {

  let dispatch = useDispatch();
  // let [user, setUser] = useState({})
  let user = useSelector((store) => {
    return store.currUserSection
  })

  useEffect(() => {
    let myToken = localStorage.getItem('myToken');
    if (myToken) {
      axios.post('/session-check', { myToken: myToken }).then((resp) => {

        // setUser(resp.data);
        if (resp.data) {
          dispatch({
            type: 'userLogin',
            payload: resp.data
          })
        }
      })
    }
  }, [])



  return (
    <>
      {user.type == "Admin" ? <Admin /> :
        <BrowserRouter>

          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/productDetail/:adID' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>}
    </>
  );
}

export default App;

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Collections = lazy(() => import("./pages/Collections.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Verify = lazy(() => import("./pages/Verify.jsx"));
const Policy = lazy(() => import("./pages/Policy.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));

const App = () => {
  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <ToastContainer />
      <div className='flex-1 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] xl:px-[12vw] 2xl:px-[14vw] bg-white'>
        <Navbar />
        <SearchBar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<Collections />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productID' element={<Product />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/Verify' element={<Verify />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/privacy-policy' element={<Policy />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default App;

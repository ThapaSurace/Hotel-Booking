import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import HotelLists from "./pages/HotelLists.jsx"
import SingleHotelInfo from "./pages/SigleHotelInfo.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import AddProperty from './pages/AddProperty.jsx';
import AddRooms from './pages/AddRooms.jsx';
import HotelReserve from './components/HotelReserve.jsx';

function App() {
  return <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<HotelLists />} />
      <Route path="/hotel/:id" element={<SingleHotelInfo />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/addproperty' element={<AddProperty />} />
      <Route path='/addroom' element={<AddRooms />} />
      <Route path='/reserve' element={<HotelReserve />} />
    </Routes>
   </BrowserRouter>
  </>
}

export default App;

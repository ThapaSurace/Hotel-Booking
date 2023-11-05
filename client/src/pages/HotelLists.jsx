import React from 'react'
import NavBar from '../components/NavBar'
import Header from "../components/Header"
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItemCard from '../components/SearchItemCard';
import Footer from '../components/Footer';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/url';


const HotelLists = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const {loading,data,error} = useFetch(`${BASE_URL}/api/hotels`)

  console.log(data)

  return (
    <>
     <NavBar />
     <div className="listContainer mt-10 px-4">
        <div className=" max-w-3xl lg:max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
          <div className="listSearch bg-yellow-400 py-1 px-2 h-fit rounded-md shadow-md basis-1/4 lg:sticky lg:top-20">
            <h1 className="text-2xl font-bold text-Oxford-Blue text-center mb-2">Search</h1>
            <div className="lsItem flex flex-col gap-1">
              <label className='text-slate-800 font-bold tracking-wider'>Destination</label>
              <input placeholder={destination} type="text" className='p-1 rounded-md' />
            </div>
            <div className="lsItem flex flex-col gap-1 mt-4">
              <label className='text-slate-800 font-bold tracking-wider'>Check-in Date</label>
              <span className='bg-white py-1 px-2 text-slate-900 rounded-md' onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="mt-4">
              <label className='text-slate-800 font-bold tracking-wider'>Options</label>
              <div className="lsOptions flex gap-2 flex-col">
                <div className="flex justify-between gap-16">
                  <span className="text-sm font-bold text-slate-700">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="w-14 px-2 focus:outline-none rounded-md py-1" />
                </div>
                <div className="lsOptionItem flex justify-between gap-2">
                  <span className="text-sm font-bold text-slate-700">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="w-14 px-2 focus:outline-none rounded-md py-1" />
                </div>
                <div className="lsOptionItem flex gap-2 justify-between">
                  <span className="text-sm font-bold text-slate-700">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-14 px-2 focus:outline-none rounded-md py-1"
                    placeholder={options.adult}
                  />
                </div>
                <div className="flex gap-2 justify-between">
                  <span className="text-sm font-bold text-slate-700">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-14 px-2 focus:outline-none rounded-md py-1"
                    placeholder={options.children}
                  />
                </div>
                <div className="flex gap-2 justify-between">
                  <span className="text-sm font-bold text-slate-700">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-14 px-2 focus:outline-none rounded-md py-1"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <div>
            <button className='bg-Oxford-Blue text-white font-bold p-2 w-full mt-4 rounded-md'>Search</button>
            </div>
          </div>
          <div className="flex flex-col gap-4 basis-3/4">
           {
            data?.map(item=>(
              <div>
                 <SearchItemCard key={item._id} item={item} />
              </div>
            ))
           }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HotelLists
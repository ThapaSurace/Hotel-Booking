import React from 'react'

const Footer = () => {
  return (
  <>
     <div className="mt-8 border-y border-slate-300 shadow-sm">
    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-4 py-8">
      <ul className="text-sm text-slate-800 tracking-wider flex flex-col gap-2">
        <li className="hover:text-blue-400 cursor-pointer">Countries</li>
        <li className="hover:text-blue-400 cursor-pointer">Regions</li>
        <li className="hover:text-blue-400 cursor-pointer">Cities</li>
        <li className="hover:text-blue-400 cursor-pointer">Districts</li>
        <li className="hover:text-blue-400 cursor-pointer">Airports</li>
        <li className="hover:text-blue-400 cursor-pointer">Hotels</li>
      </ul>
      <ul className="text-sm text-slate-800 tracking-wider flex flex-col gap-2">
        <li className="hover:text-blue-400 cursor-pointer">Homes </li>
        <li className="hover:text-blue-400 cursor-pointer">Apartments </li>
        <li className="hover:text-blue-400 cursor-pointer">Resorts </li>
        <li className="hover:text-blue-400 cursor-pointer">Villas</li>
        <li className="hover:text-blue-400 cursor-pointer">Hostels</li>
        <li className="hover:text-blue-400 cursor-pointer">Guest houses</li>
      </ul>
      <ul className="text-sm text-slate-800 tracking-wider flex flex-col gap-2">
        <li className="hover:text-blue-400 cursor-pointer">Unique places to stay </li>
        <li className="hover:text-blue-400 cursor-pointer">Reviews</li>
        <li className="hover:text-blue-400 cursor-pointer">Unpacked: Travel articles </li>
        <li className="hover:text-blue-400 cursor-pointer">Travel communities </li>
        <li className="hover:text-blue-400 cursor-pointer">Seasonal and holiday deals </li>
      </ul>
      <ul className="text-sm text-slate-800 tracking-wider flex flex-col gap-2">
        <li className="hover:text-blue-400 cursor-pointer">Car rental </li>
        <li className="hover:text-blue-400 cursor-pointer">Flight Finder</li>
        <li className="hover:text-blue-400 cursor-pointer">Restaurant reservations </li>
        <li className="hover:text-blue-400 cursor-pointer">Travel Agents </li>
      </ul>
      <ul className="text-sm text-slate-800 tracking-wider flex flex-col gap-2">
        <li className="hover:text-blue-400 cursor-pointer">Curtomer Service</li>
        <li className="hover:text-blue-400 cursor-pointer">Partner Help</li>
        <li className="hover:text-blue-400 cursor-pointer">Careers</li>
        <li className="hover:text-blue-400 cursor-pointer">Sustainability</li>
        <li className="hover:text-blue-400 cursor-pointer">Press center</li>
        <li className="hover:text-blue-400 cursor-pointer">Safety Resource Center</li>
        <li className="hover:text-blue-400 cursor-pointer">Investor relations</li>
        <li className="hover:text-blue-400 cursor-pointer">Terms & conditions</li>
      </ul>
    </div>
  </div>
   <div className="text-center py-4 font-bold text-slate-700 tracking-wider text-sm italic">Copyright © 2022 Merobooking.</div>
  </>
  )
}

export default Footer
import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";

const FeaturedCard = ({item}) => {
  return (
    <div key={item.id} className="relative cursor-pointer"> 
    <div className="w-full h-60 rounded-md shadow-md">
      <LazyLoadImage
        src={item.img}
        alt=""
        className="w-full h-full object-cover rounded-md object-center opacity-90"
      />
    </div>
    <div className="font-bold text-2xl text-white flex flex-col gap-1 absolute left-4 bottom-4">
      <span>{item.name}</span>
      <span>{item.number} properties</span>
    </div>
  </div>
  )
}

export default FeaturedCard
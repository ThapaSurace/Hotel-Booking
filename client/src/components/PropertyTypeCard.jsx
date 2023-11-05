import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PropertyTypeCard = ({ item }) => {
  return (
    <div key={item.id} className="cursor-pointer">
      <div className="w-full h-60 rounded-md shadow-sm">
        <LazyLoadImage
          src={item.img}
          alt=""
          className="w-full h-full object-cover rounded-md object-center opacity-90"
        />
      </div>
      <div className="font-bold flex flex-col mt-1 text-sm text-slate-800">
        <span>{item.name}</span>
        <span>{item.number} properties</span>
      </div>
    </div>
  );
};

export default PropertyTypeCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchItemCard = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotel/${item._id}`);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 shadow-md border border-gray-400 p-4 rounded-md">
        <div className="lg:w-[200px] h-[250px]">
          <LazyLoadImage
            src={item?.photos[0]}
            alt="/"
            className="w-full h-full object-cover object-center rounded-md shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-Oxford-Blue">{item.name}</h1>
          <span className=" text-slate-900  font-semibold">
            {item.distance}m from center
          </span>
          <span className="font-semibold bg-green-700 text-white p-1 rounded-md w-[150px]">
            Free airport taxi
          </span>
          <span className=" text-stone-950 tracking-wide font-bold">
            {item.title}
          </span>
          <span className=" text-sm font-semibold text-slate-900">
            Entire studio • 1 bathroom • 21m² 1 full bed
          </span>
          <span className="text-green-800 font-light">Free cancellation </span>
          <span className="text-blue-700 text-sm">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails flex flex-col justify-between">
          <div className="flex gap-10">
            <span>Excellent</span>
            <button className="bg-Oxford-Blue text-white p-1 font-bold">
              8.9
            </button>
          </div>
          <div className="flex flex-col gap-1 lg:items-end">
            <span className="text-xl font-semibold text-slate-950">
              ${item.cheapestPrice}
            </span>
            <span className=" text-slate-600 text-sm italic font-light">
              Includes taxes and fees
            </span>
            <button
              onClick={handleClick}
              className=" bg-sky-400 py-2 px-4 text-white font-bold rounded-md shadow-sm"
            >
              See availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItemCard;

import React, { useContext, useState } from "react";
import { FaBed, FaPlaneDeparture } from "react-icons/fa";
import { AiFillCar, AiFillCalendar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const {user} = useContext(AuthContext)
  const {dispatch} = useContext(SearchContext)

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="bg-Oxford-Blue py-2 md:py-4 lg:py-10 px-4 2xl:px-0">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center text-white cursor-pointer">
            <div>
              <FaBed className="lg:text-xl" />
            </div>
            <div className="text-lg py-4">Stays</div>
          </div>
          <div className="flex gap-2 items-center text-white cursor-pointer">
            <div>
              <FaPlaneDeparture className="lg:text-xl" />
            </div>
            <div className="text-lg py-4">Stays</div>
          </div>
          <div className="flex gap-2 items-center text-white cursor-pointer">
            <div>
              <AiFillCar className="lg:text-xl" />
            </div>
            <div className="text-lg py-4">Stays</div>
          </div>
        </div>

        <div className="mt-4 lg:mt-10 text-white pb-16 lg:pb-6">
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl tracking-wider">
            Find your next stay
          </h1>
          <p className="mt-4  md:text-lg font-semibold tracking-wider">
            Search low prices on hotels, homes and much more...
          </p>
        </div>

        {/* search header */}
        <div
          className="lg:mt-4 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center bg-white p-4 rounded-md border-4 
        border-yellow-400 absolute bottom-[-150px] lg:bottom-[-75px] w-full"
        >
          <div className="flex gap-2 items-center">
            <div>
              <BiCurrentLocation size={25} />
            </div>
            <input
              type="text"
              name="location"
              placeholder="Where are you going?"
              className="w-full focus:outline-none"
            />
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <AiFillCalendar size={25} />
            </div>
            <span
              className="text-sm text-slate-600 font-semibold tracking-wider relative"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="absolute top-[35px] z-10 right-[-150px]"
                  minDate={new Date()}
                />
              )}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <BsFillPersonFill size={25} />
            </div>
            <span
              className="text-sm text-slate-600 font-semibold tracking-wider"
              onClick={() => setOpenOptions(!openOptions)}
            >
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {openOptions && (
              <div className="absolute top-[45px] flex flex-col gap-2 bg-white z-10 shadow-md p-2 rounded-md">
                <div className="flex justify-between items-center gap-20">
                  <span className="optionText">Adult</span>
                  <div className="flex gap-2 items-center font-bold">
                    <button
                      disabled={options.adult <= 1}
                      className="cursor-pointer"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-700 border border-slate-600 rounded-md py-1 px-2">
                      {options.adult}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-20">
                  <span className="optionText">Children</span>
                  <div className="flex gap-2 items-center font-bold">
                    <button
                      disabled={options.children <= 0}
                      className="cursor-pointer"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-700 border border-slate-600 rounded-md py-1 px-2">
                      {options.children}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-20">
                  <span className="optionText">Room</span>
                  <div className="flex gap-2 items-center font-bold">
                    <button
                      disabled={options.room <= 1}
                      className="cursor-pointer"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-700 border border-slate-600 rounded-md py-1 px-2">
                      {options.room}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className=" bg-Oxford-Blue text-white font-bold py-1 px-4 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

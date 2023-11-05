import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import HotelReserve from "../components/HotelReserve";
import { BASE_URL } from "../utils/url";

const SigleHotelInfo = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  const { data } = useFetch(`${BASE_URL}/api/hotels/find/${id}`);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        {open && (
          <div className="slider sticky top-0 left-0 h-[100vh] w-full z-40 flex items-center bg-black bg-opacity-[0.3]">
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow text-4xl mx-2 md:ml-10 cursor-pointer text-lime-50"
              onClick={() => handleMove("l")}
            />
            <div className="w-full h-full flex items-center justify-center relative">
              <LazyLoadImage
                src={data.photos[slideNumber]}
                alt=""
                className="sliderImg w-[100%] h-[50%] md:w-[80%] md:h-[80vh] object-cover object-center rounded-md"
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close absolute top-24 right-36 cursor-pointer text-4xl text-lime90%-50"
                onClick={() => setOpen(false)}
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow text-4xl mx-2 md:ml-10 cursor-pointer text-lime-50"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper max-w-6xl mx-auto my-6 p-4 lg:p-1">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg lg:text-2xl">{data.name}</h1>
            <button className=" bg-violet-900 text-white font-bold hover:bg-violet-950 py-1 px-4 rounded-md text-sm lg:text-base">
              Reserve or Book Now!
            </button>
          </div>
          <div className="flex gap-1 items-center my-4 lg:my-2">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="text-sm font-bold text-slate-800">
              {data.address}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sky-600 tracking-wider">
              Excellent location – {data.distance}m from center
            </span>
            <span className="text-green-600 tracking-wider">
              Book a stay over $114 at this property and get a free airport taxi
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <LazyLoadImage
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg rounded-md shadow-sm cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails flex flex-col lg:flex-row gap-10 mt-6">
            <div className="hotelDetailsTexts basis-3/4">
              <h1 className="hotelTitle text-xl font-bold mt-4 mb-2">
                {data.title}
              </h1>
              <p className="hotelDesc text-slate-900 tracking-wider leading-relaxed text-justify">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice basis-1/4 bg-sky-200 p-2 rounded-md">
              <h1 className="text-lg font-bold tracking-wide mb-4">
                Perfect for a 9-night stay!
              </h1>
              <span className="leading-relaxed tracking-wide font-semibold text-gray-700 text-sm text-justify">
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2 className="mt-4 text-lg">
                <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                nights)
              </h2>
              <button
                onClick={handleClick}
                className="bg-violet-900 text-white font-bold hover:bg-violet-950 py-1 px-4 rounded-md mt-4"
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {openModal && <HotelReserve setOpen={setOpenModal} hotelId={id} />}
    </>
  );
};

export default SigleHotelInfo;

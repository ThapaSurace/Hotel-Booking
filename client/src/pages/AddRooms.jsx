import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { roomInputs } from "../formSource";
import axios from "axios";
import NavBar from "../components/NavBar";
import { BASE_URL } from "../utils/url";

const AddRooms = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  const { data, loading } = useFetch(`${BASE_URL}/api/hotels`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    setIsLoading(true)
    try {
      await axios.post(`${BASE_URL}/api/rooms/${hotelId}`, {
        ...info,
        roomNumbers,
      });
      setInfo("");
      setRooms([])
      setIsLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto my-6">
        <div>
          <h1 className="text-2xl text-Oxford-Blue font-bold text-center mb-8">
            Add New Room
          </h1>

          <form>
            <div className="grid grid-cols-2 gap-x-44 gap-y-4">
              {roomInputs.map((input) => (
                <div className="formInput flex flex-col gap-1" key={input.id}>
                  <label className="font-bold text-slate-900">
                    {input.label}
                  </label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    className="border-b-2 border-slate-500  py-1 px-2 focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="formInput flex gap-4 mt-4 items-center">
              <label className="font-bold text-slate-900">Choose a hotel</label>
              <select
                id="hotelId"
                onChange={(e) => setHotelId(e.target.value)}
                className="p-2 rounded-md"
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="formInput flex flex-col gap-1 mt-4">
              <label className="font-bold text-slate-900">Rooms</label>
              <textarea
                onChange={(e) => setRooms(e.target.value)}
                placeholder="give comma between room numbers."
                className="border border-slate-600 rounded-md p-4 w-72 focus:outline-none"
              />
            </div>

            <button
              className=" bg-blue-700 text-white py-2 hover:bg-blue-900 mt-6 rounded-md w-full disabled:bg-opacity-40"
              onClick={handleClick}
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRooms;

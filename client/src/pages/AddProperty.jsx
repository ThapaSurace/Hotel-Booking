import React, { useState } from "react";
import { hotelInputs } from "../formSource";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { BASE_URL } from "../utils/url";

const AddProperty = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch(`${BASE_URL}/api/rooms`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "fiverr");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dv7z7ncih/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("http://localhost:4000/api/hotels", newhotel);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NavBar />
      <div className="newContainer max-w-3xl mx-auto my-6">
        <h1 className="text-2xl text-Oxford-Blue font-bold text-center mb-8">
          Add New Product
        </h1>

        <div className="right">
          <form>
            <div className="formInput mb-4">
              <label
                htmlFor="file"
                className="flex gap-1 items-center font-bold"
              >
                <span>Upload Images:</span>{" "}
                <span>
                  <BsFillCloudUploadFill />
                </span>
              </label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: "none" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-44 gap-y-4">
              {hotelInputs.map((input) => (
                <div className="formInput flex flex-col gap-1" key={input.id}>
                  <label className="font-bold text-slate-900">
                    {input.label}
                  </label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    className="border-b-2 border-slate-500  py-1 px-2 focus:outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="formInput flex flex-col gap-2 mt-4 w-12 p-1">
              <label className="font-bold text-slate-900">Featured</label>
              <select id="featured" onChange={handleChange}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className="selectRooms flex flex-col gap-2">
              <label className="font-bold text-slate-900">Rooms</label>
              <select
                className="border border-slate-500"
                id="rooms"
                multiple
                onChange={handleSelect}
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <button
                className=" bg-blue-700 text-white py-2 hover:bg-blue-900 mt-4 rounded-md w-full"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;

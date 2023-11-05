import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/url';

const HotelReserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data} = useFetch(`${BASE_URL}/api/hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

      const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${BASE_URL}/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve w-[100vw] h-[100vh] bg-black bg-opacity-[0.418] fixed top-0 left-0 flex items-center justify-center">
      <div className="rContainer bg-white p-5 relative">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose absolute top-0 right-0 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <span className='text-Oxford-Blue text-xl font-bold'>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem flex items-center gap-12 p-5" key={item._id}>
            <div className="rItemInfo flex flex-col gap-1">
              <div className="rTitle font-bold">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax text-sm">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms flex flex-wrap gap-1 text-[10px] text-gray-500 font-semibold">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className='p-1'
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default HotelReserve
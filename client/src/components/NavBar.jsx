import { Fragment, useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from '../utils/url';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a logout request to the server
      await axios.get(`${BASE_URL}/api/auth/logout`);
      dispatch({
        type: "LOGOUT",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const addHotel = () => {
    if (user) {
      navigate("/addProperty");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className=" bg-Oxford-Blue p-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div>
            <Link to="/">
              <span className="text-white text-xl font-bold tracking-wide">
                MeroBooking.
              </span>
            </Link>
          </div>
          <div>
            <ul className="hidden md:flex gap-6 items-center">
              <li className="text-white">NPR</li>

              <li onClick={addHotel} className="text-white cursor-pointer">
                list your property
              </li>

              {!user ? (
                <>
                  <Link to="/register">
                    <li className="py-1 px-4 bg-white rounded-md text-Oxford-Blue font-bold cursor-pointer">
                      Register
                    </li>
                  </Link>
                  <Link to="/login">
                    <li className="text-white border-2 border-white py-1 px-4 rounded-md cursor-pointer">
                      Login
                    </li>
                  </Link>
                </>
              ) : (
                <div className="flex gap-2 items-center">
                  <img
                    src="https://wallpapers-clan.com/wp-content/uploads/2023/08/chibi-roronoa-zoro-sticker-cover.jpg"
                    alt="/"
                    className="h-8 w-8 rounded-full"
                  />
                  <li
                    onClick={handleLogout}
                    className="py-1 px-4 bg-white rounded-md text-Oxford-Blue font-bold cursor-pointer"
                  >
                    logout
                  </li>
                </div>
              )}
            </ul>
          </div>
          <div className=" md:hidden">
            <GiHamburgerMenu
              className="text-xl text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
      </div>
      {/* sidebar */}
      <Transition.Root show={open} as={Fragment} S>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          <ul className="flex flex-col  gap-6 text-Oxford-Blue font-bold text-xl">
                            <li className=" hover:bg-Oxford-Blue hover:text-white w-full p-2 rounded-md cursor-pointer">
                              Home
                            </li>
                            <li className=" hover:bg-Oxford-Blue hover:text-white w-full p-2 rounded-md cursor-pointer">
                              NPR
                            </li>
                            <li className=" hover:bg-Oxford-Blue hover:text-white w-full p-2 rounded-md cursor-pointer">
                              list your property
                            </li>
                            <div className="flex gap-4 items-center mt-10">
                              <li className="py-1 px-4 bg-Oxford-Blue text-white rounded-md font-bold cursor-pointer">
                                Register
                              </li>
                              <li className=" border-2 border-Oxford-Blue py-1 px-4 rounded-md cursor-pointer">
                                Login
                              </li>
                            </div>
                          </ul>
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default NavBar;

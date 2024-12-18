import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const Navbar = (props) => {
    const navigate = useNavigate();
    const { setAuthenticated } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <>
            {/* <Link to="/">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> | 

            <Link to="/doctors">Doctors</Link> | 
            <Link to="/patients">Patients</Link> | 
            <Link to="/prescriptions">Prescriptions</Link> | */}


            {/* <button onClick={() => {
                setAuthenticated(false);
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }}>Logout</button> */}

            <nav class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div class="relative flex h-16 items-center justify-between">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span class="absolute -inset-0.5"></span>
                                <span class="sr-only">Open main menu</span>

                                <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div class="flex shrink-0 items-center">
                                <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                            </div>
                            <div class="hidden sm:ml-6 sm:block">
                                <div class="flex space-x-4">
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/"}>Home</Link>
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/doctors"}>Doctors</Link>
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/patients"}>Patients</Link>
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/appointments"}>Appointments</Link>
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/prescriptions"}>Prescriptions</Link>
                                    <Link class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to={"/diagnoses"}>Diagnoses</Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
                                    onClick={toggleDropdown}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="/images/avatar.png" alt="User avatar" />
                                </button>
                            </div>

                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => {
                                        setAuthenticated(false);
                                        localStorage.removeItem('token');
                                        navigate('/login', { replace: true });
                                    }}>Logout</button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>


            </nav>

        </>
    );
}

export default Navbar;
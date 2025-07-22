import {
  Contact,
  ListOrderedIcon,
  Search,
  ShoppingCart,
  User,
  Menu
} from 'lucide-react';
import React, { useContext, useState } from 'react';
import { assets } from '../assets/Assets';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { Categories, currentCategory, subCategory, setSubCategory } = useContext(ShopContext);
  console.log(subCategory);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate= useNavigate();

  const handleCategoryClick = (item) => {
    setSubCategory(item);
    navigate('/products');
  }
  

  return (
    <nav className='w-full relative overflow-x-hidden bg-white shadow-md'>
      {/* Top Bar */}
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center py-2 px-4 bg-yellow-400'>
        {/* Hamburger, Logo and Icons (Mobile) */}
        <div className='flex justify-between items-center w-full lg:w-auto'>
          {/* Left: Hamburger (mobile only) */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='lg:hidden'>
            <Menu className='w-6 h-6' />
          </button>

          {/* Center: Logo */}
          <div className='flex justify-center w-full lg:w-auto'>
            <img src={assets.Logo} alt="Logo" className='lg:absolute lg:left-2 h-10 md:h-18 top-5' />
          </div>

          {/* Right: Profile + Cart (Mobile Only) */}
          <div className="flex gap-4 lg:hidden">
            <User className='w-6 h-6' onClick={() => navigate("/login")}/>
            <ShoppingCart className='w-6 h-6' />
          </div>
        </div>

        {/* Top Nav Links (Desktop Only) */}
        <ul className='hidden lg:flex space-x-8 mt-2 lg:mt-0 font-semibold' style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          {Categories.map((item, i) => (
            <li
              key={i}
              
              className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-300
                ${item.Category === currentCategory
                  ? "bg-white text-black shadow-md border border-yellow-500 scale-105"
                  : "hover:bg-white/50 hover:text-black text-gray-600"}`}
            >
              <Link to={item.link}>
                {item.Category}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons (Desktop Only) */}
        <div className='hidden lg:flex space-x-8 items-center font-semibold' style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          {/* Search */}
          <div className="relative group">
            <div className='flex flex-col items-center cursor-pointer'>
              <Search className='w-6 h-6' />
              <span className='text-xs'>Search</span>
            </div>

            {/* Dropdown input box */}
            <div className="absolute right-0 top-full mt-2 w-72 h-11 bg-white border rounded-md shadow-md px-4 py-1 flex items-center gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
              <Search className="w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search for items..." className="w-full outline-none" />
            </div>
          </div>

          <div className='flex flex-col items-center cursor-pointer relative'>
            <ShoppingCart className='w-6 h-6' />
            <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>0</p>
            <span className='text-xs'>Cart</span>
          </div>
          <div className='flex flex-col items-center cursor-pointer'>
            <Contact className='w-6 h-6' />
            <span className='text-xs'>Contact Us</span>
          </div>
          <div className='flex flex-col items-center cursor-pointer'>
            <ListOrderedIcon className='w-6 h-6' />
            <span className='text-xs'>My Orders</span>
          </div>

          <div className=' flex flex-col items-center cursor-pointer' onClick={() => navigate('/login')}>
            <User className='w-6 h-6' />
            <span className='text-xs'>Sign In</span>

          </div>

        </div>
      </div>

      {/* Mobile + Tablet Category Links */}
      <div className="flex justify-around bg-yellow-300 py-2 lg:hidden" style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
        {
          Categories.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="text-sm font-semibold"
              
            >
              {item.Category}
            </Link>
          ))
        }
      </div>

      {/* Bottom Nav (Desktop Only) */}
      <div className='hidden lg:flex py-3 justify-center'>
        <ul className='flex space-x-8 font-semibold text-lg' style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
          {
            Categories.find((c) => c.Category === currentCategory).SubCategory.map((item, i) => <li key={i} onClick={()=>handleCategoryClick(item)  } className='cursor-pointer hover:text-gray-600'>{item}</li>)
          }
        </ul>
      </div>

      {/* Mobile + Tablet Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className='p-4'>
          <button onClick={() => setSidebarOpen(false)} className='mb-4 text-xl font-bold'>X</button>

          {/* Links with horizontal lines */}
          <ul className='font-semibold' style={{ fontFamily: "Copperplate, Papyrus, fantasy" }}>
            {Categories.find((c) => c.Category === currentCategory).SubCategory.map((item, index) => (
              <React.Fragment key={index}>
                <li onClick={() => handleCategoryClick(item)} className="py-2">{item}</li>
                <hr className="border-t border-gray-300" />
              </React.Fragment>
            ))}
          </ul>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button className='w-full flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-md font-semibold text-black hover:bg-yellow-500 transition'>
              <ListOrderedIcon className='w-5 h-5' /> My Orders
            </button>
            <button className='w-full flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-md font-semibold text-black hover:bg-yellow-500 transition'>
              <Contact className='w-5 h-5' /> Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

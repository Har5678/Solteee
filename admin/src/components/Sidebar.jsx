import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add clothes</p>
            </NavLink>

            <NavLink to="/addshoes" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Add Shoes</p>
            </NavLink>

            <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Clothes List</p>
            </NavLink>

            <NavLink to="/list-shoes" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Shoes List</p>
            </NavLink>



            <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>

            <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Users List</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
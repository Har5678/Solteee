import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPinterest, FaYoutube } from "react-icons/fa";

const Footer = () => {

  const [showWhoWeAre, setShowWhoWeAre] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false); // This was missing

  return (
    <>
      <h1 className='text-center text-xl md:text-4xl font-semibold bg-yellow-400 text-white py-2'>HOMEGROWN INDIAN BRAND</h1>
      <div className='w-full py-8 bg-[#E6E7E8]'>

        {/* links grid  */}
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-15 px-6 md:px-20 font-semibold'>

          <div className='md:space-y-3 px-3'>
            <h4 className='text-yellow-500 text-md mb-1'>NEED HELP</h4>
            <ul className='space-y-1 md:space-y-2 text-sm md:text-lg'>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Contact Us</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Orders</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>FAQs</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>My Account</li>
            </ul>
          </div>

          <div className='space-y-3  px-3'>
            <h4 className='text-yellow-500'>COMPANY</h4>
            <ul className='space-y-1 md:space-y-2 text-sm md:text-lg'>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>About Us</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Investor Relation</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Careers</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Gift Vouchers</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Community Initiatives</li>
            </ul>
          </div>

          <div className='space-y-3  px-3 -mt-10 sm:-mt-0'>
            <h4 className='text-yellow-500 text-sm md:text-lg'>MORE INFO</h4>
            <ul className='space-y-1 md:space-y-2 text-sm md:text-lg'>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>T&C</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Privacy Policy</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Get Notified</li>
              <li className='cursor-pointer hover:underline hover:text-yellow-500'>Sitemap</li>
            </ul>
          </div>
          <div className='-mt-10 sm:-mt-0  px-3 flex-col'>
            <div className='space-y-3'>
              <h4 className='text-yellow-500 text-sm md:text-lg'>STORE NEAR ME</h4>
              <ul className='space-y-1 md:space-y-2 text-sm md:text-lg'>
                <li className='cursor-pointer hover:underline hover:text-yellow-500'>Meerut</li>
              </ul>
            </div>
            <div className='mt-3'>
              <h4 className='text-yellow-500 text-sm md:text-lg'>CONNECT WITH US</h4>
              <div className="flex justify-center md:justify-start space-x-4 mt-4 text-xl">
                <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                <FaInstagram className="cursor-pointer hover:text-pink-600" />
                <FaTwitter className="cursor-pointer hover:text-blue-400" />
                <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
                <FaPinterest className="cursor-pointer hover:text-red-600" />
                <FaYoutube className="cursor-pointer hover:text-red-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Bottom Section */}
        <div className="bg-[#E6E7E8] px-6 md:px-20 py-10">
          <div className="space-y-3">

            {/* Navigation Links */}
            <div className="border border-gray-300 bg-white">
              <div
                className="flex justify-between items-center p-4 font-bold text-red-600 cursor-pointer"
                onClick={() => setShowNavLinks(!showNavLinks)}
              >
                <span>NAVIGATION LINKS</span>
                <span className="text-2xl font-semibold">
                  {showNavLinks ? "-" : "+"}
                </span>
              </div>
              <div
                className={`
                  px-4 text-gray-800 text-sm space-y-4 border-t border-gray-300 overflow-hidden transition-all duration-500
                  ${showNavLinks ? 'max-h-[1000px] py-4' : 'max-h-0 py-0'}
                `}
              >
                <div>
                  <h3 className='text-red-400 underline font-semibold text-base'>Mens</h3>
                  <ul className='flex flex-wrap gap-2'>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>T-Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Polo</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Summers</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Oversized</li>
                  </ul>
                </div>
                <div>
                  <h3 className='text-red-400 underline font-semibold text-base'>Womens</h3>
                  <ul className='flex flex-wrap gap-2'>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>T-Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Polo</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Summers</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Oversized</li>
                  </ul>
                </div>
                <div>
                  <h3 className='text-red-400 underline font-semibold text-base'>Shoes</h3>
                  <ul className='flex flex-wrap gap-2'>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>T-Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Shirts</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Polo</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Summers</li>
                    <li className='cursor-pointer hover:underline hover:text-yellow-500'>Oversized</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Who We Are */}
            <div className="border border-gray-300 bg-white">
              <div
                className="flex justify-between items-center p-4 font-bold text-red-600 cursor-pointer"
                onClick={() => setShowWhoWeAre(!showWhoWeAre)}
              >
                <span>WHO WE ARE</span>
                <span className="text-2xl font-semibold">
                  {showWhoWeAre ? "-" : "+"}
                </span>
              </div>
              <div
                className={`
                  px-4 text-gray-800 text-sm space-y-2 overflow-hidden transition-all duration-500
                  ${showWhoWeAre ? 'max-h-40 py-4' : 'max-h-0'}
                `}
              >
                <p>We are a customer-first eCommerce platform.</p>
                <p>Our mission is to deliver quality and satisfaction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-2 pt-5 text-center text-sm lg:text-base text-gray-500">
          Design and Developed by <strong className="text-gray-700">Owl Media House</strong> © All rights reserved
        </div>
      </div>
    </>
  )
}

export default Footer;

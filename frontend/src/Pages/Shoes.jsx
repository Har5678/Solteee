import React from 'react'
import Navbar from '../Components/Navbar'
import Banner1 from '../Components/Banner1'
import LatestArrival from '../Components/LatestArrival'
import Category from '../Components/Category'
import Polo from '../Components/Polo'
import BestSeller from '../Components/BestSeller'
import Banner2 from '../Components/Banner2'
import Oversize from '../Components/Oversize'
import Footer from '../Components/Footer'

const Shoes = () => {
  return (
    <>
    <Banner1/>
    <LatestArrival/>
    <Category/>
    <Polo/>
    <BestSeller/>
    <Banner2/>
    <Oversize/>
    </>
  )
}

export default Shoes;
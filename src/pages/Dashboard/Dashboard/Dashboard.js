import React from 'react';
import '../Dashboard.css'
import { AiOutlineBars } from 'react-icons/ai'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import MyOrders from '../MyOrders/MyOrders';
import Payment from '../Payment/Payment';
import ReviewForm from '../ReviewForm/ReviewForm';

const Dashboard = () => {
  const [isHide, setIsHide] = useState(true)
  const { path, url } = useRouteMatch();

  const handleHide = () => {
    setIsHide(!isHide)
  }

  const activeStyle = {
    color: "#008cff"
  }

  return (
    <div className='pt-28 pb-12'>
      <div className="small-container">
        <div onClick={handleHide} className='p-2 rounded-sm bg-blue text-white sideMenu text-lg'><AiOutlineBars /></div>
        <div className="dashBoardRow flex">
          <div className={isHide ? "left min-h-screen bg-seconDary_bg hide" : "left min-h-screen bg-seconDary_bg"}>
            <h1 className='text-white bg-blue text-xl font-semibold p-2 text-center'>Dashboard</h1>
            <ul className=''>
              <li className='text-lg font-medium px-3 py-2.5 sideItem'>
                <NavLink onClick={handleHide} activeStyle={activeStyle} to={`${url}/payment`} className='text-primary_text w-full h-full block'>Payment</NavLink>
              </li>
              <li className='text-lg font-medium px-3 py-2.5 sideItem'>
                <NavLink onClick={handleHide} activeStyle={activeStyle} to={url} className='text-primary_text w-full h-full block'>My Orders</NavLink>
              </li>
              <li className='text-lg font-medium px-3 py-2.5 sideItem'>
                <NavLink onClick={handleHide} activeStyle={activeStyle} to={`${url}/review`} className='text-primary_text w-full h-full block'>Review</NavLink>
              </li>
              <li className='text-lg font-medium px-3 py-2.5 sideItem'>
                <button className='text-primary_text w-full h-full block text-left'>LogOut</button>
              </li>
            </ul>
          </div>
          <div className="right min-h-screen bg-light p-4">
            <Switch>
              <Route exact path={path}>
                <MyOrders />
              </Route>
              <Route path={`${path}/payment`}>
                <Payment />
              </Route>
              <Route to={`${path}/review`}>
                <ReviewForm />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
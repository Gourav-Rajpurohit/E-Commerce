import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className="w-16 md:w-56 min-h-screen border-r bg-slate-50">
      <div className="flex flex-col gap-4 pt-6 pl-2 md:pl-4 text-sm">

        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-slate-700 border-r-0 px-3 py-2 rounded-l-md"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-slate-700 border-r-0 px-3 py-2 rounded-l-md"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-slate-700 border-r-0 px-3 py-2 rounded-l-md"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

      </div>
    </aside>
  )
}

export default Sidebar

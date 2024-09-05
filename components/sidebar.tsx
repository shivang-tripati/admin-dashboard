"use client"
import React, {useState} from 'react'

import { 
    ChevronLeft, 
    ChevronRight, 
    Users2,
    ShoppingCart,
    ChartColumnIncreasingIcon,
    Home,
    Package

 } from 'lucide-react'
const Sidebar = () => {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <aside
        className={`bg-white text-black p-4 ${
          sidebarCollapsed ? "w-16" : "w-56"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-8 ">
          <h1
            className={`text-xl font-bold ${sidebarCollapsed ? "hidden" : ""}`}
          >
            Dashboard
          </h1>
          <button
            type="button"
            className="text-gray-400"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <nav>
          <ul className="space-y-6">
            <li>
              <div className="flex items-center text-gray-400">
                <Home className="mr-2" />
                {!sidebarCollapsed && "Home"}
              </div>
            </li>
            <li>
              <div className="flex items-center text-gray-400">
                <ShoppingCart className="mr-2" />
                {!sidebarCollapsed && "Orders"}
              </div>
            </li>
            <li>
              <div className="flex items-center text-gray-400">
                <Package className="mr-2" />
                {!sidebarCollapsed && "Products"}
              </div>
            </li>
            <li>
              <div className="flex items-center text-gray-400">
                <Users2 className="mr-2" />
                {!sidebarCollapsed && "Cutomers"}
              </div>
            </li>
            <li>
              <div className="flex items-center text-gray-400">
                <ChartColumnIncreasingIcon className="mr-2" />
                {!sidebarCollapsed && "Analytics"}
              </div>
            </li>
          </ul>
        </nav>
      </aside>
  )
}

export default Sidebar

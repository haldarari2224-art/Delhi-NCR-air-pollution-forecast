import React from 'react'
import { Link } from 'react-router-dom'
//import logo from "../assets/logo.png"

function Navbar() {
  return (
    <nav className = "w-full h-[70px] flex items-center justify-between px-10 bg-transparent absolute top-0 left-0 z-50">
    <div className = "flex items-center gap-2 text-xl font-bold text-green-800">
    </div>

    <ul className="flex list-none gap-7 m-0 p-0">
        <li><Link to="/" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Home</Link></li>
        <li><Link to="/about" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">About</Link></li>
        <li><Link to="/dashboard" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">AQI Dashboard</Link></li>
        <li><Link to="/causes" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Causes</Link></li>
        <li><Link to="/solutions" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Solutions</Link></li>
        <li><Link to="/essay" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Essay</Link></li>
        <li><Link to="/map" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Map</Link></li>
        <li><Link to="/sources" className="text-green-900 text-md font-medium hover:text-green-700 transition-colors">Sources</Link></li>
      </ul>
    </nav>    
  )
}
export default Navbar
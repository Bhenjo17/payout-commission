import React from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../assets/image/paragon_logo.png";

const Signup = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="md:w-1/2 bg-[#0A3A63] text-white p-8 flex flex-col justify-center">
          
          <div className="mb-8">
            <img src={logoImg} alt="Paragon Logo" className="h-35 mb-20" />
          </div>

          <h2 className="text-3xl font-bold tracking-widest mb-2" 
          style={{ color: '#FDEB9E' }}>
            SIGNUP
          </h2>

          <p className="text-gray-200 text-1xl leading-relaxed mb-30">
            Fill in the details to create your account and get started with our  collaborative tools.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 p-8">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>

          <form className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Juan Pedro D.C. Dimagiba"
                autoComplete="name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Company Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Company Email
              </label>
              <input
                type="email"
                placeholder="jdimagiba@paragon.com"
                autoComplete="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Personal Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Personal Email
              </label>
              <input
                type="email"
                placeholder="juanpedro@gmail.com"
                autoComplete="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Work Role */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Work Role
              </label>
              <select
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option>Select your role</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </div>

            {/* Contact Number */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="09995557777"
                autoComplete="tel"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Link to="/">
                <button
                  type="button"
                  className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="px-6 py-2 rounded-full text-white transition"
                style={{ backgroundColor: '#006A67' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#002050'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#003161'}
              >
                Sign Up
              </button>
            </div>

          </form>   
        </div>
      </div>
    </section>
  );
};

export default Signup;
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logoImg from "../../assets/image/paragon_logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setCemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      alert('Login successful!');
      setIsLoading(false);
      // Here you can redirect or handle post-login logic
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      
      <div className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        bg-[#0A3A63] 
        rounded-2xl 
        shadow-2xl 
        p-6 
        sm:p-8 
        text-white
      ">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logoImg} 
            alt="Paragon Logo" 
            className="h-15 sm:h-18 object-contain" 
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Log In Now!
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Please provide Company Email and Password to login
          </p>  
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Company Email */}
          <input
            type="email"
            placeholder="Enter company email"
            value={username}
            onChange={(e) => setCemail(e.target.value)}
            autoComplete="email"
            className="
              w-full 
              px-4 
              py-3 
              rounded-lg 
              bg-gray-200 
              text-black 
              text-sm 
              sm:text-base
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-400
            "
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="
                w-full 
                px-4 
                py-3 
                pr-12
                rounded-lg 
                bg-gray-200 
                text-black 
                text-sm 
                sm:text-base
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-400
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute 
                right-3 
                top-1/2 
                -translate-y-1/2 
                text-gray-600 
                hover:text-gray-800
              "
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-xs sm:text-sm">Remember me</label>
          </div>

          {/* Signup */}
          <div className="text-xs sm:text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-blue-300 hover:text-white">
              Signup here
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className=" 
              w-full 
              bg-gray-200 
              text-black 
              font-bold 
              py-3 
              rounded-lg 
              hover:bg-white 
              transition 
              duration-300
              text-sm 
              sm:text-base
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
            style={{ backgroundColor: '#FDEB9E' }}
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
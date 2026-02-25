import React, { useState, useEffect } from "react";
import logo from "@/assets/image/paragon_logo.png";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [showProfile, setShowProfile] = useState(false); // Profile dropdown state
  
 const navigate = useNavigate(); // <-- use hook

  useEffect(() => {
    const timers = [0, 1, 2, 3].map((i) =>
      setTimeout(() => setAnimatedCards((prev) => [...prev, i]), i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const colors = {
    yellow: "#FDEB9E",
    yellowDark: "#F5D96B",
    teal: "#006A67",
    tealLight: "#008f8b",
    navy: "#003161",
    deepNavy: "#000B58",
    accent: "#FF6B35",
  };

  // ACTIVATED DATA
  const agents = [
    { sales: 1, amount: 400, status: "PAID" },
    { sales: 2, amount: 500, status: "PENDING" },
    { sales: 3, amount: 700, status: "PAID" },
    { sales: 4, amount: 800, status: "PAID" },
    { sales: 5, amount: 900, status: "PENDING" },
    { sales: 6, amount: 1000, status: "PAID" },
    { sales: 7, amount: 1000, status: "PENDING" },
  ];

  const totalActivated = agents.reduce((sum, a) => sum + a.sales, 0);
  const totalAmount = agents.reduce((sum, a) => sum + a.amount, 0);
  const paidAmount = agents
    .filter((a) => a.status === "PAID")
    .reduce((sum, a) => sum + a.amount, 0);
  const pendingAmount = agents
    .filter((a) => a.status === "PENDING")
    .reduce((sum, a) => sum + a.amount, 0);

  const cards = [
    { label: "Sales Admin", value: "2", sub: "Sales Activation Report", trendUp: true },
    { label: "Area Sales Manager", value: "4", sub: "Sales Validation", trendUp: true },
    { label: "Accounting", value: "4", sub: "Payout Commission", trendUp: true },
    { label: "Head Manager", value: "3", sub: "Viewing Report", trendUp: false },
  ];

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden font-sans"
      style={{ backgroundColor: colors.yellow }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.navy}18 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full h-full flex flex-col gap-0 p-1.5 pb-2">
        {/* HEADER */}
        <div className="flex items-end px-0.5 pt-0.5 gap-2">
          <div
            className="flex-shrink-0 px-6 py-3.5 rounded-t-2xl relative z-10"
            style={{
              backgroundColor: "white",
              border: `3px solid ${colors.deepNavy}`,
              borderBottom: "none",
            }}
          >
            <img src={logo} alt="Paragon Realty Logo" className="h-12 object-contain" />
          </div>

          {/* Nav Buttons + Profile */}
          <div className="flex-1 flex justify-end items-end pb-2 gap-4 pr-4 relative">
            {/* Navigation Buttons */}
       
  {["Dashboard", "User Account", "Commission Amount"].map((item) => (
  <button
    key={item}
    onClick={() => {
      // 1. Update the local active state (optional if using URL-based active state)
      setActiveNav(item);

      // 2. Navigation Logic
      if (item === "Dashboard") {
        navigate("/dashboard");
      } else if (item === "User Account") {
        navigate("/manage-user");
      } else if (item === "Commission Amount") {
        navigate("/amount"); // <--- This links to your Amount.jsx
      }
    }}
    className="text-xs font-black px-4 py-2 rounded-xl transition-all active:scale-95"
    style={{
      color: activeNav === item ? "white" : colors.navy,
      backgroundColor: activeNav === item ? colors.teal : "white",
    }}
  >
    {item}
  </button>
))}

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm transition-all hover:shadow-md"
                style={{ border: `2px solid ${colors.deepNavy}20` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{ backgroundColor: colors.teal }}
                >
                  HA
                </div>
                <span
                  className="text-xs font-bold hidden md:block"
                  style={{ color: colors.deepNavy }}
                >
                  Head Admin
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${showProfile ? "rotate-180" : ""}`}
                  fill="none"
                  stroke={colors.deepNavy}
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfile && (
                <div
                  className="absolute right-0 mt-3 w-48 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn"
                  style={{
                    backgroundColor: "white",
                    border: `2px solid ${colors.deepNavy}15`,
                  }}
                >
                  <div
                    className="px-4 py-3 border-b text-sm font-bold"
                    style={{ color: colors.deepNavy }}
                  >
                    Head Admin
                  </div>
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition">
                    View Profile
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN BODY */}
        <div
          className="flex-1 overflow-hidden flex flex-col p-4 rounded-b-2xl rounded-tr-2xl"
          style={{
            border: `3px solid ${colors.deepNavy}`,
            backgroundColor: colors.yellow,
          }}
        >
          {/* TITLE */}
          <div className="mb-4">
            <h1 className="text-xl font-black italic" style={{ color: colors.deepNavy }}>
              COMMISSION PAYOUT SYSTEM
            </h1>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 shrink-0">
            {cards.map((card, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl p-4 transition-all duration-300"
                style={{
                  backgroundColor: "white",
                  border: `2px solid ${colors.deepNavy}18`,
                  opacity: animatedCards.includes(i) ? 1 : 0,
                  transform: animatedCards.includes(i) ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${colors.teal}, ${colors.tealLight})`,
                  }}
                />
                <div className="mt-3">
                  <div className="text-lg font-black" style={{ color: colors.deepNavy }}>
                    {card.value}
                  </div>
                  <div className="text-xs font-bold uppercase" style={{ color: colors.teal }}>
                    {card.label}
                  </div>
                  <div className="text-xs" style={{ color: colors.deepNavy + "70" }}>
                    {card.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div
            className="flex-1 overflow-hidden rounded-2xl flex flex-col"
            style={{ border: `2.5px solid ${colors.deepNavy}`, backgroundColor: "white" }}
          >
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr style={{ backgroundColor: colors.navy }}>
                    {["Count of Activated", "Amount of Activated", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-xs font-black uppercase"
                        style={{ color: "rgba(253,235,158,0.9)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agents.map((row, idx) => (
                    <tr
                      key={idx}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        backgroundColor:
                          hoveredRow === idx ? colors.yellow + "88" : idx % 2 === 0 ? "#fafafa" : "white",
                      }}
                    >
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center justify-center w-10 h-8 rounded-lg text-sm font-black"
                          style={{ backgroundColor: colors.yellow, color: colors.deepNavy }}
                        >
                          {row.sales} 
                        </span>
                      </td>
                      <td className="px-5 py-4 font-black" style={{ color: colors.teal }}>
                        ₱{row.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-black text-white"
                          style={{
                            backgroundColor: row.status === "PAID" ? colors.teal : colors.accent,
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
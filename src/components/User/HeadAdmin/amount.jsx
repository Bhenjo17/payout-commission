import React, { useState, useEffect } from "react";
import logo from "@/assets/image/paragon_logo.png";
import { useNavigate } from "react-router-dom";

const Amount = () => {
  const navigate = useNavigate();

  const colors = {
    yellow: "#FDEB9E",
    yellowDark: "#F5D96B",
    teal: "#006A67",
    tealLight: "#008f8b",
    navy: "#003161",
    deepNavy: "#000B58",
    accent: "#FF6B35",
  };

  // --- STATE ---
  const [amounts, setAmounts] = useState([
    { id: 1, count: "1", amount: "400", product: "PREPAID", status: "Active" },
    { id: 2, count: "2", amount: "800", product: "POSTPAID", status: "Inactive" },
    { id: 3, count: "3", amount: "1200", product: "SME", status: "Active" },
  ]);

  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const [formData, setFormData] = useState({
    count: "",
    amount: "",
    product: "PREPAID", 
    status: "Active",
  });

  // Helper for Product Badge Colors
  const getProductColor = (prod) => {
    switch (prod) {
      case "PREPAID": return "bg-blue-100 text-blue-700 border border-blue-200";
      case "POSTPAID": return "bg-purple-100 text-purple-700 border border-purple-200";
      case "SME": return "bg-orange-100 text-orange-700 border border-orange-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HANDLERS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...amounts];
      updated[editIndex] = { ...formData, id: amounts[editIndex].id };
      setAmounts(updated);
    } else {
      setAmounts([...amounts, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleEdit = (index) => {
    setFormData(amounts[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this configuration?")) {
      setAmounts(amounts.filter((a) => a.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setEditIndex(null);
      setFormData({ count: "", amount: "", product: "PREPAID", status: "Active" });
    }, 200);
  };

  return (
    <div className="w-full min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: colors.yellow }}>
      
      {/* HEADER */}
      <div className="flex items-end px-2 pt-2 gap-2">
        <div
          className="flex-shrink-0 px-6 py-3.5 rounded-t-2xl relative z-10"
          style={{ backgroundColor: "white", border: `3px solid ${colors.deepNavy}`, borderBottom: "none" }}
        >
          <img src={logo} alt="Paragon Logo" className="h-12 object-contain" />
        </div>

        <div className="flex-1 flex justify-end items-end pb-2 gap-4 pr-2">
          <div className="flex gap-2">
            {[
              { label: "Dashboard", path: "/dashboard" },
              { label: "User Account", path: "/manage-user" },
              { label: "Commission Amount", path: "/amount" }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-xs font-black px-4 py-2 rounded-xl transition-all active:scale-95"
                style={{
                  color: item.label === "Commission Amount" ? "white" : colors.navy,
                  backgroundColor: item.label === "Commission Amount" ? colors.teal : "white",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative profile-dropdown">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95"
              style={{ border: `2px solid ${colors.deepNavy}20` }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: colors.teal }}>HA</div>
              <span className="text-xs font-bold hidden md:block" style={{ color: colors.deepNavy }}>Head Admin</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${showProfile ? "rotate-180" : ""}`} fill="none" stroke={colors.deepNavy} strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div
        className="flex-1 flex flex-col p-4 rounded-b-2xl rounded-tr-2xl mx-2 mb-2"
        style={{ border: `3px solid ${colors.deepNavy}`, backgroundColor: colors.yellow }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-black italic uppercase" style={{ color: colors.deepNavy }}>Activated Amount</h1>
          <button
            className="text-white px-6 py-2 rounded-xl font-black transition-all hover:opacity-90 active:scale-95 shadow-md uppercase text-xs tracking-wider"
            style={{ backgroundColor: colors.teal }}
            onClick={() => setShowModal(true)}
          >
            + Add Configuration
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl p-4 flex-1 bg-white" style={{ border: `3px solid ${colors.deepNavy}` }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: colors.navy }}>
                {["Product Type", "Activated Count", "Activated Amount", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-[10px] font-black uppercase text-yellow-100 tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {amounts.map((item, idx) => (
                <tr
                  key={item.id}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="transition-colors duration-150 border-b border-gray-100 last:border-0"
                  style={{ backgroundColor: hoveredRow === idx ? colors.yellow + "44" : "transparent" }}
                >
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-tighter ${getProductColor(item.product)}`}>
                      {item.product}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold" style={{ color: colors.deepNavy }}>{item.count}</td>
                  <td className="px-5 py-4 font-black text-lg" style={{ color: colors.teal }}>₱{item.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black border ${item.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button onClick={() => handleEdit(idx)} className="text-teal-600 hover:text-teal-800 font-black text-[10px] transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-black text-[10px] transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

          <div 
            className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative z-10"
            style={{ border: `4px solid ${colors.deepNavy}` }}
          >
            <h2 className="text-2xl font-black italic mb-6 tracking-tight uppercase" style={{ color: colors.deepNavy }}>
                {editIndex !== null ? "Edit Amount" : "Add New Amount"}
            </h2>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                
                {/* Product Type Dropdown */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase ml-1 tracking-widest" style={{ color: colors.navy }}>Select Product</label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-black text-xs cursor-pointer appearance-none"
                      style={{ borderColor: colors.deepNavy + "15", backgroundColor: "#f9f9f9" }}
                    >
                      <option value="PREPAID">PREPAID</option>
                      <option value="POSTPAID">POSTPAID</option>
                      <option value="SME">SME</option>
                    </select>
                </div>

                {/* Activated Count */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase ml-1 tracking-widest" style={{ color: colors.navy }}>Activated Count</label>
                    <input
                      type="number"
                      value={formData.count}
                      onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                      className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-sm"
                      style={{ borderColor: colors.deepNavy + "15", backgroundColor: "#f9f9f9" }}
                      placeholder="e.g. 5"
                      required
                    />
                </div>

                {/* Activated Amount */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase ml-1 tracking-widest" style={{ color: colors.navy }}>Commission Amount (₱)</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-sm"
                      style={{ borderColor: colors.deepNavy + "15", backgroundColor: "#f9f9f9" }}
                      placeholder="e.g. 500"
                      required
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase ml-1 tracking-widest" style={{ color: colors.navy }}>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-black text-xs cursor-pointer appearance-none"
                      style={{ borderColor: colors.deepNavy + "15", backgroundColor: "#f9f9f9" }}
                    >
                      <option value="Active">ACTIVE</option>
                      <option value="Inactive">INACTIVE</option>
                    </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-xl border-2 font-black text-[10px] transition-all active:scale-95" style={{ borderColor: colors.deepNavy + "20" }}>CANCEL</button>
                <button type="submit" className="px-8 py-2 rounded-xl font-black text-[10px] text-white shadow-lg transition-all active:scale-95 hover:opacity-90" style={{ backgroundColor: colors.teal }}>
                  {editIndex !== null ? "SAVE CHANGES" : "ADD CONFIGURATION"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amount;
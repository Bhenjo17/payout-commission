import React, { useState, useEffect } from "react";
import logo from "@/assets/image/paragon_logo.png";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();

  // Color Palette
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
  const [users, setUsers] = useState([
    {
      profile: "JD",
      fullName: "John Doe",
      companyEmail: "john.doe@paragon.com",
      personalEmail: "johndoe@gmail.com",
      contactNumber: "0917-123-4567",
      workRole: "Sales Admin",
    },
    {
      profile: "AS",
      fullName: "Alice Smith",
      companyEmail: "alice.smith@paragon.com",
      personalEmail: "alice@gmail.com",
      contactNumber: "0917-987-6543",
      workRole: "Area Sales Manager",
    },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    profile: "",
    fullName: "",
    companyEmail: "",
    personalEmail: "",
    contactNumber: "",
    workRole: "",
  });

  // --- EFFECTS ---
  // Close profile dropdown when clicking outside
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
  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.companyEmail.toLowerCase().includes(search.toLowerCase()) ||
      u.workRole.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUserIndex !== null) {
      const newUsers = [...users];
      newUsers[editUserIndex] = formData;
      setUsers(newUsers);
    } else {
      setUsers([...users, formData]);
    }
    closeModal();
  };

  const handleEdit = (user) => {
    const actualIndex = users.findIndex((u) => u.companyEmail === user.companyEmail);
    setFormData(user);
    setEditUserIndex(actualIndex);
    setShowModal(true);
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.companyEmail !== email));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
        setEditUserIndex(null);
        setFormData({ profile: "", fullName: "", companyEmail: "", personalEmail: "", contactNumber: "", workRole: "" });
    }, 200); // Delay clear to allow exit animation to finish
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
          {/* Navigation Tabs */}
          <div className="flex gap-2">
            {[
              { label: "Dashboard", path: "/dashboard" },
              { label: "User Account", path: "/manage-user" },
              { label: "Commission Amount", path: "/amount" }
            ].map((item) => (
              <button
                key={item.label}
                className="text-xs font-black px-4 py-2 rounded-xl transition-all active:scale-95"
                style={{
                  color: item.label === "User Account" ? "white" : colors.navy,
                  backgroundColor: item.label === "User Account" ? colors.teal : "white",
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Profile Dropdown */}
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

            {showProfile && (
              <div
                className="absolute right-0 mt-3 w-48 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ backgroundColor: "white", border: `2px solid ${colors.deepNavy}15` }}
              >
                <div className="px-4 py-3 border-b text-sm font-bold" style={{ color: colors.deepNavy }}>Head Admin</div>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition">View Profile</button>
                <button className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition" onClick={() => navigate("/login")}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div
        className="flex-1 flex flex-col p-4 rounded-b-2xl rounded-tr-2xl mx-2 mb-2"
        style={{ border: `3px solid ${colors.deepNavy}`, backgroundColor: colors.yellow }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-xl font-black italic" style={{ color: colors.deepNavy }}>USER MANAGEMENT</h1>

          <div className="flex gap-2 items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 rounded-xl w-full md:w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-teal text-white px-6 py-2 rounded-xl font-black transition-all hover:opacity-90 active:scale-95 whitespace-nowrap shadow-md"
              style={{ backgroundColor: colors.teal }}
              onClick={() => setShowModal(true)}
            >
              + ADD USER
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl p-4 flex-1 bg-white" style={{ border: `3px solid ${colors.deepNavy}` }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: colors.navy }}>
                {["Profile", "Full Name", "Emails", "Contact", "Work Role", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-black uppercase text-yellow-100 tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.companyEmail}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="transition-colors duration-150"
                  style={{ backgroundColor: hoveredRow === idx ? colors.yellow + "44" : idx % 2 === 0 ? "#fafafa" : "white" }}
                >
                  <td className="px-5 py-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shadow-sm" style={{ backgroundColor: colors.teal }}>{user.profile}</div>
                  </td>
                  <td className="px-5 py-4 font-bold" style={{ color: colors.deepNavy }}>{user.fullName}</td>
                  <td className="px-5 py-4 text-xs">
                    <div className="font-bold" style={{ color: colors.teal }}>{user.companyEmail}</div>
                    <div className="opacity-60">{user.personalEmail}</div>
                  </td>
                  <td className="px-5 py-4 text-xs font-medium">{user.contactNumber}</td>
                  <td className="px-5 py-4"><span className="px-2 py-1 rounded text-[10px] font-black" style={{ backgroundColor: colors.yellow, color: colors.teal }}>{user.workRole.toUpperCase()}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(user)} className="text-teal-600 hover:text-teal-800 font-black text-xs transition-colors">EDIT</button>
                      <button onClick={() => handleDelete(user.companyEmail)} className="text-red-500 hover:text-red-700 font-black text-xs transition-colors">DELETE</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMOOTH MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Fade */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          />

          {/* Modal Box with Scale and Slide Animation */}
          <div 
            className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative z-10 
                       animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out"
            style={{ border: `4px solid ${colors.deepNavy}` }}
          >
            <h2 className="text-2xl font-black italic mb-6 tracking-tight" style={{ color: colors.deepNavy }}>
                {editUserIndex !== null ? "EDIT USER" : "ADD NEW USER"}
            </h2>
            
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-4 custom-scrollbar">
                {["profile", "fullName", "companyEmail", "personalEmail", "contactNumber", "workRole"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase ml-1 tracking-widest" style={{ color: colors.navy }}>{field.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type="text"
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                        style={{ borderColor: colors.deepNavy + "15", backgroundColor: "#f9f9f9" }}
                        placeholder={`Enter ${field}...`}
                        required
                      />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-xl border-2 font-black text-xs hover:bg-gray-50 transition-all active:scale-95" style={{ borderColor: colors.deepNavy + "20" }}>CANCEL</button>
                <button type="submit" className="px-8 py-2 rounded-xl font-black text-xs text-white shadow-lg transition-all active:scale-95 hover:opacity-90" style={{ backgroundColor: colors.teal }}>
                  {editUserIndex !== null ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
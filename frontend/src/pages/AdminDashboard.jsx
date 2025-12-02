

// import React from 'react';
// import { useAuth } from '../context/authContext';
// import AdminSidebar from '../components/dashboard/AdminSidebar';
// import Navbar from '../components/dashboard/Navbar';
// import { Outlet } from 'react-router-dom';

// const AdminDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex">
//       <AdminSidebar />

//       {/* Main content */}
//       <div className="flex-1 ml-0 md:ml-64 bg-gray-100 min-h-screen transition-all duration-300">
//         <Navbar />
//         <div className="p-4 md:p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'opacity-50 pointer-events-none md:opacity-100 md:pointer-events-auto' : ''
        }`}
      >
        <Navbar />
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


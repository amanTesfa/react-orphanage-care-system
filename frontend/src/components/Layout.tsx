import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* sidebar for md+ plus mobile overlay */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="bg-red-500 h-2" />
        <header className="bg-white border-b">
          <div className="container mx-auto px-6 py-3">
            <Breadcrumbs />
          </div>
        </header>
        <main className="grow container mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

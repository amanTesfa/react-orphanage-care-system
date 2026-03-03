import React from "react";
import { Link, useLocation } from "react-router-dom";

const segmentToName: Record<string, string> = {
  children: "Children",
  staff: "Staff",
  "meal-plans": "Meal Plans",
  adoptions: "Adoptions",
  visitors: "Visitor Logs",
  inventory: "Inventory",
  attendance: "Attendance",
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-600" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {parts.map((part, idx) => {
          const to = "/" + parts.slice(0, idx + 1).join("/");
          const name = segmentToName[part] || part;
          const isLast = idx === parts.length - 1;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-1">/</span>
              {isLast ? (
                <span className="font-semibold">{name}</span>
              ) : (
                <Link to={to} className="hover:underline">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

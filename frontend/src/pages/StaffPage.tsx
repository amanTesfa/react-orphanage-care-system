import React from "react";

import Card from "../components/Card";

const StaffPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Staff Management</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="View Staff">List and search employees</Card>
        <Card title="Add Staff">Register a new staff member</Card>
        <Card title="Assign Children">Manage assignments</Card>
      </div>
    </div>
  );
};

export default StaffPage;

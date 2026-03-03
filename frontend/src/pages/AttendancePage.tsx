import React from "react";

import Card from "../components/Card";

const AttendancePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Attendance Tracking</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Daily Log">Mark attendance</Card>
        <Card title="Reports">View summaries</Card>
        <Card title="Import Data">Upload CSV</Card>
      </div>
    </div>
  );
};

export default AttendancePage;

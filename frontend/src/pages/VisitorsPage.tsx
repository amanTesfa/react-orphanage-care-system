import React from "react";

import Card from "../components/Card";

const VisitorsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Visitor Logs</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Today's Visitors">Who’s here now</Card>
        <Card title="Log Visit">Record a new visit</Card>
        <Card title="History">View past entries</Card>
      </div>
    </div>
  );
};

export default VisitorsPage;

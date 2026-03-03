import React from "react";

import Card from "../components/Card";

const AdoptionsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Adoption Records</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="All Adoptions">Browse records</Card>
        <Card title="New Adoption">Register a case</Card>
        <Card title="Search">Lookup by child or family</Card>
      </div>
    </div>
  );
};

export default AdoptionsPage;

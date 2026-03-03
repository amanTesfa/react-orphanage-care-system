import React from "react";

import Card from "../components/Card";

const MealPlansPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Meal Plans</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Weekly Overview">See upcoming plans</Card>
        <Card title="Create Plan">Build a new meal schedule</Card>
        <Card title="Dietary Restrictions">Manage allergies</Card>
      </div>
    </div>
  );
};

export default MealPlansPage;

import React from "react";

import Card from "../components/Card";

const InventoryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Inventory Management</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="View Items">Browse inventory</Card>
        <Card title="Add Item">Add new supplies</Card>
        <Card title="Adjust Stock">Update quantities</Card>
      </div>
    </div>
  );
};

export default InventoryPage;

import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-medium mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;

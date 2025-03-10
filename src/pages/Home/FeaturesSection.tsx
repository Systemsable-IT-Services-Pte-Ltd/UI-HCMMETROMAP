import React from "react";
import { MdDirectionsTransit, MdSchedule } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MdDirectionsTransit className="text-5xl text-purple-600" />,
      title: "Route Planning",
      description:
        "Plan your journey with our advanced route planning tool. Find the fastest routes between any two points in the city.",
    },
    {
      icon: <MdSchedule className="text-5xl text-purple-600" />,
      title: "Real-time Schedules",
      description:
        "Get access to real-time schedules and departure information to optimize your travel time.",
    },
    {
      icon: <FaInfoCircle className="text-5xl text-purple-600" />,
      title: "Station Information",
      description:
        "Explore detailed information about each station, including amenities, accessibility features, and nearby attractions.",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Metro Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
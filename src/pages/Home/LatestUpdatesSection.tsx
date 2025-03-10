import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface Update {
  date: string;
  title: string;
  excerpt: string;
}

interface LatestUpdatesSectionProps {
  handleNavigate: (path: string) => void;
}

interface UpdateCardProps {
  date: string;
  title: string;
  excerpt: string;
  index: number;
  onClick: (path: string) => void;
}
const UpdateCard: React.FC<UpdateCardProps> = ({
  date,
  title,
  excerpt,
  index,
  onClick,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div className="text-sm text-gray-500 mb-2">{date}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
      <div
        onClick={() => onClick(`/updates/${index + 1}`)}
        className="mt-4 flex items-center text-purple-600 hover:text-purple-800 font-medium space-x-1 md:space-x-0 md:group-hover:space-x-1 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <span className="whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-in-out">
          Read more
        </span>
        <FaArrowRight className="text-xs md:transform md:translate-x-[-80px] md:group-hover:translate-x-0 transition-all duration-300 ease-in-out">
          →
        </FaArrowRight>
      </div>
    </div>
  );
};
const LatestUpdatesSection: React.FC<LatestUpdatesSectionProps> = ({
  handleNavigate,
}) => {
  const updates: Update[] = [
    {
      date: "March 1, 2025",
      title: "Line 1 Construction Progress Reaches 75%",
      excerpt:
        "The construction of Metro Line 1 from Bến Thành to Suối Tiên has reached 75% completion. Testing phase expected to begin in June.",
    },
    {
      date: "February 24, 2025",
      title: "New Metro App Features Announced",
      excerpt:
        "Our mobile app has been updated with new features including real-time tracking, personalized alerts, and improved accessibility options.",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Latest Updates</h2>
          <div
            onClick={() => handleNavigate("/updates")}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            View all updates
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((update, index) => (
            <UpdateCard
              key={index}
              date={update.date}
              title={update.title}
              excerpt={update.excerpt}
              index={index}
              onClick={handleNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdatesSection;

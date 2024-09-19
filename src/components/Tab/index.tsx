import React, { useState } from "react";

interface TabProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="border-gray-300 flex justify-between border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-lg  transition-colors duration-300 ease-in-out ${
              activeTab === tab.id
                ? "border-b-4 border-blue-600 bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            } rounded-t-md`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-4 rounded-b-md bg-white p-6 shadow-md">
        {tabs.map((tab) =>
          activeTab === tab.id ? <div key={tab.id}>{tab.content}</div> : null,
        )}
      </div>
    </div>
  );
};

export default Tab;

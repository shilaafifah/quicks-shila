import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TaskMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My Tasks");

  const options = [
    "My Tasks",
    "Personal Errands",
    "Urgent To-Do",
  ];

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  // Filter out the selected option from the list
  const filteredOptions = options.filter(option => option !== selectedOption);

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Task</span>
      <Image
        src={showWidget ? "/assets/task-open.png" : "/assets/task.png"}
        alt="Task Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />
      {showWidget && (
        <motion.div
          className="absolute top-[-484px] right-0 w-[500px] h-[500px] bg-white shadow-md rounded-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={widgetVariants}
          transition={{ duration: 0.3 }}
        >
          {/* Header Widget */}
          <div className="flex justify-between items-center p-3">
            {/* Custom Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 border border-gray-300 rounded-md w-40 text-left flex items-center justify-between"
              >
                {selectedOption}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul className="divide-y divide-gray-300">
                    {filteredOptions.map(option => (
                      <li
                        key={option}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button className="p-2 bg-blue-500 text-white rounded-md">
              New Task
            </button>
          </div>

          {/* Daftar Task */}
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-start mb-4 border-b border-gray-300 pb-4">
              <input type="checkbox" className="w-4 h-4 border-gray-500" />
              <div className="ml-4">
                <h3 className="text-gray-800 font-semibold">Task 1</h3>
                <p className="text-gray-600">Deskripsi tugas ke 1.</p>
              </div>
            </div>
            <div className="flex items-start mb-4 border-b border-gray-300 pb-4">
              <input type="checkbox" className="w-4 h-4 border-gray-500" />
              <div className="ml-4">
                <h3 className="text-gray-800 font-semibold">Task 2</h3>
                <p className="text-gray-600">Deskripsi tugas ke 2.</p>
              </div>
            </div>
            <div className="flex items-start mb-4 border-b border-gray-300 pb-4">
              <input type="checkbox" className="w-4 h-4 border-gray-500" />
              <div className="ml-4">
                <h3 className="text-gray-800 font-semibold">Task 3</h3>
                <p className="text-gray-600">Deskripsi tugas ke 3.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskMenu;

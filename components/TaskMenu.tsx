import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TaskMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Task</span>
      <Image
        src="/assets/task.png"
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
            <select className="p-2 border border-gray-300 rounded-md">
              <option>My Tasks</option>
            </select>
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

import { useState } from "react";
import Image from "next/image";

const TaskMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  return (
    <div className="flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Task</span>
      <Image
        src="/assets/task.png"
        alt="Task Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />
      {showWidget && (
        <div className="absolute top-[-120px] w-[200px] h-[100px] bg-white shadow-md rounded-lg">
          {/* widget task */}
          <p className="text-black p-4">halo shila, ini adalah widget task!</p>
        </div>
      )}
    </div>
  );
};

export default TaskMenu;

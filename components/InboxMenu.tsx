import { useState } from "react";
import Image from "next/image";

const InboxMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  return (
    <div className="flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Inbox</span>
      <Image
        src="/assets/inbox.png"
        alt="Inbox Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />
      {showWidget && (
        <div className="absolute top-[-120px] w-[200px] h-[100px] bg-white shadow-md rounded-lg">
          {/* widget inbox */}
          <p className="text-black p-4">halo shila, ini adalah widget inbox!</p>
        </div>
      )}
    </div>
  );
};

export default InboxMenu;

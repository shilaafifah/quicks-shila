import { useState } from "react";
import Image from "next/image";

const InboxMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Inbox</span>
      <Image
        src="/assets/inbox.png"
        alt="Inbox Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />

      {showWidget && (
        <div className="absolute top-[-484px] right-0 w-[500px] h-[500px] bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Daftar Inbox */}
          <div className="p-4 h-full overflow-y-auto">
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="text-gray-800 font-semibold">Inbox 1</h3>
              <p className="text-gray-600">Pesan pertama di inbox ini.</p>
            </div>
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="text-gray-800 font-semibold">Inbox 2</h3>
              <p className="text-gray-600">Pesan kedua di inbox ini.</p>
            </div>
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="text-gray-800 font-semibold">Inbox 3</h3>
              <p className="text-gray-600">Pesan ketiga di inbox ini.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxMenu;

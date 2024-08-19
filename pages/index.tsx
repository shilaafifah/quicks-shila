import { useState } from "react";
import type { NextPage } from "next";
import SearchCard from "@/components/Search";
import TaskMenu from "@/components/TaskMenu";
import InboxMenu from "@/components/InboxMenu";
import Image from "next/image";

const Home: NextPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <div className="relative min-h-screen bg-[#4F4F4F] p-4">
      <SearchCard />
      <h1 className="text-2xl font-bold mt-4 mb-4 text-white">
        Selamat datang, Shila
      </h1>

      {/* Menu Utama */}
      <div
        className="fixed bottom-4 right-4 cursor-pointer"
        onClick={toggleMenu}
      >
        <Image src="/assets/menu.png" alt="Menu Icon" width={50} height={50} />
      </div>

      {/* Menu Task dan Inbox */}
      {showMenu && (
        <div className="fixed bottom-4 right-[5.5rem] flex space-x-4">
          <TaskMenu />
          <InboxMenu />
        </div>
      )}
    </div>
  );
};

export default Home;

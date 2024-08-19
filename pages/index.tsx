import type { NextPage } from "next";
import SearchCard from "@/components/Search";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-[#4F4F4F] p-4">
      <SearchCard />
      <h1 className="text-2xl font-bold mt-4 mb-4 text-white">
        Selamat datang shila
      </h1>

      {/* menu */}
      <div
        className="fixed bottom-4 right-4 cursor-pointer"
        onClick={() => alert("Menu clicked!")}
      >
        <Image src="/assets/menu.png" alt="Menu Icon" width={50} height={50} />
      </div>
    </div>
  );
};

export default Home;

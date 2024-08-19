import React from "react";

const SearchCard: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <div className="bg-[#828282] shadow-md rounded-lg flex items-center p-3">
        <i className="fa fa-search text-white mr-4"></i>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-white"
        />
      </div>
    </div>
  );
};

export default SearchCard;

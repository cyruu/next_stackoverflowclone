import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const MoblieSearch = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <div className="moblesearchdropdown text-xl">
      <div
        className={`py-1 px-2 ${
          showMobileSearch ? "bg-gray-200 rounded-md" : ""
        }`}
        onClick={() => setShowMobileSearch((prev) => !prev)}
      >
        <SearchIcon />
      </div>
      <div
        className={`mobilsearchform absolute top-20 w-screen left-0 bg-gray-200 p-2 ${
          showMobileSearch ? "" : "hidden"
        }`}
      >
        <form
          className="w-fullborder border-gray-300 rounded-md py-1 bg-white flex"
          action="/search"
          onSubmit={(e) => {
            setShowMobileSearch(false);
          }}
        >
          <SearchIcon className="mx-2 mt-[3px]" />
          <input
            type="text"
            className="outline-none w-[80%] px-1 text-sm text-gray-600 "
            name="q"
          />
          <div onClick={() => setShowMobileSearch(false)} className=" w-max">
            <CloseIcon />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoblieSearch;

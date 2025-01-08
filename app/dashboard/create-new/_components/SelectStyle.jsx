"use client";
import React, { useState } from "react";
import Image from "next/image";

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.png",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
    },
    {
      name: "Comic",
      image: "/comic.png",
    },
    {
      name: "WaterColor",
      image: "/watercolor.png",
    },
    {
      name: "GTA",
      image: "/gta.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select the style for your video</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid:cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${
              selectedOption == item.name && "border-4 border-primary"
            }`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              className="h-48 object-cover w-full"
              alt="image style"
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
              }}
            />
            <h2 className="absolut p-1 bg-black text-white text-center rounded-b-lg w-full">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;

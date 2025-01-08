import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md shadow-purple-500 bg-purple-300">
      <div className="flex gap-3 items-center">
        <Image src={"/logo2.jpg"} width={40} height={40} alt="Logo_FeedVids" className="rounded"/>
        <h2 className="font-bold text-xl">FeedVids</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;

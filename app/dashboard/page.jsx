"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./create-new/_components/VideoList";


function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const user = useUser();


  const GetVideoList = async () => {
    
    if (!user.isLoaded || !user.user.primaryEmailAddress?.emailAddress) return;
  
    const primaryEmail = user?.user.primaryEmailAddress.emailAddress;
    
    if (!primaryEmail) {
      console.error("No primary email found.");
      return;
    }
    
  
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, primaryEmail));

      // console.log(result);
      
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };
  
  useEffect(() => {
    if (user.isLoaded) {
      GetVideoList();
    }
  }, [user.isLoaded]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="mt-4">+ Create New</Button>
        </Link>
      </div>
      {videoList.length == 0 && (
        <div className="p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted">
          <h2>No videos created yet... Create a new AI generated video now!</h2>
          <Link href={"/dashboard/create-new"}>
            <Button className="mt-4">Create New Short Video</Button>
          </Link>
        </div>
      )}

      <VideoList videoList={videoList}/>
    </div>
  );
}

export default Dashboard;

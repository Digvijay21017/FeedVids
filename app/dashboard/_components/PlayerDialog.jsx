import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";


function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [frameDuration ,setFrameDuration] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo) {
      setOpenDialog((prev) => {return !prev});
      videoId && GetVideoData();
    }
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    // console.log(result);
    console.log("Video data fetched successfully.");
    
    setVideoData(result[0]);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="bg-white flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold my-5">
              Your video is ready!
            </DialogTitle>
            <DialogDescription>
            {videoData ? ( // Render the Player only when videoData is ready
              <Player
                component={RemotionVideo}
                durationInFrames={Math.round(frameDuration)}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...videoData, // Spread the fetched data into props
                  setDurationInFrame: (frame) => setFrameDuration(frame),
                }}
              />
            ) : (
              <p>Loading video data...</p> // Placeholder while videoData is being fetched
            )}
              <div className="flex gap-10 items-center ml-14 mt-5">
                <Button variant="ghost" onClick={() => {router.replace('/dashboard'); setOpenDialog(false)}}>Cancel</Button>
                <Button>Export</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlayerDialog;

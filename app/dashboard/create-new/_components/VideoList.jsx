import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "../../_components/RemotionVideo";
import PlayerDialog from "../../_components/PlayerDialog";

function VideoList({ videoList }) {

  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState();

  return (
    <div
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {videoList?.map((video, index) => (
        <div key={index} className="cursor-pointer hover:scale-105 transition-all" onClick={() => {setOpenPlayerDialog(Date.now()); setVideoId(video?.id)}} >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => {return},
            }}
            style={
              {
                borderRadius: 5,
                width: '100%',
              }
            }
            
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId}/>
    </div>
  );
}

export default VideoList;

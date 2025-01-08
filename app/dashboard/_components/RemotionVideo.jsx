import React, { useEffect } from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionVideo({ script, audioFileUrl, captions, imageList, setDurationInFrame }) {
  const { fps } = useVideoConfig();

  const durationInFrames = captions && captions[captions?.length - 1]?.end / 1000 * fps;

  // Use effect to set the duration once
  useEffect(() => {
    setDurationInFrame(durationInFrames);
  }, [durationInFrames, setDurationInFrame]);

  const frame = useCurrentFrame();

  const getCurentCaption = () => {
    const currentTime = frame/30*1000;
    const currentCaption = captions.find((word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption?currentCaption?.text:'';
  }

  return (
    <>
      <AbsoluteFill style={{ backgroundColor: "black" }}>
        {imageList?.map((image, index) => {
          
          const startTime = index * durationInFrames / imageList?.length;
          const duration = durationInFrames;
          // const scale = (index) => interpolate(
          //   frame,
          //   [startTime, startTime + duration/2, startTime+duration],
          //   index%2 ==0 ? [1, 1.2, 1] : [2, 1, 2],
          //   {extrapolateLeft: 'clamp', extrapolateRight:'clamp'}
          // )

          return(
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={Math.round(durationInFrames / (imageList?.length || 1))}
          >
            <Img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // transform: `scale(${scale(index)})`,
              }}
            />
            <AbsoluteFill className="text-white justify-items-end items-center bottom-10 h-[150px] top-0">
              <h2 className="text-2xl">{getCurentCaption()}</h2>
            </AbsoluteFill>
          </Sequence>
        )}
        )}
        <Audio src={audioFileUrl}/>
      </AbsoluteFill>
    </>
  );
}

export default RemotionVideo;

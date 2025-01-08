"use client";
import React, { useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoader from "./_components/CustomLoader";
import { v4 as uuidv4 } from "uuid";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();

  const SaveVideoData = async (data) => {
    setIsLoading(true);
    // console.log("Saving Video Data: ", data);
    
    try {
      // Map fields to match the database schema
      const dbData = {
        script: data.videoScript, // Map videoScript to script
        audioFileUrl: data.audioUrl,
        captions: data.captions,
        imageList: data.imageList,
        createdBy: data.createdBy,
      };
  
      // console.log("Data being inserted: ", dbData);
  
      // Insert into the database
      const result = await db.insert(VideoData).values(dbData).returning({id : VideoData.id});
  
      setVideoId(result.id);
      setPlayVideo(true);
      console.log("Video Data Saved: ", result);
    } catch (error) {
      console.log("Error Saving Video Data: ", error);
    }

    setIsLoading(false);
  };


  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));

    // console.log(formData);
  };

  const onGenerateHandler = () => {
    GetVideoScript();

    // generateAudioFile(videoScript);

    // generateImage();
  };

  const GetVideoScript = async () => {
    setIsLoading(true);
    const prompt =
      "Write a script to generate a " +
      formData.duration +
      " video on the topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain Text";

    // console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        setVideoScript(resp.data.result);
        console.log("Script :" + resp.data.result);
        generateAudioFile(resp.data.result);
      });

    // setIsLoading(false);
  };

  const generateAudioFile = async (vidScript) => {
    // setIsLoading(true);
    // console.log(vidScript);

    const id = uuidv4();
    const script = vidScript.map(scene => scene.ContentText).join(" ");

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((resp) => {
        setAudioUrl(resp.data.uploadResult);
        console.log("AudioUrl :" + resp.data.uploadResult);
        generateCaption(resp.data.uploadResult, vidScript);
      });

    // setIsLoading(false);
  };

  const generateCaption = async (audioUrl, vidScript) => {
    // console.log(audioUrl);

    await axios
      .post("/api/generate-caption", {
        audioFileURL: audioUrl,
      })
      .then((resp) => {
        setCaptions(resp.data.result);
        console.log("Captions :" + resp.data.result);
        generateImage(vidScript);
      });

    // setIsLoading(false);
  };

  const generateImage = async (Script) => {
    console.log(Script);
    
    let images = [];
  
    for (const element of Script) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        
        images.push(resp.data.result);
      } catch (error) {
        console.error("Error generating image for:", element.imagePrompt, error);
      }
    }
    console.log(images);
    setImageList(images);
    setIsLoading(false);
  
    //  SaveVideoData(VideoData);
  };
  
  useEffect(() => {
    if (videoScript && audioUrl && captions && imageList) {
      console.log(`All data is ready to save`);
      
      const VideoData = {
        videoScript,
        audioUrl,
        captions,
        imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      };
  
      SaveVideoData(VideoData);
    }
  }, [videoScript, audioUrl, captions, imageList]);

  

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Generate New Video
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onGenerateHandler}>
          Generate Short Video
        </Button>
      </div>
      <CustomLoader loading={isLoading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
    </div>
  );
}

export default CreateNew;

import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { Readable } from "stream"; // Import Readable stream
import cloudinary from 'cloudinary';
// const fs = require("fs");
// const util = require("util");

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  // console.log("Text to convert to audio:", typeof(text) +" "+ text);
  

  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
        
    // Upload audioContent to Cloudinary
    const audioContent = response.audioContent;
    // console.log("Audio content generated:", audioContent);
    
    // Create a readable stream from the audio content
    const bufferStream = new Readable();
    bufferStream.push(audioContent);
    bufferStream.push(null); // Signal the end of the stream

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      bufferStream.pipe(
        cloudinary.v2.uploader.upload_stream(
          { resource_type: 'raw', public_id: `feedvids/${id}` }, // Specify resource type and public ID
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
      );
    });

    // console.log("Uploaded file url :", uploadResult);


    return NextResponse.json({
      Result: "Audio content uploaded successfully",
      uploadResult: uploadResult.secure_url, // Include upload result in the response
    });
  } catch (error) {
    console.log("Error generating audio:", error.message);
    return NextResponse.json({ Error: error.message });
  }
}

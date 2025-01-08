import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileURL } = await req.json();

    // console.log(audioFileURL);
    
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY,
    });

    const audioUrl = audioFileURL;

    const config = {
      audio_url: audioUrl,
    };

    const transcript = await client.transcripts.transcribe(config);
    // console.log(transcript.words);

    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    console.log(error.message);
    
    return NextResponse.json({ error: error.message });
  }
}

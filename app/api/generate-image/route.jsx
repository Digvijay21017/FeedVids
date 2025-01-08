import Replicate from "replicate";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req, res) {
  try {
    const { prompt } = await req.json();

    // console.log(prompt);
    

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const [output] = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    const imgUrl = output.url().href;
    // console.log(imgUrl);

    const result = await cloudinary.v2.uploader.upload(imgUrl);

    return NextResponse.json({ result: result.secure_url });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error({
      message: "Error while uploading image to cloudinary",
    });
  }
}

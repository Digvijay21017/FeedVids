import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {prompt} = await req.json();
        // console.log(prompt);

        const result = await chatSession.sendMessage(prompt);
        const finalResponse = result.response.text()
        // console.log(result.response.text());
        
        return NextResponse.json({'result':JSON.parse(finalResponse)})
    } catch (error) {
        console.log(error.message);
        
        return NextResponse.json({'Error':error})
    }
}
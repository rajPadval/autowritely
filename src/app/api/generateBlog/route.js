import { NextResponse } from "next/server";
import openai from "@/helpers/openai";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { topic } = reqBody;

    console.log("Topic:", topic);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Pretend you're a content writer, be energetic and full of charisma. Make the content easy for the viewer to understand, also include some lines of humour in the content",
        },
        {
          role: "user",
          content: `generate a blog on the topic ${topic}`,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("GPT-3 Response:", completion);

    if (!completion?.data?.choices?.[0]?.message?.content) {
      throw new Error("No content generated by GPT-3");
    }

    const response = completion.data.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating blog content:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
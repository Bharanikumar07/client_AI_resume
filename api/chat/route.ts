import { google } from "@ai-sdk/google";
import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const result = streamText({
    model: google("gemini-pro"),
    system: `You are an expert resume coach and career advisor. Your role is to help users:
- Improve their resumes for ATS (Applicant Tracking Systems) compatibility
- Provide personalized career advice
- Answer questions about job searching, interviews, and professional development
- Suggest improvements to resume content, formatting, and keywords
- Help users tailor their resumes for specific job descriptions

Be helpful, encouraging, and provide actionable advice. When reviewing resumes or providing suggestions, be specific and constructive. Format your responses clearly with bullet points or numbered lists when appropriate.`,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages: allMessages, isAborted }) => {
      if (isAborted || !user) return;

      // Save chat history to database
      const lastUserMessage = messages[messages.length - 1];
      const lastAssistantMessage = allMessages[allMessages.length - 1];

      if (lastUserMessage && lastAssistantMessage) {
        const userText =
          lastUserMessage.parts
            ?.filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("") || "";

        const assistantText =
          lastAssistantMessage.parts
            ?.filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("") || "";

        await supabase.from("chat_history").insert({
          user_id: user.id,
          user_message: userText,
          assistant_response: assistantText,
        });
      }
    },
    consumeSseStream: consumeStream,
  });
}

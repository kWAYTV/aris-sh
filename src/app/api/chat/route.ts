import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

import { getSessionServer } from '@/data/session';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const session = await getSessionServer();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = streamText({
    model: google('gemini-2.0-flash'),
    messages
  });

  return result.toDataStreamResponse();
}

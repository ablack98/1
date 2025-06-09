import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, tone } = req.body;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: `You are Navi, a supportive and warm life coach with a ${tone} tone.` },
        ...messages
      ],
      temperature: 0.7
    });

    const result = chatResponse.choices[0].message;
    res.status(200).json({ result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}


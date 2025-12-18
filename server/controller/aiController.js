const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runAI(prompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

exports.summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const output = await runAI(
      `Summarize clearly in 2–3 sentences:\n\n${content}`
    );

    res.json({ result: output.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI summarizing failed" });
  }
};

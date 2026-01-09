// const OpenAI = require("openai");
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function runAI(prompt) {
//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//   });

//   return response.choices[0].message.content;
// }

exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        message: "Text too short to summarize",
      });
    }

    // 🔁 Replace this later with real AI call
    const summary = text
      .split(".")
      .slice(0, 2)
      .join(".") + ".";

    return res.json({ summary });
  } catch (err) {
    console.error("summarizeText:", err.message);
    return res.status(500).json({
      message: "Failed to summarize text",
    });
  }
};


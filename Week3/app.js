import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY
});

app.post("/generate", async (req, res) => {

    try {
        

        const goal = req.body.goal;

        const response = await ai.models.generateContent({


           model: "gemini-flash-lite-latest",

            contents: `Create a step by step plan for ${goal}.
Return only JSON.

Format:

[
 {
  "task":"...",
  "priority":"High",
  "time":"2 Days"
 }
]
`

        });

        
            console.log("Gemini Response:");
        console.log(response.text);

      const cleanText = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

res.json(JSON.parse(cleanText));
    }

    catch (error) {

        console.log(error);

        res.status(500).send("Something went wrong.");

    }

});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});
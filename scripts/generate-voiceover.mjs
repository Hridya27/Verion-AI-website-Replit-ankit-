import OpenAI from "openai";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey:  process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const SCENES = [
  "Introducing Verrion AI Connect. The enterprise talent and resource intelligence platform.",
  "Right now, your talent data is scattered across disconnected systems. People are mismatched to projects. And growth potential stays completely invisible.",
  "Verrion AI Connect brings everything together. Every employee profile. Every skill. Every opportunity. Intelligently matched — on one platform.",
  "The Recognition Engine makes performance visible. Gamified points, achievement badges, and live leaderboards. Driving genuine engagement, every single day.",
  "The GROW Collaboration Feed keeps your team connected. Spotlight colleagues. Celebrate wins. Appreciate great work. Recognition that's visible across your entire organization.",
  "Three-sixty workforce analytics — from hire to retire. Every resource decision. Every hiring call. Powered by AI.",
  "Grow your people. Verrion AI Connect.",
];

const OUT_DIR = join(__dirname, "../artifacts/verionai-website/public/audio");

for (let i = 0; i < SCENES.length; i++) {
  const text = SCENES[i];
  console.log(`Generating scene ${i}: "${text.slice(0, 60)}..."`);
  const response = await client.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: text,
    response_format: "mp3",
    speed: 0.92,
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const outPath = join(OUT_DIR, `scene-${i}.mp3`);
  writeFileSync(outPath, buffer);
  console.log(`  ✓ Saved ${outPath} (${buffer.length} bytes)`);
}

console.log("\nAll scenes generated.");

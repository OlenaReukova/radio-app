import fs from "fs";
import { groq, MODEL } from "./groq-client.js";
import { PROJECT_CONTEXT } from "./context.js";

async function run() {

const filePath = process.argv[2];

if (!filePath) {
console.log("Usage: npm run skill:write-tests -- path/to/file");
process.exit(1);
}

const fileContent = fs.readFileSync(filePath, "utf-8");

const prompt = `
${PROJECT_CONTEXT}

Write Jest tests for this file.

Rules:
- React components use React Testing Library
- Backend code uses Jest
- Mock external dependencies
- Cover happy path and edge cases

File:

${fileContent}
`;

const response = await groq.chat.completions.create({
model: MODEL,
messages: [{ role: "user", content: prompt }]
});

console.log(response.choices[0].message.content);

}

run();
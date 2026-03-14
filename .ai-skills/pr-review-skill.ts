import { execSync } from "child_process";
import { groq, MODEL } from "./groq-client.js";
import { PROJECT_CONTEXT } from "./context.js";

async function run() {

const branch = process.argv[2];

if (!branch) {
console.log("Usage: npm run skill:pr-review -- branch-name");
process.exit(1);
}

const diff = execSync(`git diff main...${branch}`).toString();

const prompt = `
${PROJECT_CONTEXT}

You are a senior code reviewer.

Review this diff and identify issues related to:

- TypeScript type safety
- React component best practices
- Tailwind CSS misuse
- accessibility problems with Radix UI
- audio streaming bugs with Howler.js
- Express error handling
- Redis caching logic
- general performance issues

Return a numbered list of actionable comments.

Diff:

${diff}
`;

const response = await groq.chat.completions.create({
model: MODEL,
messages: [{ role: "user", content: prompt }]
});

console.log(response.choices[0].message.content);

}

run();
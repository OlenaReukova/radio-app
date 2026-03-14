import { execSync } from "child_process";
import { groq, MODEL } from "./groq-client.js";
import { PROJECT_CONTEXT } from "./context.js";
async function run() {

const diff = execSync("git diff --staged").toString();

const prompt = `
${PROJECT_CONTEXT}

You are a senior developer.

Given the following git diff generate a conventional commit message.

Rules:
- use feat, fix, refactor, chore, test
- short subject line
- optional body explaining changes

Git diff:

${diff}
`;

const response = await groq.chat.completions.create({
model: MODEL,
messages: [{ role: "user", content: prompt }]
});

console.log("\nSuggested commit message:\n");
console.log(response.choices[0].message.content);

}

run();
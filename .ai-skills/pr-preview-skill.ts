import { execSync } from "child_process";
import { groq, MODEL } from "./groq-client.js";
import { PROJECT_CONTEXT } from "./context.js";

async function run() {

const commits = execSync("git log main..HEAD --oneline").toString();
const diff = execSync("git diff main...HEAD").toString();

const prompt = `
${PROJECT_CONTEXT}

You are reviewing a feature branch.

Based on the commits and diff generate a GitHub Pull Request description.

Format:

Summary
Changes Made
How to Test
Notes for Reviewers

Commits:
${commits}

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
const generateButton = document.getElementById("generateBtn");
const ideaInput = document.getElementById("idea");
const resultsContainer = document.getElementById("results");

let latestGeneratedData = null;
let latestIdea = "";

generateButton.addEventListener("click", async () => {
    const idea = ideaInput.value.trim();

    if (!idea) {
        latestGeneratedData = null;
        latestIdea = "";

        resultsContainer.innerHTML = `
            <div class="message-card">
                <h2>Please enter a product idea first.</h2>
                <p>Example: A smart desk lamp for design students.</p>
            </div>
        `;
        return;
    }

    latestIdea = idea;

    generateButton.disabled = true;
    generateButton.textContent = "Generating...";

    resultsContainer.innerHTML = `
        <div class="message-card">
            <h2>Generating design document...</h2>
            <p>Please wait a moment.</p>
        </div>
    `;

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idea: idea })
        });

        const data = await response.json();

        latestGeneratedData = data;
        renderResults(data);
    } catch (error) {
        latestGeneratedData = null;

        resultsContainer.innerHTML = `
            <div class="message-card">
                <h2>Something went wrong.</h2>
                <p>Please check the Flask server and try again.</p>
            </div>
        `;
    } finally {
        generateButton.disabled = false;
        generateButton.textContent = "Generate";
    }
});

function renderResults(data) {
    resultsContainer.innerHTML = "";

    const actions = document.createElement("div");
    actions.className = "actions-card";
    actions.innerHTML = `
        <h2>Design document generated</h2>
        <p>You can review the cards below or download the result as a Markdown file.</p>
        <button class="secondary-button" type="button" id="downloadMarkdownBtn">
            Download Markdown
        </button>
    `;

    resultsContainer.appendChild(actions);

    Object.entries(data).forEach(([title, content]) => {
        const card = document.createElement("article");
        card.className = "result-card";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const body = document.createElement("div");
        body.className = "card-content";
        body.innerHTML = formatContent(content);

        card.appendChild(heading);
        card.appendChild(body);
        resultsContainer.appendChild(card);
    });

    document
        .getElementById("downloadMarkdownBtn")
        .addEventListener("click", downloadMarkdown);
}

function formatContent(content) {
    if (Array.isArray(content)) {
        return `
            <ul>
                ${content.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
    }

    if (typeof content === "object" && content !== null) {
        return `
            <ul>
                ${Object.entries(content)
                    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
                    .join("")}
            </ul>
        `;
    }

    return `<p>${content}</p>`;
}

function downloadMarkdown() {
    if (!latestGeneratedData) {
        return;
    }

    const markdown = createMarkdownDocument(latestIdea, latestGeneratedData);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = createFileName(latestIdea);
    link.click();

    URL.revokeObjectURL(url);
}

function createMarkdownDocument(idea, data) {
    let markdown = `# AI Industrial Design Assistant Output\n\n`;
    markdown += `## Input Idea\n\n${idea}\n\n`;

    Object.entries(data).forEach(([title, content]) => {
        markdown += `---\n\n`;
        markdown += `## ${title}\n\n`;

        if (Array.isArray(content)) {
            content.forEach(item => {
                markdown += `- ${item}\n`;
            });
            markdown += `\n`;
            return;
        }

        if (typeof content === "object" && content !== null) {
            Object.entries(content).forEach(([key, value]) => {
                markdown += `### ${key}\n\n${value}\n\n`;
            });
            return;
        }

        markdown += `${content}\n\n`;
    });

    return markdown;
}

function createFileName(idea) {
    const cleanIdea = idea
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 50);

    return `${cleanIdea || "design-document"}.md`;
}
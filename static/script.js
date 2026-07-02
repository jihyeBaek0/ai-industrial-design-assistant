const generateButton = document.getElementById("generateBtn");
const ideaInput = document.getElementById("idea");
const resultsContainer = document.getElementById("results");

generateButton.addEventListener("click", async () => {
    const idea = ideaInput.value.trim();

    if (!idea) {
        resultsContainer.innerHTML = `
            <div class="message-card">
                <h2>Please enter a product idea first.</h2>
                <p>Example: A smart desk lamp for design students.</p>
            </div>
        `;
        return;
    }

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

        resultsContainer.innerHTML = "";

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
    } catch (error) {
        resultsContainer.innerHTML = `
            <div class="message-card">
                <h2>Something went wrong.</h2>
                <p>Please check the Flask server and try again.</p>
            </div>
        `;
    }
});

function formatContent(content) {
    if (Array.isArray(content)) {
        return `
            <ul>
                ${content.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
    }

    if (typeof content === "object") {
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
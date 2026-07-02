from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_design_document():
    data = request.get_json()
    idea = data.get("idea", "A new product idea")

    placeholder_result = {
        "Design Brief": f"Create an industrial design concept based on: {idea}. The goal is to develop a useful, human-centered, and visually refined product.",
        "Target User": "Students, young professionals, and design-conscious users who need practical and aesthetically pleasing solutions.",
        "User Pain Points": [
            "Existing products feel generic or difficult to use.",
            "Users want solutions that save time and reduce friction.",
            "Many products lack emotional value or clear visual identity."
        ],
        "Persona": "Minji, 24, product design student. She values simplicity, portability, sustainability, and products that fit naturally into her daily routine.",
        "Market Research": "The market shows increasing demand for compact, smart, sustainable, and lifestyle-oriented products with strong visual storytelling.",
        "SWOT Analysis": {
            "Strengths": "Clear design direction, practical use case, and flexible concept potential.",
            "Weaknesses": "Needs further validation with real users and market data.",
            "Opportunities": "Can be positioned for students, compact living, sustainable design, or design competitions.",
            "Threats": "Similar products may already exist, so differentiation must be clear."
        },
        "Design Keywords": [
            "Minimal",
            "Human-centered",
            "Portable",
            "Sustainable",
            "Soft technology",
            "Modern lifestyle"
        ],
        "CMF Suggestions": {
            "Color": "Warm white, soft gray, muted blue, or natural green.",
            "Material": "Recycled plastic, brushed aluminum, fabric texture, or bio-based material.",
            "Finish": "Matte finish with subtle texture for a premium and approachable feel."
        },
        "Product Concept": f"A refined product concept inspired by '{idea}', combining usability, emotional value, and modern industrial design language.",
        "Rendering Prompt": f"Professional industrial design rendering of {idea}, minimal modern style, soft lighting, high-quality product visualization, neutral background, realistic materials.",
        "Presentation Script": "This project proposes a human-centered product concept that responds to real user needs through practical function, clean aesthetics, and thoughtful material choices."
    }

    return jsonify(placeholder_result)


if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, jsonify, render_template, request

from design_generator import generate_placeholder_design_document

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_design_document():
    data = request.get_json()
    idea = data.get("idea", "").strip()
    project_type = data.get("project_type", "Product Idea").strip()

    result = generate_placeholder_design_document(idea, project_type)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
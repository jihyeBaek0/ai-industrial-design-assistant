from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return """
    <h1>AI Industrial Design Assistant</h1>
    <p>Generate professional industrial design documents with AI.</p>
    <p>Flask server is running successfully.</p>
    """


if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import openai
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = api_key

@app.route("/", methods=["GET"])
@app.route("/index", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text")
    style = data.get("style")
    
    # Prepare the messages for the ChatCompletion API
    messages = [
        {"role": "system", "content": "You are a helpful assistant that translates Norwegian Bokmål to Norwegian Nynorsk."},
        {"role": "user", "content": f"Translate the following text to Nynorsk: {text}"}
    ]
    
    # Call the OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0,
        max_tokens=256
    )
    
    result = response['choices'][0]['message']['content'].strip()
    
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)

# AI Code Helper

> An AI-powered web app that helps developers understand, improve, and debug their code in real-time.

---

## 🚀 Features

- 🧠 **AI Code Analysis** – Get explanations, optimizations, and bug detection.
- 💻 **Multi-Language Support** – Supports Python, JavaScript, Java, and C++.
- 🎨 **Code Editor** – Syntax highlighting using Monaco/CodeMirror.
- 📋 **Copy & Download** – Copy or export AI suggestions in one click.
- ⚙️ **Optional Enhancements** – Dark/light mode, GitHub Gist integration, code history.

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, CodeMirror/Monaco Editor |
| **Backend** | Node.js + Express |
| **AI Integration** | OpenAI API / Hugging Face models |
| **Containerization** | Docker |
| **Styling** | Tailwind CSS or Material UI |

---

## 🔄 How It Works

1. Select programming language.  
2. Paste or type your code snippet.  
3. Click **Analyze Code**.  
4. AI returns explanation, suggestions, and bug hints.  
5. Copy or download results.

---

## 🛠️ Setup Instructions

```bash
# Clone repository
git clone https://github.com/<your-username>/ai-code-helper.git
cd ai-code-helper

# Install frontend dependencies
cd frontend
npm install
npm start

# Install backend dependencies
cd ../backend
npm install
npm run dev

#Docker
docker-compose up --build


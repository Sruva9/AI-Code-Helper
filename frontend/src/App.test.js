import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import { FiCopy, FiDownload } from "react-icons/fi";
import axios from "axios";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(true);

  // ✅ Backend URL
  const BACKEND_URL = "http://localhost:5000/api/analyze";

  // 🧠 Function to call backend
  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("⚠️ Please enter some code first!");
      return;
    }

    setLoading(true);
    setAiResponse("");
    setError("");

    try {
      const response = await axios.post(BACKEND_URL, { code, language });

      if (response.data.output) {
        setAiResponse(response.data.output);
      } else {
        setError("⚠️ No response received from AI backend.");
      }
    } catch (err) {
      console.error("Error analyzing code:", err);
      setError("❌ Failed to connect to AI backend. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy to clipboard
  const copyToClipboard = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    alert("✅ Copied to clipboard!");
  };

  // 💾 Download AI output
  const downloadResponse = () => {
    if (!aiResponse) return;
    const blob = new Blob([aiResponse], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Suggestions.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`transition-colors duration-300 min-h-screen p-6 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 🌟 Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">🤖 AI Code Helper</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`px-4 py-2 rounded-full transition-colors ${
              isDark ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-300 hover:bg-purple-400"
            }`}
          >
            {isDark ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-1 text-black"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Code Editor */}
          <div className="flex-1 flex flex-col p-4 rounded-xl shadow-lg bg-opacity-80 bg-purple-800">
            <CodeEditor language={language} code={code} setCode={setCode} isDark={isDark} />
            <button
              onClick={analyzeCode}
              disabled={loading}
              className={`mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
              hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg 
              shadow-md transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Analyzing..." : "Analyze Code"}
            </button>
          </div>

          {/* Right: AI Output */}
          <div
            className={`flex-1 flex flex-col rounded-xl shadow-lg border ${
              isDark ? "bg-purple-900 border-purple-600" : "bg-purple-200 border-purple-400"
            }`}
          >
            <div className="px-4 py-2 font-bold text-white bg-gradient-to-r from-pink-500 to-purple-700">
              AI Suggestions
            </div>
            <div className="p-4 flex-1 overflow-auto font-mono whitespace-pre-wrap">
              {error ? (
                <div className="text-red-400 font-semibold">{error}</div>
              ) : aiResponse ? (
                aiResponse
              ) : (
                "💡 AI suggestions will appear here after you click 'Analyze Code'."
              )}
            </div>
            {aiResponse && (
              <div className="p-4 flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center p-2 bg-green-500 rounded hover:bg-green-600 shadow-md"
                  title="Copy"
                >
                  <FiCopy size={20} />
                </button>
                <button
                  onClick={downloadResponse}
                  className="flex items-center justify-center p-2 bg-yellow-500 rounded hover:bg-yellow-600 shadow-md"
                  title="Download"
                >
                  <FiDownload size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

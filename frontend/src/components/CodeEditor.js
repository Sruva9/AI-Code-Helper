import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

function CodeEditor({ language, code, setCode, isDark }) {
  const extensions = {
    javascript: [javascript()],
    python: [python()],
    cpp: [cpp()],
    java: [java()],
  };

  return (
    <CodeMirror
      value={code}
      height="400px"
      theme={isDark ? dracula : "light"}
      extensions={extensions[language]}
      onChange={(value) => setCode(value)}
    />
  );
}

export default CodeEditor;

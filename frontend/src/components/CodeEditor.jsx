import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from "@uiw/codemirror-theme-github";


function CodeEditor({ language, code, setCode, isDark }) {
  let extensions = [];

  if (language === "javascript") extensions = [javascript()];
  else if (language === "python") extensions = [python()];
  else if (language === "java") extensions = [java()];
  else if (language === "cpp") extensions = [cpp()];

  return (
    <div style={{ border: "1px solid #444", borderRadius: "6px"}}>
      <CodeMirror
        value={code}
        height="400px"
        extensions={extensions}
        theme={isDark ? vscodeDark : githubLight}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}

export default CodeEditor;

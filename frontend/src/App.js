import React from "react";
import "@/App.css";
import "@/index.css";
import { Toaster } from "sonner";
import Landing from "@/components/Landing";

function App() {
  return (
    <div className="App">
      <Landing />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#181410",
            border: "1px solid rgba(212,114,10,0.35)",
            color: "#FAFAF8",
          },
        }}
      />
    </div>
  );
}

export default App;

import { useState } from "react";
import { analyzeRepo } from "../api/analyze";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const res = await analyzeRepo(url);
    setResult(res);
  };

  return (
    <div>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="GitHub repo URL" />
      <button onClick={handleAnalyze}>Analyze</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

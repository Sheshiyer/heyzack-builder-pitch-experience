Model aliases and triggers

Aliases:
- gemini -> google/gemini-3-flash-preview
- grok -> x-ai/grok-4.1-fast
- kimi -> moonshotai/kimi-k2-thinking

Detection rules:
- If the user says "use gemini" or "use google" -> gemini
- If the user says "use grok" or "use x-ai" -> grok
- If the user says "use kimi" or "use moonshot" -> kimi
- If multiple are mentioned, ask which to prefer

Model hint insertion (optional):
- Add a short line near the top of the prompt: "Model preference: <alias>"
- If XML-only output is required, keep the hint inside the meta prompt rather than as plain text

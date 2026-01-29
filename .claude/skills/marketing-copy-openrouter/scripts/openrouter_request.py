#!/usr/bin/env python3
import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error

DEFAULT_MODELS = [
    "google/gemini-3-flash-preview",
    "x-ai/grok-4.1-fast",
    "moonshotai/kimi-k2-thinking",
]

ALIASES = {
    "gemini": "google/gemini-3-flash-preview",
    "grok": "x-ai/grok-4.1-fast",
    "kimi": "moonshotai/kimi-k2-thinking",
}

ALIAS_PATTERN = re.compile(r"\b(use|model)\s*[:=]?\s*(gemini|grok|kimi)\b", re.IGNORECASE)


def read_input(path):
    if path:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return sys.stdin.read()


def detect_alias(text):
    match = ALIAS_PATTERN.search(text)
    if not match:
        return None
    return match.group(2).lower()


def insert_model_hint(prompt, hint):
    if not hint:
        return prompt
    if "<meta_prompt" in prompt:
        idx = prompt.find(">")
        if idx != -1:
            return prompt[: idx + 1] + "\n  <model_hint>" + hint + "</model_hint>" + prompt[idx + 1 :]
    return "Model preference: " + hint + "\n" + prompt


def build_payload(model, prompt, temperature, max_tokens, top_p):
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt},
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
        "top_p": top_p,
    }
    return payload


def openrouter_request(payload, api_key):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": "Bearer " + api_key,
        "Content-Type": "application/json",
    }
    referer = os.getenv("OPENROUTER_REFERER")
    title = os.getenv("OPENROUTER_APP_TITLE")
    if referer:
        headers["HTTP-Referer"] = referer
    if title:
        headers["X-Title"] = title

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8")


def main():
    parser = argparse.ArgumentParser(description="Call OpenRouter chat completions with a prompt.")
    parser.add_argument("--input", help="Path to prompt file. If omitted, reads stdin.")
    parser.add_argument("--output", help="Write response content to this file.")
    parser.add_argument("--model", help="Explicit model id to use.")
    parser.add_argument("--model-alias", choices=sorted(ALIASES.keys()), help="Use a model alias.")
    parser.add_argument("--auto-model-from-text", action="store_true", help="Detect model alias in the prompt text.")
    parser.add_argument("--include-model-in-prompt", action="store_true", help="Insert the model hint into the prompt.")
    parser.add_argument("--temperature", type=float, default=0.4)
    parser.add_argument("--max-tokens", type=int, default=1400)
    parser.add_argument("--top-p", type=float, default=0.9)
    parser.add_argument("--dry-run", action="store_true", help="Print payload and exit without sending.")

    args = parser.parse_args()

    prompt = read_input(args.input)

    alias = None
    if args.model_alias:
        alias = args.model_alias
    elif args.auto_model_from_text:
        alias = detect_alias(prompt)

    if args.model:
        models = [args.model]
    elif alias:
        models = [ALIASES[alias]]
    else:
        models = list(DEFAULT_MODELS)

    model_hint = None
    if args.model:
        model_hint = args.model
    elif alias:
        model_hint = alias

    if args.include_model_in_prompt:
        prompt = insert_model_hint(prompt, model_hint)

    payload = build_payload(models[0], prompt, args.temperature, args.max_tokens, args.top_p)

    if args.dry_run:
        out = {
            "selected_model": models[0],
            "fallback_models": models[1:],
            "payload": payload,
        }
        sys.stdout.write(json.dumps(out, indent=2))
        sys.stdout.write("\n")
        return 0

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        sys.stderr.write("OPENROUTER_API_KEY is not set.\n")
        return 2

    last_error = None
    for model in models:
        payload["model"] = model
        try:
            raw = openrouter_request(payload, api_key)
            data = json.loads(raw)
            choices = data.get("choices", [])
            if not choices:
                raise RuntimeError("No choices returned")
            content = choices[0].get("message", {}).get("content", "")
            if args.output:
                with open(args.output, "w", encoding="utf-8") as f:
                    f.write(content)
            else:
                sys.stdout.write(content)
                if not content.endswith("\n"):
                    sys.stdout.write("\n")
            return 0
        except Exception as exc:
            last_error = exc
            continue

    sys.stderr.write("All models failed. Last error: %s\n" % last_error)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

---
name: marketing-copy-openrouter
description: Create or update marketing copy/persona outputs using OpenRouter models with a strict XML meta-prompt schema, assumption labeling, and Apple-like concise tone. Use when a user wants marketing copy or personas generated/updated via OpenRouter, or explicitly mentions gemini, grok, kimi, or OpenRouter model selection.
---
# Marketing Copy + Persona (OpenRouter)

## Inputs to confirm

- Product source: `product.md` (new product) or a JSON file (established brand)
- Update mode: `delta` (edit only changed sections) or `overhaul` (regenerate)
- Model preference: gemini/grok/kimi, or default chain
- Prompt hint: whether to include the model name in the prompt
- Output path: write XML to a file in the working folder or print to stdout

## Model selection

Default order:
1. `google/gemini-3-flash-preview`
2. `x-ai/grok-4.1-fast`
3. `moonshotai/kimi-k2-thinking`

If the user says "use gemini", "use grok", or "use kimi", select that model. If they mention a model in a meta prompt, prefer it. If `include model in prompt` is enabled, insert a short model hint at the top of the prompt (see `references/meta_prompt_template.xml`).

## Workflow

1. **Locate inputs**
   - If `product.md` exists in the working folder, use it.
   - If a JSON file exists (or is provided), use it for established brands.
   - If both exist, ask which is the source of truth.

2. **Decide update mode**
   - `delta`: keep the same XML structure, update only impacted nodes.
   - `overhaul`: regenerate all sections.

3. **Build the meta prompt**
   - Start from `references/meta_prompt_template.xml`.
   - Fill in persona, audience, voice, goals, and constraints.
   - Enforce: no unverifiable claims, assumptions labeled, no hidden reasoning, XML-only output.

4. **Run OpenRouter**
   - Use `scripts/openrouter_request.py` for a single call.
   - If the call fails, retry with fallbacks in order.

5. **Validate output**
   - Ensure XML-only output.
   - Confirm the 4 sections exist: `product_name_analysis`, `implied_specs`, `features_benefits`, `rewritten_original_prompt`.
   - Verify exactly 5 features/benefits items.
   - Verify assumptions are labeled and no unsupported claims.

## Script usage

Example:

```bash
python3 scripts/openrouter_request.py \
  --input prompt.xml \
  --include-model-in-prompt \
  --output result.xml
```

- Use `--model` to force a specific model ID.
- Use `--auto-model-from-text` to detect "use gemini/grok/kimi" inside the prompt.
- Use `--dry-run` to print the payload without sending a request.

## References

- `references/meta_prompt_template.xml` - XML meta-prompt skeleton
- `references/xml_schema_template.xml` - output schema and checklist
- `references/model_aliases.md` - aliases and detection rules

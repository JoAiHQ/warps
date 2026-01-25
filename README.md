# JoAi Warps

Open-source warp definitions and brand metadata for JoAi.

## Structure
- `warps/` — warp JSON files
- `brands/` — brand definitions used by warps
- `abis/` — contract ABIs referenced by warps
- `registry.ts`, `globals.ts` — shared metadata used by tooling
- `skills/` — internal skill guides for creating warps
- `playground/` — lightweight local inspection utilities

## Playground
Inspect a warp file:

```bash
node playground/inspect.js warps/resend/send-email.json
```

## Publishing
Publishing/sync tooling lives in the private `joai--warps-publisher` repository.

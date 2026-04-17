# Agent Automation Guidelines: Billing & Subscription

## Testing Billing Flow (Devnet)
**Target URL**: `https://devnet.joai.ai`
**Test User**: `apptester@vleap.ai` (Magic Link Login)

### Automation Steps
1.  **Login**: Use email only. No password required. Verify dashboard loads.
2.  **Navigation**:
    *   **Billing**: `Settings -> Usage` or "Upgrade plan" button.
    *   **Wallet**: Top nav wallet icon (Solana Devnet).
3.  **Topping Up**:
    *   Click "Buy extra usage".
    *   Complete billing form (Name, Address, etc.) if prompted.
    *   Select Payment Gateway (LemonSqueezy/Crypto).
4.  **Subscribing**:
    *   Click "Upgrade plan" or "Unlock now".
    *   Select Tier (Weekly/Monthly/Yearly).
    *   Select Payment Gateway.

### Key Selectors & IDs
*   **Login Email Input**: `input[type="email"]`
*   **Magic Link Button**: Text comparison "Send Magic Login Link"
*   **Upgrade Button**: Text comparison "Upgrade plan"
*   **Save Billing Info**: Text comparison "Save"

### Verified Constraints
*   **Devnet**: Payments require test credentials (not fully automated without them).
*   **Form Persistence**: Billing info saves correctly.

## German Localization

- Never use formal "Sie/Ihre" in German translations. Always use informal "du/dein" (lowercase) or rephrase to avoid the pronoun entirely.
- Lowercase "sie/ihre" referring to things (not users) is fine — e.g. "einer Transaktion anhand ihres Hashes" (its hash).

## Generated Files — Never Commit Manually

The following files are produced by GitHub Actions and must never be committed by hand. Always leave them out of your commits — CI rebuilds and updates them on every push:

- `**/chatapp.dist.html` — built from the MCP app source (`index.tsx`, components) by the warps build pipeline.
- `**/warp.types.ts` — auto-generated TypeScript types per warp.
- `catalog/**` — `manifest.json`, `delta.json`, `distribution.json` for every chain env are produced by the catalog sync workflow. **Never run `npm run catalog:build` locally** — it requires CI environment variables and will fail. Push the warp JSON changes and CI handles the rest.

If you see any of these in `git status` after editing source files, reset or unstage them before committing. Only commit the source files (e.g. `warp.json`, `index.tsx`, component files, `meta.ts`, `brand.ts`).

## When Creating or Updating Warps

Every warp must meet these requirements before it can be considered complete:

### 1. Warp JSON — Descriptions

- The `description` field must be 2-3 sentences, optimized for SEO and LLM search discoverability.
- Include relevant keywords naturally — mention the brand/service name, what the action does, and who benefits.
- If a description is only 1 short sentence, it is not ready — expand it.
- All descriptions must have both `en` and `de` translations.
- German translations must sound natural (informal "du" form, not robotic/literal). See the German Localization section.
- Never expose the internal term "warp" in user-facing text. Users know these as "actions".

### 2. Surfacing Response Data

- If the response contains data the user needs (IDs, URLs, codes), map it via `output` and surface it in `messages.success` using `{{VAR}}` — never via the `bot` field.
- `bot` is strictly for LLM guidance on when/how to invoke the warp.

### 3. meta.ts — SEO Extras (Required)

Every brand that has warps must have a `meta.ts` file in its directory. When adding or updating warps, always update the corresponding `meta.ts`.

The file exports SEO extras per warp, keyed by warp filename (without `.json`) or subdirectory name:

```ts
import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'warp-name': {
    keywords: {
      en: ['relevant search term', 'another keyword'],
      de: ['relevanter Suchbegriff', 'weiteres Keyword'],
    },
    useCases: {
      en: ['Specific scenario 1', 'Specific scenario 2', 'Specific scenario 3'],
      de: ['Spezifisches Szenario 1', 'Spezifisches Szenario 2', 'Spezifisches Szenario 3'],
    },
    category: 'productivity',
    faq: {
      en: [
        { question: 'A real question users would ask?', answer: 'Concise 1-2 sentence answer.' },
      ],
      de: [
        { question: 'Eine echte Frage, die Nutzer stellen würden?', answer: 'Knappe Antwort in 1-2 Sätzen.' },
      ],
    },
  },
}
```

**Field requirements:**

- `keywords`: relevant search terms users would type. Include brand name, action name, and related terms. Both `en` and `de`.
- `useCases`: 3-4 short, specific scenario strings describing who benefits or what can be done. Not generic platitudes — be concrete. Both `en` and `de`.
- `category`: exactly one of: `'productivity'`, `'communication'`, `'developer'`, `'defi'`, `'staking'`, `'nft'`, `'analytics'`, `'commerce'`, `'social'`, `'security'`, `'infrastructure'`.
- `faq`: 2-3 question/answer pairs per warp. Questions should be things users actually search for. Answers must be concise (1-2 sentences). Both `en` and `de`.

**Content rules:**

- Never reference internal identifiers, technical names, or the word "warp" in any user-facing text.
- German translations must be natural and fluent — not word-for-word translations. Use informal "du" form.
- Keywords should include terms in the user's language, not just English terms translated literally. German crypto/tech terms often stay in English (e.g. "staken", "swappen", "DEX").
- FAQ answers should describe what the user can do, not how the system works internally.

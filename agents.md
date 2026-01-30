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

# Frontend Multi-Facility Authentication & First-Login Guide

> **Next.js App Router · TypeScript · TanStack Query · Zod · Tailwind CSS**  
> Companion guide to the backend multi-facility architecture blueprint.

---

## 1. Overview of the Frontend Implementation

The frontend integrates with the backend's multi-facility architecture across three core user flows:
1. **First-Time Login Redirection & Password Setup** (`/auth/first-login-password-change`)
2. **Active Facility Context & Dynamic Switching** (`<FacilitySwitcher />`)
3. **Session Refresh with Facility Scoping** (`authService.refreshToken()`)

---

## 2. Core Flows & Frontend Patterns

### A. First-Time Login Password Change

#### How It Works
1. Upon logging in via `useLogin()` (`features/auth/hook/use-auth.ts`), the API returns:
   ```json
   {
     "accessToken": "...",
     "mustChangePassword": true,
     "role": "SUPER_ADMIN_ROLE",
     "facilityId": "3fafffbb-05ac-4999-9403-914062d4d540",
     "facilityName": "Korle Bu Teaching Hospital",
     "canSelectFacility": true
   }
   ```
2. The hook detects `mustChangePassword === true`, saves the tokens, and immediately redirects the user to:
   `/auth/first-login-password-change`
3. On that page, [`FirstLoginPasswordChangeForm`](../features/auth/components/first-login-password-change-form.tsx) presents the user with:
   - Their active profile badge (name, role, facility)
   - Real-time password criteria checklist (8+ chars, upper, lower, number, symbol)
   - Inputs for **New Password** and **Confirm Password** only (no current password needed)
4. Submitting calls `POST /api/v1/auth/first-login-password-change` with:
   ```json
   {
     "newPassword": "...",
     "confirmPassword": "..."
   }
   ```
5. On success, `mustChangePassword` is set to `false`, tokens are refreshed in `localStorage`, and the user is routed to `/dashboard`.

---

### B. Facility Switcher Component

Located at [`features/facility/components/facility-switcher.tsx`](../features/facility/components/facility-switcher.tsx).

It provides a dual visual mode based on the user's role:
- **Single-Facility Users** (`canSelectFacility === false`):
  Renders a locked badge showing their assigned hospital (e.g. `Korle Bu Teaching Hospital (KBTH001)`).
- **System Super Admin** (`canSelectFacility === true`):
  Renders an interactive dropdown menu listing all available facilities in Ghana.
  Selecting a facility triggers `useSelectFacility()`:
  - Invokes `POST /api/v1/auth/select-facility` with `{ facilityId }`.
  - Re-saves updated JWT tokens (which now carry the new `facilityId` claim).
  - Triggers a soft reload or query invalidation to refresh dashboard metrics for the chosen hospital.

---

### C. JWT Storage & Axios Interceptor

In [`lib/auth.ts`](../lib/auth.ts) and [`lib/axios.ts`](../lib/axios.ts):
- `getCurrentUser()`: Extracts user metadata and facility details from `localStorage`.
- Request Interceptor: Appends `Authorization: Bearer <accessToken>` to every outgoing request.
- 401 Interceptor: If an access token expires, automatically calls `authService.refreshToken()` to obtain a new pair without losing the currently selected facility context.

---

## 3. Key Files Reference

| File | Purpose |
|---|---|
| [`lib/api-routes.ts`](../lib/api-routes.ts) | Centralized endpoint paths (`FIRST_LOGIN_PASSWORD_CHANGE`, `SELECT_FACILITY`) |
| [`features/auth/types/login-response.ts`](../features/auth/types/login-response.ts) | TypeScript interfaces for `LoginResponse`, `AccessibleFacility`, and requests |
| [`features/auth/api/auth.service.ts`](../features/auth/api/auth.service.ts) | API call wrappers for login, switch facility, and first login change |
| [`features/auth/hook/use-auth.ts`](../features/auth/hook/use-auth.ts) | React Query hooks (`useLogin`, `useFirstLoginPasswordChange`, `useSelectFacility`) |
| [`features/auth/components/first-login-password-change-form.tsx`](../features/auth/components/first-login-password-change-form.tsx) | Password setup form with real-time validation |
| [`app/auth/first-login-password-change/page.tsx`](../app/auth/first-login-password-change/page.tsx) | Route page for first-time password setup |
| [`features/facility/components/facility-switcher.tsx`](../features/facility/components/facility-switcher.tsx) | Dual-mode facility indicator/switcher in the top navbar |
| [`features/layout/app-navbar.tsx`](../features/layout/app-navbar.tsx) | Top navigation bar integrating facility switcher and role badges |

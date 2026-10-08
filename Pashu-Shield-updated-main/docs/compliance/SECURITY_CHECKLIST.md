# SECURITY_CHECKLIST (GIGW 3.0 §5.3, GuDApps auth, CERT-In) — status 07/10/2026
Static review only; no penetration test, no dependency scan was run in this environment.

| ID | Control | Status | Evidence / gap |
|---|---|---|---|
| S-01 | HTTPS + HSTS | Done in config | `vercel.json` `Strict-Transport-Security` (verify on deployment) |
| S-02 | X-Content-Type-Options, frame-ancestors, Referrer-Policy, Permissions-Policy | Done | `vercel.json`; CSP `frame-ancestors 'none'` enforced |
| S-03 | CORP header | Done in config | `Cross-Origin-Resource-Policy: same-site` |
| S-04 | `/.well-known/security.txt` | Done, placeholders | needs real contact (PLACEHOLDERS.md) |
| S-05 | Strict CSP (script-src) | Gap | Report-Only policy shipped; blocked by 120+ inline handlers and unpkg Leaflet; self-host Leaflet and replace handlers, then enforce |
| S-06 | Secure/HttpOnly/SameSite cookies, CSRF | **Gap** | Bearer token kept in `localStorage` (readable by XSS). Needs backend session redesign (D-22) |
| S-07 | No demo credentials / debug endpoints in production | **Gap** | Demo-access card is visible by design (owner decision); backend debug endpoints not audited |
| S-08 | OTP expiry, attempt limit, resend cool-down, generic errors, masked phone | Existing, not re-tested | Per Phase 0 review of backend and tests; run backend suite in CI |
| S-09 | Server-enforced RBAC | Existing, not re-tested | Router roles are client-side; server checks not audited here |
| S-10 | Session-timeout warning with extension; secure logout | Not built | Roadmap |
| S-11 | Input/output sanitising, parameterised queries | Partly verified | `tests/xss_escaping.test.mjs` passes; SQL not audited |
| S-12 | Upload type/size checks + malware-scan hook | Not audited | Roadmap |
| S-13 | No secrets in bundle/repo | Gap | Phone number in `render.yaml`, `animal_health.db` committed (AUDIT_BEFORE §5) |
| S-14 | Dependency audit for "Safe to Host" | Configured | CI step `pip-audit`; result not yet recorded |
| S-15 | Shared validators client/server, Aadhaar Verhoeff, masked, never logged/URL | Done (code) | `validators.js`, `backend/validators.py`, identical vectors; not yet wired into every form |
| S-16 | NSSO / MeriPehchaan SSO | Roadmap | Only for an officially government-run deployment |
| S-17 | Data stored in India, deletion when not needed | Not verified | Hosting region of Render/Vercel not confirmed |

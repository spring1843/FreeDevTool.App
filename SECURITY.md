# Security and Privacy Policy for FreeDevTool.App

## Our Core Philosophy: User Data Stays on Your Device

FreeDevTool.App is designed as a secure, offline tool for everyday development tasks. We address the common pitfalls of online tools—such as privacy risks and untrustworthy data handling—by ensuring all processing occurs entirely within your browser. No user data ever leaves your device, and the application operates without any server-side dependencies or external communications after initial loading.

## Security Tenets

- **Offline Processing**: All computations, data manipulations, and tool executions happen locally in your browser using JavaScript. The app is a standalone front-end with no back-end infrastructure.
- **Data Flow**: We serve static assets (e.g., HTML, CSS, JS) from our servers during the initial page load, but no data is ever sent back. No API calls, dynamic requests, or external scripts are loaded at runtime.
- **No Tracking or Analytics**: We do not use cookies, local storage for tracking purposes, or any form of user monitoring. If local storage is used (e.g., for user preferences like theme settings), it is optional, transparent, and fully under your control.
- **Open Source Transparency**: The entire codebase is open source, hosted on a public [Github repo](https://github.com/spring1843/freedevtool.app/), allowing public inspection, contributions, and independent audits. We encourage community reviews to verify our claims.
- **No Monetization Intrusions**: FreeDevTool.App is and will remain completely free. We will never display advertisements. In the future, we may accept non-intrusive sponsorships (e.g., a simple "Sponsored by" mention), but these will not involve tracking or data collection.

## Strict CSP (Content Security Policy)

We [apply](https://github.com/spring1843/FreeDevTool.App/blob/68053bd519fada6f3d7fca5b5c4533ac0a65bc1a/client/index.html#L11) a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) in all out pages that ensures at browser level that:

* No external scripts can be loaded
* No outbound calls can be made

## Guarantees for the Future

We commit to maintaining these standards indefinitely. Specifically:
- No external scripts or third-party libraries will be loaded dynamically.
- No data will ever be transmitted to our servers or any external entities.
- No cookies or persistent tracking mechanisms will be implemented.
- No user tracking, profiling, or analytics will be added.
- The app will remain a pure, offline front-end with no back-end evolution.
- No API integrations or outbound network calls will be introduced.
- The tool will always be free of charge.
- The tool can always be downloaded and served locally or behind firewalls.
- It will stay open source for community oversight and improvements.
- Any potential sponsorships will be vetted to ensure they align with our privacy ethos.

If circumstances require changes to this policy (e.g., due to legal requirements), we will notify users prominently on the app's homepage and repository at least 30 days in advance, providing a rationale and migration options.

## Contact Us

If you have questions, suggestions, or concerns about our security practices, reach out via [Github Issues](https://github.com/spring1843/FreeDevTool.App/issues). We're committed to continuous improvement while upholding our privacy-first mission.

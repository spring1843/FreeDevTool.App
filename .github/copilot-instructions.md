FreeDevTool.App – Copilot Coding Agent Onboarding

Purpose
- Help agents contribute safely and efficiently with minimal friction and green CI.
- Keep changes clean, small, and aligned with project standards.

What this app is
- FreeDevTool.App is a stand-alone web app offering developer/productivity utilities.
- No network calls after load; treat it as an offline SPA. Do not add telemetry or remote calls.
- Built with Vite. There is no backend aside from SEO helpers provided by Vite.
- See README.md for details.

How to build, test, and verify locally
- Fresh setup: make deps
- Build for production: make build
- Full CI checks (lint, typecheck, tests, build, etc.): make ci
- Always ensure make ci passes before proposing changes.

Project layout hints
- Makefile contains all commands for install, build, lint, tests, and CI checks. Do not add raw shell in workflows; add/update Makefile targets instead.
- The app is packaged via make build. Production readiness checks run via make ci.
- Review docs first: README.md, CONTRIBUTING.md, STYLE.md, Makefile, and other docs.

Coding guidelines
- Follow STYLE.md strictly (naming, formatting, folder structure, imports, testing approach).
- Prefer small, focused PRs. Keep diffs minimal and avoid churn.
- Reuse existing utilities/components/hooks. Do not duplicate logic; refactor shared code where helpful.
- Maintain strong typing and avoid any. Add/adjust types as needed.
- Keep components simple, composable, and accessible. Avoid hidden side-effects.
- Respect the app’s offline constraint. Do not introduce network I/O or background syncing.
- Keep browser compatibility aligned with existing tooling and configs.

Dependencies
- Minimize new dependencies. Justify additions clearly and prefer lightweight, well-maintained packages.
- Use make deps to manage installs. If adding a dep, ensure lockfiles are updated and CI remains green.
- Avoid adding tooling that duplicates what the Makefile/CI already covers.

Testing and quality
- Run make ci locally before proposing changes.
- Add/maintain tests when changing logic. Keep coverage consistent with repo standards.
- Fix lint/type errors rather than suppressing. If suppression is necessary, keep it scoped and documented.

Performance and UX
- Avoid unnecessary re-renders and heavy runtime work.
- Defer non-critical work and keep bundles lean. Prefer code-splitting where it makes sense.
- Maintain consistent styling and theming. Follow existing design system and components.

Security and privacy
- No outbound requests. Do not introduce analytics, CDNs for runtime data, or feature flags that call home.
- Validate and sanitize user inputs where relevant within the app’s utilities.

PR readiness checklist (pre-submit)
- Code adheres to STYLE.md.
- make ci passes locally.
- No hard-coded paths, secrets, or environment assumptions.
- Only Makefile commands are used in docs/scripts; no raw bash in workflows.
- Changes are minimal, reversible, and documented in code comments where non-obvious.

First steps for a new task
- Inventory the codebase and read: README.md, CONTRIBUTING.md, STYLE.md, Makefile, and any related docs in the feature area.
- Identify existing components/utilities to reuse.
- Plan the minimal change set needed to meet goals while keeping CI green.
- Implement, test locally via make ci, and prepare a concise PR.

Contact points
- Refer to repo docs and issues for conventions and decisions. If ambiguity exists, align with STYLE.md and existing patterns.

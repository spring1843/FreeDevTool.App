# replit.md

## Overview

is a web-based collection of 49+ open-source, free, and completely offline developer tools. It offers a wide range of utilities including converters, formatters, encoders, text tools, timing utilities, financial calculators, hardware tests, and generators. Designed with privacy in mind, all processing occurs locally without network dependencies, making it suitable for sensitive business environments and air-gapped systems.

## User Preferences

Preferred communication style: Simple, everyday language.
Theme preferences: Smooth theme transitions with local storage persistence, respecting browser/OS theme selection by default, falling back to light mode when system preference unavailable.
Timezone behavior: All time-related tools should default to the user's local timezone instead of UTC for better user experience.
Mobile sidebar behavior: Sidebar should be hidden by default on mobile devices, with hamburger menu available for navigation on all screen sizes.
Build system preferences: Use make targets instead of npm commands for all development, testing, and release operations (e.g., `make deps` instead of `npm install`, `make start` instead of `npm run dev`).
Quality assurance: Always run `make ci-without-e2e` after making changes to ensure no regressions were introduced.
Code quality: React Hook dependency rules configured as errors (not warnings) to enforce strict patterns and prevent runtime bugs.
Formatting standards: Industry-standard code formatting using Prettier for all major web development languages/formats (JavaScript, TypeScript, HTML, CSS, SCSS, LESS, JSON, JSONC, YAML, Markdown, GraphQL) with async support and comprehensive error handling.

## System Architecture

### Frontend Architecture

The client-side application is built with React and TypeScript, leveraging a modern component-based architecture. It uses shadcn/ui components (based on Radix UI) for consistent design and Tailwind CSS for styling. It supports both light and dark themes with system preference detection.

**Key Frontend Decisions:**

- **Routing**: `wouter` for lightweight client-side routing.
- **State Management**: React's built-in hooks (`useState`, `useEffect`).
- **UI Components**: Radix UI primitives with shadcn/ui.
- **Styling**: Tailwind CSS with custom CSS variables for theming, 0.3s transitions, and local storage persistence.
- **Code Editor**: Simple CodeEditor component with copy functionality. Standardized textarea components across all tools provide character count and disabled word wrapping for consistent user experience.
- **Navigation**: Contextual sidebar behavior - visible by default on homepage desktop view, hidden on mobile devices and tool pages. Hamburger menu available on all screen sizes via Ctrl+M shortcut. Blue FD logo toggles sidebar, text logo links to homepage.

### Backend Architecture

The server-side is a minimal Node.js Express application with TypeScript, providing a basic REST API foundation for future development. It is intentionally lightweight as the application primarily focuses on client-side processing.

**Key Backend Decisions:**

- **Framework**: Express.js for simplicity.
- **Development**: Vite integration for HMR.
- **Error Handling**: Basic middleware for logging and structured responses.

### Data Storage Solutions

The application operates entirely client-side without persistent data storage, focusing on real-time tool computations and browser-based processing.

**Storage Architecture:**

- **Client-Side Only**: All data processing occurs in the browser with no server persistence.
- **Privacy-First**: No data transmitted to servers, ensuring complete privacy and security.
- **Offline Capability**: Full functionality without network dependencies.

### Authentication and Authorization

The application operates without authentication requirements as all tools function offline and require no user accounts or data persistence.

### Key Technical Implementations

**Offline-First Design:**

- All external dependencies replaced with local JavaScript libraries.
- Content Security Policy prevents external resource loading.
- System fonts used exclusively.

**Tool Architecture:**

- Unified tool layout with consistent error handling and validation.
- URL sharing for state persistence.
- Demo system with automated tours, pause/resume, and 5 speed options (Slow, Normal, Fast, Very Fast, Crazy Fast) available in both homepage controls and layout dropdown during demo playback.
- Comprehensive time tools: Universal keyboard shortcuts (Enter, Space, Escape), auto-start with engaging defaults, contextual quick-access buttons, and maximum precision.
- Keyboard shortcuts: All tool shortcuts use only Ctrl key (never CMD/Meta) to avoid overriding browser behavior on Mac.
- Date converter redesigned with 20 practical, internationally recognized formats categorized for enhanced UX, including auto-detection of input formats.
- Enhanced RichTextarea component: Word wrap enabled by default with toggle, copy functionality, line numbers (no-wrap mode only), adjustable sizing, and integrated controls bar.
- Industry-standard code formatting using Prettier integration across all major web development formats (HTML, JSON, JSONC, CSS, YAML, Markdown, LESS, JavaScript, TypeScript, SCSS, GraphQL) with async support and custom fallback mechanisms.
- Centralized defaults system: All tool default values consolidated into `client/src/data/defaults.ts` package, providing consistent defaults across 22+ tools including formatters, converters, encoders, and text tools for better maintainability and easier modification.

**Performance Optimizations:**

- Debounced input handling.
- Lazy loading of tool components.
- Optimized JavaScript bundle (1.3MB, 352KB gzipped) with tree shaking and unused dependency removal.
- Browser caching (`Cache-Control: public, max-age=86400, must-revalidate`) for HTML routes.
- Removed 16+ unused UI libraries including CodeMirror, carousel, input-otp, drawer components for smaller bundle size.

**Testing Strategy:**

- Individual end-to-end test files for each of the 45+ tools in the application (`tests/e2e/tools/`).
- Each tool has dedicated test coverage verifying page loads without JavaScript/CSS errors.
- Isolated test failures allow precise identification of broken tools during development.
- Theme toggle functionality validation with proper state persistence across navigation.
- Comprehensive demo functionality testing (`tests/e2e/demo.spec.ts`) that validates visiting all 45 tools with speed changes from normal to crazy fast mode, tracks JavaScript/CSS errors for each tool load, and provides detailed error reporting for any problematic tools.
- Search and navigation testing to verify tool discovery and routing functionality.
- Robust e2e tests using proper wait conditions instead of fixed timeouts to prevent flaky tests.
- Tests use `page.waitForFunction()` to wait for actual DOM changes rather than arbitrary delays.
- CI/CD pipeline includes comprehensive testing with 146 unit tests and full e2e validation.

**Security Features:**

- Content Security Policy enforcing local-only resources.
- Input validation and sanitization.
- No telemetry or tracking.

## Issue Management and Community

**GitHub Issue Templates:**

- **Bug Report**: Comprehensive bug reporting with tool-specific categorization, browser/device info, and reproduction steps
- **Feature Request**: Structured feature requests with user stories, priority assessment, and technical considerations
- **New Tool Request**: Specialized template for requesting additional developer tools with detailed requirements
- **Performance Issue**: Focused template for performance problems with device specs and impact assessment
- **Documentation Issue**: Template for documentation improvements and corrections

**Issue Classification:**

- Tool-specific categorization covering all 45+ tools in the application
- Clear priority levels and impact assessment
- User type targeting (developers, designers, students, etc.)
- Technical complexity estimation for proper resource allocation

## CI/CD and Release Management

**GitHub Actions Workflows:**

- **CI Pipeline**: Automated testing, type checking, and build validation on every PR and main branch push.
- **Release Workflow**: Automated building, packaging, and GitHub release creation with changelog generation from merged PRs.
- **CI Dependency**: Release workflow requires CI to pass before allowing releases, ensuring quality control.
- **GitHub Pages Deployment**: Each release deploys the same gzip package to GitHub Pages as a standalone web application.

**Release Process:**

- **Automatic**: Push git tags (e.g., `v1.0.0`) trigger releases after CI validation
- **Manual**: GitHub Actions workflow dispatch with CI status verification
- **Emergency Bypass**: Manual releases can bypass CI requirement if needed (creates prerelease with warning)
- **Unified Build & Deploy**: Single workflow builds application and deploys identical files to both GitHub Releases and GitHub Pages
- Manual release preparation with `scripts/prepare-release.sh`
- Automated changelog generation from PR merge commits
- Cross-platform distribution packages (tar.gz, zip)
- Semantic versioning with git tag automation

## External Dependencies

### Core Framework Dependencies

- **Node.js 24.4.0**: Runtime environment with latest features and performance improvements.
- **React 19.1.1**: UI component library with latest features and performance improvements.
- **TypeScript**: Type safety.
- **Vite 6.3.5**: Build tool and development server with security updates.
- **Express.js**: Backend API foundation.
- **Tailwind CSS**: Styling framework.

### UI Component Libraries

- **Radix UI**: Accessible primitive components.
- **shadcn/ui**: Component library based on Radix UI.
- **Lucide React**: Icon library.
- **cmdk**: Command palette functionality.

### Development and Build Tools

- **ESLint**: Code linting.
- **PostCSS**: CSS processing.
- **tsx**: TypeScript execution.
- **esbuild**: JavaScript bundler.

### Utility Libraries

- **wouter**: Lightweight client-side routing.
- **js-yaml**: YAML parsing/serialization.
- **clsx + tailwind-merge**: Conditional CSS class composition.
- **react-hook-form**: Form handling.
- **@tanstack/react-query**: Server state management (prepared).

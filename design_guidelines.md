# Developer Tools Application Design Guidelines

## Design Approach

**Reference-Based Hybrid**: Draw inspiration from Linear (clean typography, subtle interactions), Raycast (efficient tool layouts), and Vercel (restrained elegance for developer-focused products). Prioritize information density and rapid tool access while maintaining visual refinement.

## Core Design Principles

- **Efficiency First**: Every pixel serves a purpose; minimize cognitive load for frequent users
- **Tool Discoverability**: Clear categorization and search enable quick navigation across 49+ tools
- **Contextual Clarity**: Active tool state, input/output zones, and options always visible
- **Progressive Disclosure**: Advanced features accessible but not obstructive

---

## Typography System

**Font Stack**:

- Primary: Inter (UI elements, body text)
- Monospace: JetBrains Mono (code snippets, tool outputs)

**Hierarchy**:

- Page Titles: text-3xl font-semibold tracking-tight
- Tool Names: text-xl font-medium
- Section Headers: text-sm font-semibold uppercase tracking-wide
- Body/Instructions: text-base font-normal
- Code Output: text-sm font-mono
- Labels: text-sm font-medium
- Helper Text: text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, and 16** consistently throughout:

- Component padding: p-4 to p-8
- Section spacing: space-y-6 or space-y-8
- Element gaps: gap-4 or gap-6
- Container margins: mb-8, mt-12

**Application Shell**:

- **Sidebar Navigation** (w-64, fixed left): Tool categories with collapsible sections, search bar at top, 49+ tools organized by type (Text Tools, Formatters, Converters, Generators)
- **Main Content Area** (flex-1, ml-64): Single active tool view with generous breathing room
- **Top Bar** (h-14, border-b): Theme toggle, settings icon, app logo/title aligned left

**Tool Page Layout** (max-w-5xl mx-auto, px-8, py-12):

1. Tool Header (mb-8): Tool name + brief description in muted text
2. Input Zone (mb-6): Textarea/input with clear label
3. Options Panel (mb-6): Controls like the deduplication checkbox, arranged in logical groups
4. Action Button(s) (mb-6): Primary action (e.g., "Sort Text") with loading states
5. Output Zone: Results display with copy button, line numbers for lists

---

## Component Library

### Text Sort Tool Specific Components

**Deduplication Checkbox** (integrate seamlessly into Options Panel):

- Use shadcn/ui Checkbox component
- Layout: Flex row with gap-2, items-center
- Label: "Remove duplicate lines" with text-sm font-medium
- Helper text below: "Keep only unique entries in sorted output" (text-xs, muted)
- Position: Below sort order options (A-Z/Z-A radio group), above case sensitivity toggle
- Spacing: py-4 with subtle divider border-t above it

**Options Panel Structure**:

```
┌─ Sort Options ────────────────┐
│ ○ A-Z  ● Z-A                  │
├───────────────────────────────┤
│ ☑ Remove duplicate lines      │
│   Keep only unique entries... │
├───────────────────────────────┤
│ ☐ Case sensitive              │
└───────────────────────────────┘
```

### Universal Tool Components

**Input/Output Textareas**:

- Border radius: rounded-lg
- Padding: p-4
- Min height: min-h-[240px] for inputs, auto for outputs
- Font: font-mono for code/text content
- Border treatment: subtle with focus ring
- Resize: resize-y (vertical only)

**Action Buttons**:

- Primary: Full-width on mobile (sm:w-auto sm:px-8), h-10, rounded-md, font-medium
- Secondary/Icon: Icon-only with tooltips, h-8 w-8, rounded

**Tool Cards** (in category views):

- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-4
- Card: p-6, rounded-lg, border, hover:border-accent transition
- Icon area: mb-4, size-8 icon in subtle circle background
- Title: text-lg font-semibold mb-2
- Description: text-sm line-clamp-2

**Search Bar** (in sidebar):

- Sticky top position: sticky top-0, z-10
- Input: w-full, h-10, pl-10 (icon space), rounded-md
- Icon: Magnifying glass, absolute left-3
- Padding around: p-4

---

## Navigation & Tool Organization

**Sidebar Categories** (collapsible groups):

- Text Tools (10-12 items)
- Formatters (JSON, XML, SQL, etc.)
- Converters (Base64, Hash, Units)
- Generators (UUID, Lorem Ipsum, Passwords)
- Dev Tools (Diff Checker, RegEx Tester)

**Tool List Items**:

- Height: h-9, px-3, rounded-md
- Active state: Distinct background treatment
- Text: text-sm, truncate for long names
- Hover: Subtle background shift

---

## Key Interactions

**Tool Switching**:

- Clicking sidebar item loads new tool in main area
- Preserve scroll position in sidebar
- Smooth content transition (no jarring layout shifts)

**Checkbox Behavior**:

- Toggle deduplication with immediate visual feedback
- Persist checkbox state per-tool in localStorage
- Show result count change ("45 lines → 32 unique lines")

**Results Display**:

- Copy button: Absolute top-right of output zone, icon-only with tooltip
- Success toast: Brief confirmation on copy ("Copied to clipboard")
- Empty state: Centered message when no output yet

---

## Responsive Adaptations

**Mobile** (< 768px):

- Sidebar: Transform to slide-over drawer, triggered by hamburger menu
- Tool layout: Full-width, px-4 instead of px-8
- Options: Stack all controls vertically
- Grid layouts: Single column

**Tablet** (768px - 1024px):

- Maintain sidebar, reduce width to w-56
- Two-column tool cards in category views

---

## Images

**Hero Section** (Home/Landing page, not individual tool pages):

- **Large Hero Image**: Use abstract geometric pattern or developer workspace aesthetic (code editor, terminal windows, clean desk setup) that communicates "powerful tools"
- Placement: Full-width, h-[400px] md:h-[500px], with gradient overlay
- Content over image: Centered, max-w-3xl
  - Headline: "49+ Developer Tools, All Offline" (text-5xl font-bold)
  - Subheadline: "Text manipulation, formatters, converters, and generators in one beautiful interface"
  - CTA Buttons: Glass-morphism style with backdrop-blur-sm background, two buttons side-by-side ("Explore Tools" + "View All Categories")
- Image style: Professional tech aesthetic, subtle blues/purples suggesting code syntax, NOT stock photos of people

**No images needed** in individual tool pages—focus on functionality and clear UI.

---

## Accessibility Implementations

- All checkboxes: Proper label associations, keyboard navigable
- Focus indicators: Visible ring-2 ring-offset-2 on all interactive elements
- ARIA labels: For icon buttons ("Copy to clipboard", "Clear input")
- Color independence: Never rely solely on color for state communication
- Contrast: Ensure all text meets WCAG AA standards in both themes

---

**Design Philosophy**: This developer tools app balances utilitarian efficiency with refined aesthetics—users should feel the interface is fast and intelligent, never cluttered or confusing. The deduplication checkbox integrates naturally as one of several sorting refinements, positioned logically in the options flow without disrupting the established visual rhythm.

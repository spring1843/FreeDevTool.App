# Style Guide

## User Interface and Experience

We strive to:

- Be minimal, do more with less
- Pick good defaults
- Allow meaningful customization
- Do similar things similarly
- Save advanced users' time
- Respond quickly to user actions

### Tools

- Tools must have a default value for input where it makes sense.
- Each tool must have a primary action button that processes the user's input.
- Allow uploading data as input, and downloading or copying the output.
- Have interesting and meaningful presets.
- Allow clearing the input and resetting it to the default value.
- An "Auto-update" checkbox, enabled by default, should be placed near the main action button. When checked, any change to the input automatically triggers the main action.
- Tools should automatically process their default input upon launch. The exception is for tools that produce sound or request browser permissions, which should require user interaction to start.
- For tools with a text input area, the keyboard focus should be set to that area on launch.
- Tools should be keyboard-friendly. Use standard keys like `Enter`, `Space`, and `Escape` for common actions like start, pause, and stop.
- Provide immediate feedback for user actions with a toast notification. This confirms that the action was registered. Toasts can be disabled globally.
- Do not request elevated permissions (e.g., camera access) on launch. Prompt for permissions only when the user explicitly tries to use the feature.
- Tool settings are reflected in the URL, allowing users to share links with others and see the same configuration.
- Tools should have a Reset button that resets input values to their defaults. This button should be disabled if values are already at their default.
- Tools should have a Clear button that clears all inputs so the user can start fresh. If the user has modified data, they should be warned with an "Are you sure?" prompt to prevent accidental data loss.
- In all tools, there are action buttons that perform operations and data buttons that manipulate input (such as Reset, Clear, and Now in time-related tools). Action buttons should appear on the left, and data buttons on the right. Action buttons should have more vibrant colors, while data buttons should have more muted colors to visually distinguish them.

### Buttons

- Buttons should have a tooltip explaining what the button does.
- Buttons that perform the same action should look identical across all tools. For example, a button that copies to clipboard should look exactly the same in every tool.

### Menus

- Menus must be collapsible to save space.
- Menus must be keyboard-friendly, allowing efficient navigation by advanced users.

## Code Level

### Linters

- Run all linters with `make lint`.
- We use ESLint for TypeScript.

### Formatters

- Format all applicable files with `make format`.

## GitHub Workflows

- Only `Makefile` commands should be used in .github/workflows. Avoid shell or bash commands as much as possible.

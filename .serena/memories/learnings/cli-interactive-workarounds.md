# Learning: CLI Interactive Prompt Workarounds

## Date: 2026-01-21
## Context: Remotion + skills.sh setup

---

## Problem

Many npm CLI tools use interactive prompts (TTY) that fail in non-interactive environments like Claude Code.

## Examples Encountered

### 1. npx create-video@latest
- **Issue**: Prompts for template selection, TailwindCSS, etc.
- **Error**: Hangs waiting for input
- **Solution**: Use `npx degit remotion-dev/template [dir] --force`

### 2. npx skills add
- **Issue**: Prompts for agent selection
- **Error**: TTY initialization failed: EINVAL
- **Solution**: User must run in interactive terminal OR manual git clone

## Workarounds Pattern

| Interactive CLI | Workaround |
|-----------------|------------|
| create-video | degit remotion-dev/template |
| create-next-app | --yes flag or degit |
| skills add | Manual git clone or user runs interactively |

## General Strategy

1. Look for --yes or --no-interactive flags
2. Use degit for GitHub template cloning
3. Manual git clone as fallback
4. Ask user to run interactively if critical

## degit Usage

```bash
# Fast GitHub template cloning without git history
npx degit owner/repo [destination] --force

# Examples
npx degit remotion-dev/template my-video
npx degit vercel/next.js/examples/basic-css next-app
```

## Key Takeaway

When CLI tool hangs or fails with TTY errors, immediately try:
1. --yes or --no-interactive flag
2. degit for templates
3. Manual git clone
4. Ask user to run command themselves

# Learning: skills.sh Platform (Vercel Jan 2026)

## Date: 2026-01-21
## Context: Remotion prompt-based video setup

---

## What is skills.sh?

A Vercel-launched platform for AI agent skills - reusable knowledge packages that enhance coding assistants.

## Key Facts

| Fact | Value |
|------|-------|
| Launch Date | 2026-01-17 |
| Platform | skills.sh |
| CLI Command | npx skills add |
| Install Location | ~/.claude/skills/ |
| Compatible Agents | Claude Code, others |

## Installation Methods

### 1. Via CLI (Interactive)
```bash
npx skills add owner/repo
# Example: npx skills add remotion-dev/skills
```

### 2. Manual Clone (Non-Interactive)
```bash
git clone https://github.com/owner/repo ~/.claude/skills/repo-name
```

### 3. Specific Skill
```bash
npx skills add remotion-dev/skills --skill "remotion-best-practices"
```

## Skill Structure

```
~/.claude/skills/skill-name/
├── SKILL.md          # Metadata + usage instructions
└── rules/            # Individual rule files
    ├── topic1.md
    └── topic2.md
```

## SKILL.md Format

```yaml
---
name: skill-name
description: Brief description
metadata:
  tags: tag1, tag2, tag3
---

## When to use
[Trigger conditions]

## How to use
[Rule file links and descriptions]
```

## Available Skills (Jan 2026)

| Skill | Repo | Purpose |
|-------|------|---------|
| remotion-best-practices | remotion-dev/skills | Video creation in React |
| vercel-react-best-practices | vercel-labs/agent-skills | React best practices |

## Key Insight

Skills are domain-specific knowledge packages that teach AI assistants best practices without requiring the AI to learn from scratch each session.

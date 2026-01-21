# Remotion + Agent Skills Setup Session
## Date: 2026-01-21
## Focus: 🏗️ feature
## Status: ✅ Complete

---

## Session Summary

Successfully set up Remotion for prompt-based video creation using the **skills.sh** platform with `remotion-dev/skills`.

---

## Key Findings

### 1. Remotion Architecture
```json
{
  "core_concept": "React-based video - each frame = React component render",
  "rendering_pipeline": "React Server → Headless Chrome → FFmpeg → MP4",
  "cloud_option": "@remotion/lambda for AWS Lambda distributed rendering",
  "version": "4.0.407",
  "ffmpeg": "Bundled automatically in v4.0+"
}
```

### 2. Skills.sh Platform (NEW - Jan 2026)
```json
{
  "platform": "skills.sh",
  "purpose": "AI agent skills for coding assistants",
  "install_command": "npx skills add remotion-dev/skills",
  "skill_location": "~/.claude/skills/",
  "compatible_agents": ["Claude Code", "others"],
  "launched": "2026-01-17 (Vercel)"
}
```

### 3. Remotion Skill Contents
```json
{
  "skill_name": "remotion-best-practices",
  "rules_count": 31,
  "topics": [
    "3D content (Three.js, React Three Fiber)",
    "Animation fundamentals (interpolate, spring)",
    "Assets (images, videos, audio, fonts)",
    "Audio handling (trimming, volume, speed, pitch)",
    "Dynamic composition (calculateMetadata)",
    "Charts and data visualization",
    "Captions (TikTok-style, word highlighting)",
    "Fonts (Google, local)",
    "GIFs, Lottie animations",
    "DOM measurement",
    "Sequencing patterns",
    "TailwindCSS integration",
    "Text animations, typography",
    "Timing (linear, easing, spring)",
    "Transitions",
    "Trimming patterns",
    "Video embedding"
  ]
}
```

---

## Installation Steps Executed

### Step 1: Create Remotion Project
```bash
# Method used: degit (because interactive prompt blocked)
npx degit remotion-dev/template video --force
cd video && npm install
```

### Step 2: Install Remotion Skills
```bash
# User installed via:
npx skills add remotion-dev/skills

# Alternative manual method (if TTY fails):
mkdir -p ~/.claude/skills
git clone https://github.com/remotion-dev/skills.git ~/.claude/skills/remotion-skills
```

### Step 3: Verify Setup
```bash
npm run dev
# Server running at http://localhost:3002
```

---

## Failures and Solutions

### Failure 1: Interactive Prompt Blocked
```json
{
  "issue": "npx create-video@latest requires interactive input",
  "error": "TTY prompts for template selection",
  "solution": "Use npx degit remotion-dev/template instead",
  "alternative": "Clone directly from GitHub"
}
```

### Failure 2: Directory Not Empty
```json
{
  "issue": "create-video fails if directory has existing files",
  "error": "Something already exists at path",
  "solution": "Create in subdirectory (video/) or use degit with --force"
}
```

### Failure 3: Skills TTY Init Failed
```json
{
  "issue": "npx skills add fails in non-interactive terminal",
  "error": "TTY initialization failed: EINVAL",
  "solution": "User ran manually in interactive terminal",
  "alternative": "Manual git clone to ~/.claude/skills/"
}
```

---

## Project Structure

```
/Users/oak/Downloads/Core/Dev/Content/Remotion/
├── .claude/
│   └── settings.local.json       # MCP permissions
├── video/                         # Remotion project
│   ├── node_modules/
│   ├── src/
│   │   ├── HelloWorld/
│   │   ├── HelloWorld.tsx
│   │   ├── Root.tsx              # Composition registry
│   │   └── index.ts
│   ├── package.json
│   ├── remotion.config.ts
│   └── tsconfig.json
└── oak-management/

~/.claude/skills/
├── remotion-best-practices/      # Symlink
│   ├── rules/                    # 31 rule files
│   └── SKILL.md
└── remotion-skills/              # Full cloned repo
```

---

## Key Remotion Concepts Reference

| Concept | Description |
|---------|-------------|
| Composition | Defines video metadata (id, fps, duration, dimensions) |
| useCurrentFrame() | Hook returning current frame number |
| useVideoConfig() | Hook returning fps, width, height, durationInFrames |
| interpolate() | Map frame ranges to value ranges |
| spring() | Physics-based animations |
| Sequence | Time-shift child components |
| Audio/Video | Components synced to timeline |
| staticFile() | Reference assets in /public folder |
| AbsoluteFill | Full-frame container component |
| Series | Sequential composition of elements |

---

## Research Sources

| Source | URL |
|--------|-----|
| Deep Research Task | 01kfh8kpsfdqxmt17bkgdsvk44 |
| Official Docs | https://www.remotion.dev/docs/ |
| Skills Platform | https://skills.sh/ |
| Remotion Skills Repo | https://github.com/remotion-dev/skills |
| Skills CLI Docs | https://skills.sh/docs/cli |
| Jonny Burger Demo | gist.github.com/JonnyBurger/5b801182176f1b76447901fbeb5a84ac |

---

## Next Steps

1. Test Skills: Create a sample composition via prompts
2. Explore Rules: Read individual rule files for specific patterns
3. Create Video: Prompt for specific video type
4. Render: npx remotion render [CompositionId] out/video.mp4

---

## Commands Reference

```bash
# Development
cd /Users/oak/Downloads/Core/Dev/Content/Remotion/video
npm run dev                        # Start Remotion Studio (port 3002)

# Rendering
npx remotion render MyComp out/video.mp4

# Skills
npx skills add remotion-dev/skills
ls ~/.claude/skills/
```

---

## Session Metadata

```json
{
  "session_date": "2026-01-21",
  "session_type": "setup",
  "project_path": "/Users/oak/Downloads/Core/Dev/Content/Remotion/video",
  "skills_installed": ["remotion-best-practices"],
  "dev_server_port": 3002,
  "todos_completed": 3,
  "todos_total": 3,
  "status": "complete"
}
```

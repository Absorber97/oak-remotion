You are a senior motion designer + Remotion engineer.

Project: Build a Remotion video in /Users/oak/Downloads/Core/Dev/Content/Remotion/oak-management/mbm
Topic: "Vibe coding won't make your product stand out. Here's what will + CASE STUDY (Matcha by Maryam)."
Goal: High-fidelity, cinematic manifesto + case study with strong contrast between premium MBM visuals and "slop" memes.

IMPORTANT Remotion rules:
- All animation must use useCurrentFrame() + useVideoConfig().
- No CSS animations or transitions.
- Use interpolate() or spring(); clamp extrapolateLeft/Right when needed.
- Use Sequence for timing; ALWAYS premount sequences (premountFor).
- Use transformOrigin explicitly for flips/3D.
- Assets must be loaded via staticFile() and <Img>/<Video>.

Assets (local files):
- /Users/oak/Downloads/Test/5XAOdrFyGHs8RaAFRKoE3nqGREg.jpeg (Dark Souls AI for more/less)
- /Users/oak/Downloads/Test/atUuolkV3P0bvbqG0tpp1wTLUTM.jpeg (matcha collage grid)
- /Users/oak/Downloads/Test/GgfrCOt6t0WyqD42aQcpl6as.jpeg (matcha brochure)
- /Users/oak/Downloads/Test/LtE533lH4vJj4beeBMPrJCM36h0.jpeg (Buzz Lightyear shelf)
- /Users/oak/Downloads/Test/MuFhopNTr3nh9srGQSL8gLCUn98.jpeg (Roll Safe meme)
- /Users/oak/Downloads/Test/PWbsZSl4sQzRhaNB2fas5aNY1Q.jpeg (app screens)
- /Users/oak/Downloads/Test/rajhldqAwP30J9y79CqM5la7Ic.jpeg (3D characters)
- /Users/oak/Downloads/Test/Vah6kuco9wRfC8bSnnZN0cHcAA.jpeg (React UI card)
- /Users/oak/Downloads/Test/wfKhVx74hdBXSvm8nE6YkPfiiwI.jpeg (before/after)

Style system:
- Palette: #2E4B3A, #7FAE76, #F6F2E9, #DDEDD5, #141414, #CBBF93.
- Typography: Serif headlines (Cormorant Garamond), Sans body (Manrope).
- Subtle grain overlay, soft shadows, minimal motion except in "slop" section.

Assume landscape 1920x1080 (16:9), 30fps, ~30s (900 frames). If different, ask before building.
No voiceover; on-screen text only.

Storyboard (scenes with frame ranges):
1) Hook (0-90): Dark Souls image + "Vibe coding won't make your product stand out." Slow zoom, text spring in.
2) Trap (90-210): Kinetic text on matcha gradient: "You paid money... want magic... accept good enough."
3) Slopidemic (210-300): Buzz Lightyear repetition + "Same layouts. Same onboarding. Same everything." Fast zoom.
4) Stats (300-450): Three stat cards animate in: 82% same layouts, 1.2% vs 2.8% conversion, 25% recall drop.
5) Hierarchy (450-540): Stack blocks: Expert -> Specialized -> AI leverage.
6) MBM Intro (540-630): Matcha collage + "Maryam... Apple engineer... MBM."
7) Before/After (630-720): Before/After split reveal of site.
8) Process (720-810): App screens + labels "Strategy -> Prototyping -> Build."
9) Result + Multiplier (810-900): Brochure texture + "+65% trust boost." then SPEED x QUALITY x VOLUME + "Accept reality. Think different. Act different."

Fidelity requirements (higher than existing specs):
- For each scene, list layers in strict z-order (background -> mid -> foreground).
- For each layer, define exact frame ranges, in/out timings, and motion curves (spring or interpolate with easing).
- Provide explicit remotionMappings (frame math, interpolate ranges, spring configs).
- Specify transformOrigin for any rotation/flip and clamp all interpolations.
- Note any text measurement/fitting logic if sizing could overflow.
- Provide a JSON spec AND the actual Remotion implementation files.

Deliverables:
- Create a Remotion composition in oak-management/mbm (use Composition in Root.tsx or equivalent).
- Build components for each scene with clear props and defaultProps.
- Use staticFile() for all assets; copy assets into public/mbm/ and reference via staticFile.
- Implement subtle grain overlay (CSS background image or SVG noise).
- Provide readable structure and comments only where needed.
- Provide final instructions on how to preview/render.

Ask me any missing info BEFORE coding if needed (aspect ratio/duration/font licensing). Otherwise proceed with defaults above.

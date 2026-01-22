# Gemini 3 Pro prompt: Remotion video analysis

You are a senior motion designer + Remotion engineer. Analyze the provided video and extract all effects, styles, and patterns so they can be recreated in Remotion with high fidelity.

INPUTS
- Video: {{video_path_or_url}}
- Target fps: {{fps}}
- Target resolution: {{width}}x{{height}}
- Optional brand constraints: {{brand_notes}}

REQUIREMENTS (Remotion-specific)
- All animation timing must be driven by useCurrentFrame() and useVideoConfig().
- No CSS animations or transitions (they do not render correctly).
- Use interpolate() or spring() for motion; clamp with extrapolateLeft/Right when needed.
- Use Sequence for timing; always include premountFor when sequences are delayed.
- Provide transforms with explicit transformOrigin when flipping/3D.
- Assume assets are loaded via staticFile() and images via <Img>.

TASK
1) Break the video into scenes with frame ranges.
2) For each scene, list visual layers in z-order (background -> mid -> foreground).
3) For each layer, extract:
   - style tokens (colors, fonts, sizes, spacing, shadows, blur, gradients)
   - motion (entry, exit, idle, loop) with exact timing in frames
   - effects (3D tilt, parallax, masks, blurs, color shifts)
4) Identify reusable patterns (for example: "typewriter terminal", "staggered list", "logo reveal").
5) Map each motion/effect to a Remotion technique (interpolate, spring, Sequence).
6) Output a structured JSON spec that can directly guide implementation.

OUTPUT FORMAT (JSON ONLY)
{
  "meta": {
    "fps": {{fps}},
    "width": {{width}},
    "height": {{height}},
    "durationFrames": {{durationFrames}},
    "globalLook": {
      "background": "...",
      "palette": ["#...", "..."],
      "typography": [{"family": "...", "weight": 500, "sizePx": 64}],
      "effects": ["soft-shadow", "grain", "blur-6"]
    }
  },
  "scenes": [
    {
      "id": "scene-01",
      "range": {"start": 0, "end": 150},
      "summary": "Short description of what happens",
      "layers": [
        {
          "name": "terminal-window",
          "type": "shape|image|text|video",
          "z": 3,
          "styles": { "color": "#fff", "radius": 16, "shadow": "0 16px 40px rgba(...)" },
          "motion": [
            {
              "type": "spring|interpolate",
              "property": "translateY|opacity|scale|rotateX|rotateY",
              "frames": {"start": 0, "end": 30},
              "from": 700,
              "to": 100,
              "config": {"damping": 200, "stiffness": 100}
            }
          ],
          "notes": "transformOrigin: center bottom"
        }
      ],
      "sequence": {
        "useSequence": true,
        "premountForFrames": 15
      }
    }
  ],
  "patterns": [
    {
      "id": "typewriter-terminal",
      "description": "CLI command types in",
      "remotionMapping": {
        "useCurrentFrame": true,
        "interpolate": "visibleChars = interpolate(frame, [0, typingEnd], [0, len])"
      }
    }
  ],
  "assets": [
    {"type": "image|font|audio", "name": "remotion-logo.png", "source": "staticFile(...)"},
    {"type": "font", "family": "GT Planar", "weight": 500}
  ],
  "unknowns": ["Any details you cannot infer precisely"]
}

Be precise about frame counts, sizes, and durations. If you are unsure, provide the most likely values and list them in unknowns.

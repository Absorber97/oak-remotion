# Gemini prompt: Remotion video analysis (high fidelity)

You are a senior motion designer + Remotion engineer. Analyze the provided video and extract all effects, styles, timings, and patterns so they can be recreated in Remotion with very high fidelity.

INPUTS
- Video: {{video_path_or_url}}
- Target fps: {{fps}}
- Target resolution: {{width}}x{{height}}
- Optional brand constraints: {{brand_notes}}

CONTEXT: GEMINI CLOUD (no local file access)
- You cannot read local files. Use Remotion docs at https://www.remotion.dev/docs.
- When you cite a rule or API, reference the doc page you used in "docSources". Keep it concise.

REQUIRED REMOTION RULE CHECKLIST (must be applied)
- 3D: use Three.js/R3F patterns when needed
- Animations: useCurrentFrame(), no CSS transitions/animations
- Assets: staticFile() for local assets, Img/Video/Audio components
- Audio: import/trim/volume patterns
- Calculate metadata: dynamic duration/size when needed
- Can decode: validate video decodability if relevant
- Charts: chart patterns for data
- Compositions: Composition/Still/Folder usage
- Captions display: TikTok-style word highlights
- Extract frames: Mediabunny patterns
- Fonts: load fonts correctly
- Media durations: audio/video duration helpers
- GIFs: synchronized playback
- Images: Img usage
- SRT import: captions ingestion
- Lottie: animation embedding
- Measuring DOM/text: fit/overflow handling
- Sequencing: Sequence/Series, premountFor
- Tailwind: no animation classes
- Text animations: typewriter via string slicing
- Timing: interpolate/spring/easing with clamp
- Transcribe captions: Whisper patterns
- Transitions: TransitionSeries usage
- Trimming: cut patterns
- Videos: Video component, trimBefore/trimAfter, playbackRate

REFERENCE CODE EXAMPLES (from docs)
- charts bar chart example
- text animations typewriter example
- text animations word highlight example

REMOTION BEST PRACTICES RULES (use these explicitly)
- 3d.md: 3D content in Remotion using Three.js and React Three Fiber
- animations.md: useCurrentFrame() for all animations; no CSS transitions
- assets.md: staticFile() for assets, Img/Video/Audio components
- audio.md: audio usage patterns
- calculate-metadata.md: dynamic composition metadata
- can-decode.md: video decode checks
- charts.md: chart/data visualization
- compositions.md: Composition/Still/Folder usage
- display-captions.md: captions display
- extract-frames.md: frame extraction
- fonts.md: font loading
- get-audio-duration.md: audio duration
- get-video-dimensions.md: video dimensions
- get-video-duration.md: video duration
- gifs.md: GIF handling
- images.md: Img usage
- import-srt-captions.md: SRT import
- lottie.md: Lottie usage
- measuring-dom-nodes.md: DOM measurement
- measuring-text.md: text measurement/fit
- sequencing.md: Sequence/Series, premountFor
- tailwind.md: Tailwind usage (no animation classes)
- text-animations.md: typewriter, word highlight (string slicing)
- timing.md: interpolate/spring/easing
- transcribe-captions.md: transcription
- transitions.md: @remotion/transitions usage
- trimming.md: trim patterns
- videos.md: Video component, trimBefore/trimAfter, playbackRate

AVAILABLE TOOLS/APIS (assume Remotion project)
- Remotion core: useCurrentFrame, useVideoConfig, interpolate, spring, Easing
- Layout: AbsoluteFill, Sequence, Series
- Media: Img, Video, Audio, staticFile
- Optional transitions: @remotion/transitions (fade/slide/wipe/flip)
- Optional helpers: @remotion/paths, @remotion/noise

PROJECT REFERENCES (use for guidance, not as output)
- oak-management/polymarket-patterns.json
- oak-management/remotion-demo-patterns.json

HARD REQUIREMENTS
- All animation timing must use useCurrentFrame() + useVideoConfig().
- No CSS animations or transitions (they do not render correctly).
- Use interpolate() or spring() for motion; clamp extrapolateLeft/Right.
- Use Sequence for timing; ALWAYS include premountFor.
- Provide transforms with explicit transformOrigin for flips/3D.
- Assume assets are loaded via staticFile() and images via <Img>.
- Provide higher fidelity than typical prompts: exact frames, positions, sizes, and easing curves.

TASK
1) Break the video into scenes with exact frame ranges.
2) For each scene, list visual layers in strict z-order (background -> mid -> foreground).
3) For each layer, extract:
   - style tokens (colors, fonts, sizes, spacing, shadows, blur, gradients)
   - motion (entry, exit, idle, loop) with exact timing in frames
   - effects (3D tilt, parallax, masks, blurs, color shifts)
4) Identify reusable patterns (typewriter, staggered list, logo reveal, UI stack, etc.).
5) Map each motion/effect to a Remotion technique (interpolate, spring, Sequence).
6) Specify any text-measurement or fitting logic (overflow handling).
7) Provide a concrete Remotion implementation plan (component tree, file structure, props).

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
    },
    "remotionRules": [
      "useCurrentFrame/useVideoConfig",
      "no CSS animations",
      "Sequence + premountFor",
      "interpolate/spring with clamp"
    ]
  },
  "docSources": [
    "https://www.remotion.dev/docs/use-current-frame",
    "https://www.remotion.dev/docs/use-video-config"
  ],
  "scenes": [
    {
      "id": "scene-01",
      "range": {"start": 0, "end": 150},
      "summary": "Short description of what happens",
      "layers": [
        {
          "name": "background-gradient",
          "type": "shape|image|text|video",
          "z": 0,
          "styles": {
            "background": "linear-gradient(...)",
            "opacity": 1
          },
          "motion": [
            {
              "type": "spring|interpolate",
              "property": "translateY|opacity|scale|rotateX|rotateY",
              "frames": {"start": 0, "end": 30},
              "from": 700,
              "to": 100,
              "config": {"damping": 200, "stiffness": 100},
              "easing": "Easing.inOut(Easing.quad)",
              "clamp": true
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
  "transitions": [
    {
      "between": ["scene-01", "scene-02"],
      "type": "fade|slide|wipe|flip",
      "durationFrames": 12,
      "timing": "linear|spring"
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
    {"type": "image|font|audio", "name": "asset.png", "source": "staticFile('...')"}
  ],
  "implementationPlan": {
    "components": [
      {"name": "SceneHook", "props": ["..."], "notes": "..."}
    ],
    "fileStructure": [
      "src/Video.tsx",
      "src/scenes/SceneHook.tsx",
      "src/components/KineticText.tsx"
    ]
  },
  "unknowns": ["Any details you cannot infer precisely"]
}

Be precise about frame counts, sizes, and durations. If you are unsure, provide the most likely values and list them in unknowns.

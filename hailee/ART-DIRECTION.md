# Kurzgesagt art & motion methodology

Working reference for the `/hailee` animation. Written to explain *why* their
frames look the way they do, so the rules can be applied to new shapes rather
than copied off a single screenshot.

> Sourced from general knowledge of the studio's output plus search summaries.
> Direct fetching of their frames/tutorials was blocked by network egress in
> the build environment, so treat the specifics as a working model to test
> against real frames, not as a transcription of an official style guide.

---

## 1. Shape language

The whole style is **primitives with generous corner radii**.

- Every object decomposes into circles, ellipses, capsules, arcs and rounded
  rectangles. If a shape can't be described as a few primitives welded
  together, it's too complex.
- **Nothing has a sharp corner unless it's a deliberate accent** — a beak, a
  spike, a light ray, a leaf tip. Sharp corners are punctuation, used maybe
  once or twice per object.
- Corner radius scales with the shape. Small shapes are nearly pill-shaped;
  large shapes keep a softer proportional radius. A constant pixel radius
  across different sizes is a tell that it wasn't drawn this way.
- **Silhouette first.** Every object must be readable as a solid black
  shape. If the silhouette is mush, no amount of internal detail saves it.
- Internal detail is *low*. Objects read at thumbnail size. Detail lives in
  the silhouette and in one or two internal shapes, not in linework.
- Slight asymmetry keeps it alive — a leaf longer on one side, a bud tilted a
  few degrees. Perfect bilateral symmetry reads as clip art.

**Applied to a tulip:** the flower head is *one egg/ovoid silhouette* with
petal divisions carved into it — not three separate petals floating next to
each other. That single-silhouette rule is the biggest thing the current
version gets wrong.

## 2. Colour

- Saturated, but **limited**: 3–5 hues per scene plus neutrals. Variety comes
  from value and temperature, not from adding more hues.
- The focal object is the **brightest and most saturated** thing in frame.
  Everything else steps down.
- Backgrounds are deep and rich — navy, plum, teal, deep indigo — and
  *rarely pure black*. Pure black flattens the depth cues and kills the
  atmospheric falloff they rely on.
  *(For `/hailee` the background is black by explicit request, so the
  depth work has to be carried by the shapes and contact shadows instead.)*
- Analogous harmony with a single complementary accent is the default
  scheme.

## 3. Gradients — the part that's easy to get wrong

Modern Kurzgesagt is **not** strictly flat. Subtle gradients are everywhere,
and their absence is why naive imitations look like generic flat vector.

The rule that matters: **gradients shift hue, not just lightness.**

- A red petal doesn't go red → dark red. It goes red → warm pink/orange, or
  red → deep magenta. Two stops, close together in value, meaningfully
  apart in hue.
- Direction is consistent with the scene light.
- The gradient must be subtle enough that the shape still reads as a flat
  block at a glance. If you can clearly see it as a gradient, it's too strong.
- Large, very soft **radial** gradients are used for atmosphere and glow
  behind focal elements — a separate device from the in-shape gradients.

## 4. Light and shading

- **One light direction per scene**, obeyed by every object without exception.
- Shading is a **hard-edged shape**, not a soft ramp: a crescent, a half, a
  wedge that follows the form. It sits on top of the base fill.
- **Rim light** is the signature move on dark backgrounds: a thin bright edge
  along the lit side of the silhouette. This is what makes objects feel like
  they're *in* the scene rather than pasted on it.
- **Contact shadow / ambient occlusion**: a darker shape where two objects
  meet — where a stem enters soil, where petals meet the cup. Cheap, and it
  does most of the work of grounding an object.
- Two shading steps maximum. Base + shadow, or base + light. Three tones on
  one small shape reads as patchy noise, not form.

## 5. Depth

Depth is built from **overlap and atmosphere**, never from perspective
drawing.

- Layered planes: foreground (darkest, often near-silhouette, sometimes
  cropped by the frame edge), midground (the subject, brightest and most
  saturated), background (lowest contrast).
- **Atmospheric perspective**: distant objects shift *toward the background
  colour* and lose saturation. Mixing a colour 25–35% toward the background
  hue is the correct move — dimming with a brightness filter turns
  saturated hues muddy and is the classic mistake.
- Overlap is the primary cue, scale is secondary.

## 6. Texture

- A **fine grain/noise overlay across the entire frame** at low opacity. This
  is a genuine signature and is doing more work than people realise: it
  unifies the layers, kills gradient banding, and stops large flat areas
  feeling like dead vector fill.
- Small repeated motifs — dots, stars, bubbles, sparkles — used sparingly as
  rhythm, never as a field of confetti.

## 7. Composition

- Strong central focal point with generous negative space around it.
- Objects sit *in* an environment: a ground plane, a horizon, a contact
  shadow. Floating objects with nothing to sit on look unfinished.
- Ground planes are usually **gently curved** — a hint of a planet's
  curvature — not a dramatic dome, unless the planet itself is the subject.

## 8. Motion

- **Nothing is linear.** Every transition is eased.
- Entrances **overshoot and settle** — scale past the target and come back.
- **Follow-through and drag**: appendages lag the body. A flower head trails
  its stem by a few frames. This single technique separates real animation
  from CSS transforms.
- **Staggered timing**: identical elements never move in unison. Offsets of
  80–200ms read as organic.
- **Constant idle motion.** Nothing is ever perfectly still — a slow float,
  breathe or sway underneath everything.
- Motion starts from *rest*, not from a pose. An animation whose first
  keyframe differs from the element's resting state produces a visible snap.
- Squash and stretch, used subtly, on anything that lands or impacts.

---

## Checklist for this page

- [ ] Flower head is **one silhouette** with petals carved in, not separate petals
- [ ] Every fill uses a subtle **hue-shifted** two-stop gradient
- [ ] One consistent light direction across the whole scene
- [ ] **Rim light** on the lit edge of each flower head
- [ ] **Contact shadow** where every stem meets the ground
- [ ] Max two tones per small shape (leaves are flat + one shadow, not three)
- [ ] Distance = mix toward background colour, never a brightness filter
- [ ] Full-frame **grain overlay** at low opacity
- [ ] Ground plane **gently** curved, single layer
- [ ] All motion eased, staggered, with overshoot and follow-through
- [ ] No animation begins on a pose different from its resting state

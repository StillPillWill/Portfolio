# William Nzive Portfolio — Unified Implementation Plan

## Product goal

Build a local-only spatial technical CV at `http://localhost:3000/` that presents William Nzive as a technically serious builder working across computer science, embedded sensing, machine learning, low-level systems, mechanical design, fabrication, and technical leadership. The homepage is the complete CV journey; projects with enough evidence also have dedicated, reversible case-study routes.

The visitor should understand within ten seconds:

- William is a CSE student at UC Davis.
- His strongest work spans advanced software research and physical engineering.
- The website itself demonstrates unusually strong technical and visual execution.

The main spatial journey and its recruiter-readable overview are not a
three-project portfolio summary: both cover education, languages, systems work,
ML practice, mechanical and fabrication work, technical leadership, hackathons,
game-jam breadth, and direct contact links. Dedicated project routes are the
evidence layer for work with enough material to support a full case study.

The experience tells one continuous story: information begins as computation, becomes a wireless signal, enters a mechanical system, turns into physical fabrication, and scales through a team.

Dedicated project routes:

- `/projects/csi` — research question, capture pipeline, demonstrated result, and ongoing reconstruction work.
- `/projects/vulcan` — V1 overview, belt-driven joints, documentation, V2 direction, and full gallery.
- `/projects/ender3-2` — physical rebuild, mechanics, firmware, Open Sauce conversion, and full gallery.
- `/projects/team-3598` — leadership scope, subsystem coordination, competition result, outreach, and team gallery.

Homepage project chapters contain only a concrete one-sentence premise and an `OPEN FULL PROJECT JOURNEY` action. They do not duplicate case-study text or galleries over the 3D focal object.

## Showcase order

Only these main chapters appear:

1. Introduction
2. Computer Science portal
3. CSI research
4. CS-to-mechanics threshold
5. Vulcan
6. Ender3-2
7. Team 3598
8. Contact

TruTone, OpenMontage, random utilities, weak repositories, generic tools, and vibe-coded work are excluded.

## Opening copy

- Eyebrow: `WILLIAM NZIVE · CSE @ UC DAVIS`
- Headline: `I build systems that move information—and machines.`
- Supporting copy: `Researching faster AI systems, extracting useful signals from wireless hardware, and designing machines that turn computation into motion.`
- Primary action: `ENTER THE WORK`
- Secondary action: `EMAIL WILLIAM`

## Spatial interaction model

The site is a pure spatial traversal. `html` and `body` remain `overflow: hidden`; there is no conventional document scroll.

- Wheel and trackpad control one normalized journey value from `0` to `1`.
- Touch uses vertical dragging.
- Arrow keys move forward/backward; Home returns to the introduction; End reaches contact.
- Page Up/Page Down jump between chapters.
- Enter opens the active chapter’s evidence sequence.
- Escape exits the index or media focus.
- Motion is reversible and interruptible.
- A soft magnetic snap engages only when the user stops within 4% of a chapter beat.
- URL hashes identify chapters: `#intro`, `#cs`, `#csi`, `#mechanics`, `#vulcan`, `#ender3-2`, `#team-3598`, `#contact`.

Every project is divided into spatial beats rather than cards:

1. Premise and role.
2. Engineering explanation.
3. Evidence and metrics.
4. Large media/evidence gallery.

## Visual system

Palette:

- Background: `#03050A`
- Raised midnight: `#080B12`
- Primary ivory: `#F0EDE6`
- Secondary steel: `#9AA3B2`
- Persistent signal: `#E5B86B`
- CS violet: `#8176E9`
- Mechanical copper: `#C8774D`
- Leadership crimson: `#B95C6B`
- Fine line: `rgba(240,237,230,0.14)`

Use self-hosted Manrope Variable for display/body type and DM Mono for technical labels. Avoid neon cyan, visible grid wallpaper, generic dashboard styling, excessive rounded cards, glassmorphism stacks, and unexplained decorative geometry.

The focal model or image occupies at least 55% of the useful viewport. Project media occupies 65–85% of the viewport and is never squeezed into a narrow strip. Empty space is only used to establish scale or anticipation.

## World and choreography

Coordinate system: `+X` right, `+Y` up, `-Z` forward. Use a separate camera-target curve. Desktop camera FOV is `42°`; mobile is `52°`.

World anchors:

| Destination | Anchor | Progress |
|---|---:|---:|
| Introduction | `(0, 0, 0)` | `0.00–0.10` |
| Computer science portal | `(0, 0, -26)` | `0.10–0.18` |
| CSI | `(8, 1, -58)` | `0.18–0.42` |
| CS/mechanics threshold | `(0, 0, -82)` | `0.42–0.50` |
| Vulcan | `(-10, 0, -110)` | `0.50–0.72` |
| Ender3-2 | `(10, -1, -144)` | `0.72–0.86` |
| Team 3598 | `(0, 2, -176)` | `0.86–0.96` |
| Contact | `(0, 0, -204)` | `0.96–1.00` |

The persistent signal packet changes form:

`waveform trace → CSI pulse → timing belt → printer toolpath → 3598 media helix → WN mark`

### Traversal geometry and environmental separation

The camera does not interpolate down a straight corridor. It follows a 23-point Catmull–Rom path with a separate 23-point look-target curve. The route strafes around the opening signal, banks into the radio laboratory, descends through the bearing aperture, performs an off-axis Vulcan orbit, threads around the real printer assembly, then climbs through a helical sequence of Team 3598 media before settling outside the contact terminus. Gentle damping keeps each turn reversible without flattening it into a linear dolly.

Each chapter occupies a distinct architectural volume, separated by short-range fog and chapter-specific lighting:

1. Introduction — circular signal chamber with a suspended platform.
2. Computer science — violet signal vault with repeated gantries and waveform rails.
3. CSI — radio laboratory with concentric waveguide hoops and waveform ribbons.
4. Threshold — rotating dual-material bearing aperture.
5. Vulcan — copper machine hangar with full-scale structural frames.
6. Ender3-2 — steel fabrication bay centered on William’s actual printer CAD.
7. Team 3598 — crimson competition truss traversed through a spiral of first-party media.
8. Contact — quiet amber signal terminus.

Adjacent spaces must not read simultaneously as one decorated tunnel. Fog begins near the active room and reaches full density before the next major environment; ambient color and the dominant practical light crossfade by discipline. World geometry remains outside the camera spline except at deliberate apertures whose clear opening exceeds the camera path envelope.

### Introduction

Start at `(0, 0.6, 12)` looking toward the dark signal packet. The headline enters in the center-left of the viewport while the packet assembles from floating layers. Clicking `ENTER THE WORK` sends the packet forward through the CS portal.

### CSI

The opening waveform becomes a radio pulse and crosses an ESP32 board. The chapter states that audio detection and speaker identification were demonstrated while general audio reconstruction remains ongoing. The pulse exits through a bearing.

### CS/mechanics threshold

The violet RF chamber ends at a physical bearing. The waveform becomes an amber timing belt. Digital labels change from memory/frequency units to torque/reduction/dimensions. The camera passes through the bearing into the copper-lit mechanical hangar.

### Vulcan

The belt threads through five grouped Vulcan assemblies. The camera performs a restrained 120° orbit, shows the reduction path and shoulder cutaway, then expands `arm.png`, `arm2.png`, `arm4.png`, and `zine.jpg` as large spatial media planes. Vulcan is explicitly labeled `DESIGNED AND DOCUMENTED · NOT YET PHYSICALLY BUILT`.

### Ender3-2

The Vulcan belt straightens into the printer’s X-axis belt. The actual `ender33_asm.stp` assembly occupies the fabrication bay, and the camera moves around its measured envelope. William’s build photographs then occupy most of the evidence viewport without forced cropping.

### Team 3598

The camera exits the fabrication bay on a rising arc and enters a four-plane media helix inspired by the reference site’s spiral transition. A team group photo, competition photo, outreach record, and identity panel wrap around the camera at staggered depths before the group image resolves into the stable evidence gallery. No abstract leadership nodes or decorative sphere are used.

### Contact

Capabilities:

`SYSTEMS · ML · EMBEDDED · MECHANICAL`

Languages evidenced by the work:

`Python · C++ · CUDA · C · JavaScript / TypeScript · HTML / CSS`

Final headline:

`I’m looking for problems that refuse to stay in one discipline.`

Contact: `williamnzive2007@gmail.com`, GitHub `StillPillWill`, and the supplied LinkedIn profile.

## Project copy rules

CSI is described as active research. Speaker identification is shown as demonstrated; general audio reconstruction is shown as ongoing.

Vulcan is described as a complete design/documentation effort and not as a physically completed robot.

Ender3-2 is described as a physically built project with custom live-editable firmware and an Open Sauce plotter demonstration.

Team 3598 claims are limited to supplied first-party documents and verified team information.

## Runtime architecture

Preserve the existing React 19/vinext setup and local `.openai/hosting.json`. Do not add hosting, authentication, database, uploads, or external runtime APIs.

Use Three.js, React Three Fiber, Drei, and React Postprocessing. The homepage and each project route own a fixed WebGL canvas, camera choreography, and compact accessible HTML caption layer. No long bottom progress bar is rendered; navigation uses explicit previous/continue controls, keyboard input, wheel/drag movement, and a small chapter counter.

Use typed data for `ChapterId`, `JourneyChapter`, `JourneyBeat`, `MediaAsset`, `EvidenceMetric`, and `QualityProfile`. Keep journey progress outside React render state so continuous animation does not rerender the whole application.

## Rendering and performance

- Three.js color management with ACES filmic tone mapping and sRGB output.
- Studio Small 02 HDRI via PMREM, hidden from the background.
- One broad RectAreaLight, one chapter rim, one soft fill, and at most one shadow-casting spotlight.
- Selective bloom only for signal/emissive objects.
- Cap device pixel ratio at `1.5`.
- Pause hidden tabs.
- Low-power mode disables shadows, dense particles, fog volume, and postprocessing.
- Initial compressed payload target: ≤3 MB.
- Total deferred media target: ≤18 MB.
- Desktop target: 45+ FPS on a mid-range machine.
- Mobile target: 30 FPS.

## CPU-only Blender policy

Blender at `C:\Steam\steamapps\common\Blender\blender.exe` is used in background mode only for geometry preparation. It may import, rename, group, pivot, decimate, and export assets. It must not run Cycles, Eevee, Workbench renders, GPU baking, or offline animation renders.

The existing Vulcan renders are the final cinematic imagery. Live lighting is handled by the visitor’s browser GPU.

## Acceptance criteria

- No normal document scroll.
- CS and mechanics are visibly distinct.
- The signal’s transformation has a meaningful relationship to every project.
- All project media is large, sharp, and legible.
- Models are screenshot-verified from multiple journey angles for orientation, scale, lighting, clipping, and text overlap.
- Scene-first beats keep all text inside a narrow edge-safe caption area.
- No grain/noise postprocessing or bottom progress bar is present.
- No vibe-coded or weak projects appear.
- Every technical claim is sourced or qualified.
- Wheel, trackpad, touch, keyboard, index, hashes, backward travel, reduced motion, WebGL failure, and slow loading work.
- The production build succeeds and localhost remains available on port 3000.

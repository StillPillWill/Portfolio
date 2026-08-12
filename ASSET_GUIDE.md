# William Nzive Portfolio — Asset Guide

This guide is the source of truth for media selection, model preparation, texture use, lighting, and animation inputs.

## Original project assets

| ID | Source | Treatment | Destination |
|---|---|---|---|
| `VUL-3D-01` | `C:\Users\willi\Downloads\arm_asm.zip` containing `arm_asm.gltf` and `buffer.bin` | Import, manually group into `VULCAN_BASE`, `VULCAN_SHOULDER`, `VULCAN_ELBOW`, `VULCAN_WRIST`, `VULCAN_TOOL`; establish pivots; export desktop/mobile GLBs | Vulcan hero scene |
| `VUL-IMG-01` | `C:\Users\willi\Downloads\arm.png` 3840×2160 | AVIF/WebP responsive copies; preserve wide composition | Vulcan hero media plane |
| `VUL-IMG-02` | `C:\Users\willi\Downloads\arm2.png` 3840×2160 | AVIF/WebP responsive copies | Vulcan mechanism beat |
| `VUL-IMG-03` | `C:\Users\willi\Downloads\arm4.png` 3840×2160 | AVIF/WebP responsive copies | Vulcan final assembly beat |
| `VUL-DOC-01` | `C:\Users\willi\Downloads\zine.jpg` 1410×2000 | Preserve portrait ratio; use `contain` | Vulcan technical poster |
| `END-3D-01` | `C:\Users\willi\Downloads\Ender3-2\CAD\ender33_asm.stp` | CPU-tessellate with CadQuery/OpenCascade, convert Z-up to Y-up, center from measured bounds, export GLB | Ender3-2 interactive model |
| `END-IMG-01–04` | `C:\Users\willi\Downloads\Ender3-2\photos\img_0482.jpg`, `img_0478.jpg`, `img_0480.jpg`, and `img_0408.jpg` | Auto-orient, resize only, preserve full framing with `object-fit: contain` | Ender3-2 evidence gallery |
| `FRC-IMG-01` | Team photograph embedded on page 2 of `FRC Team 3598 w_ Code.pdf` | Extract at high resolution without covering faces | Team 3598 group photo and helix plane |
| `FRC-IMG-02` | Competition photograph embedded on page 1 of `FRC Team 3598 w_ Code.pdf` | Crop to the complete student group | Team 3598 helix and gallery |
| `FRC-DOC-01` | Outreach totals embedded on page 2 of `FRC Team 3598 w_ Code.pdf` | Crop as a factual evidence panel; keep the 4,452 total legible | Team 3598 helix and gallery |
| `FRC-DOC-02` | Team identity panel embedded on page 1 of `FRC Team 3598 w_ Code.pdf` | Preserve title, location, founding year, and team photograph | Team 3598 helix and gallery |
| `CSI-DATA-01` | `D:\CSIWORK` | Generate waveforms, sampling markers, and capture diagrams | CSI |

## External technical models

| ID | Source | Treatment | Destination |
|---|---|---|---|
| `CSI-3D-01` | [Espressif official KiCad 3D library](https://github.com/espressif/kicad-libraries/tree/main/3dmodels/espressif.3dshapes), use `ESP32-C6-WROOM-1.STEP` | CPU-tessellate; place on a procedurally modeled board | CSI interactive board |
| `CSI-REF-01` | [ESP32-C6-DevKitC-1 hardware reference](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c6/esp32-c6-devkitc-1/user_guide.html) | Use for board proportions, connectors, buttons, pins, and component placement | CSI board accuracy |

## Lighting and texture assets

| ID | Source | Runtime use |
|---|---|---|
| `ENV-01` | [Poly Haven Studio Small 02](https://polyhaven.com/a/studio_small_02) | 2K HDRI, PMREM reflections only; invisible background |
| `MAT-01` | [Poly Haven Blue Metal Plate](https://polyhaven.com/a/blue_metal_plate) | 1K normal and roughness maps only; base color remains procedural |
| `MAT-02` | [Poly Haven Rubber Tiles](https://polyhaven.com/a/rubber_tiles) | 1K normal and roughness maps on limited Ender work surface |
| `FONT-01` | [Manrope Variable](https://github.com/google/fonts/tree/main/ofl/manrope) | Self-hosted display/body type |
| `FONT-02` | [DM Mono](https://github.com/google/fonts/tree/main/ofl/dmmono) | Self-hosted technical labels |

## Procedural assets

No downloads are needed for:

- Persistent signal waveform trace.
- CSI subcarrier field, ring buffer, packet rings, and waveform ribbon.
- Vulcan belt paths, torque rings, exploded labels, and joint axes.
- Ender toolpath, extrusion filament, layer grid, and plotter line.
- Team 3598 competition truss supporting first-party media planes.
- Fog, restrained dust, chapter platforms, portals, cursor, and index.
- Final `WN` geometry.
- All sound effects, synthesized with Web Audio and muted by default.

## Material palette

- Background metal: `#080B12`, metallic `0.72`, roughness `0.31`.
- X-ray polycarbonate: transmission `0.72`, thickness `0.18`, roughness `0.16`.
- Persistent signal: ion gold `#E5B86B`.
- CS light: spectral violet `#8176E9`.
- Mechanical light: oxidized copper `#C8774D`.
- Leadership light: muted crimson `#B95C6B`.
- Text: soft ivory `#F0EDE6`.

## Model budgets

| Model | Desktop | Mobile |
|---|---:|---:|
| Vulcan | ≤180k triangles, ≤8 MB | ≤60k triangles, ≤3 MB |
| Ender3-2 | Current source-faithful GLB: 454,559 triangles, 8.15 MB; loaded only near its chapter | Same deferred GLB; revisit with a validated LOD before deployment |
| CSI board | ≤45k triangles, ≤2 MB | ≤18k triangles, ≤800 KB |

## CPU-only processing

Use `C:\Steam\steamapps\common\Blender\blender.exe --background --python ...` for geometry preparation only. Do not select Cycles, Eevee, Workbench, GPU baking, or offline animation rendering. Use ImageMagick and FFmpeg for CPU-side media conversion.

After Blender export, run glTF Transform `inspect`, `dedup`, `weld`, `prune`, `simplify`, `meshopt`, and `validate`.

## Runtime lighting

- ACES filmic tone mapping, exposure `0.82`, sRGB output.
- Studio Small 02 via PMREM, environment intensity `0.28`, background hidden.
- One broad RectAreaLight key.
- One chapter-colored rim.
- One soft fill.
- At most one shadow-casting spotlight.
- Desktop shadows 2048; mobile shadows 1024.
- Selective bloom only on emissive signal objects, approximate intensity `0.35`.
- Vignette `0.28`, monochromatic noise `0.015`.
- No full-scene bloom, chromatic aberration, or depth-of-field over copy.

## Animation ownership

GSAP owns one reversible master timeline driven by normalized journey progress. Three.js owns camera curves and shader motion. `useFrame` is reserved for continuous effects such as signal propagation and filament flow.

Signal transformations:

`waveform trace → CSI pulse → timing belt → printer toolpath → 3598 media helix → WN mark`

## Excluded

- `vulcan-entry1.mp4` because it is a screen recording rather than finished project media.
- `vulcan-30.jpeg` because it is too small.
- TruTone screenshots and TruTone as a main showcase chapter.
- OpenMontage, random repository names, generic stock imagery, generic 3D props, and AI-generated representations of real projects.
- Reddit archive videos and any in-progress/unprofessional image.

"""CPU-only Blender mesh simplification. No rendering or baking is performed."""

import sys
from pathlib import Path

import bpy


def main() -> None:
    separator = sys.argv.index("--")
    source = Path(sys.argv[separator + 1])
    destination = Path(sys.argv[separator + 2])
    ratio = float(sys.argv[separator + 3])

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(source))
    for obj in [item for item in bpy.context.scene.objects if item.type == "MESH"]:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        modifier = obj.modifiers.new(name="Web decimation", type="DECIMATE")
        modifier.ratio = ratio
        modifier.use_collapse_triangulate = True
        bpy.ops.object.modifier_apply(modifier=modifier.name)
        obj.select_set(False)

    destination.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(destination),
        export_format="GLB",
        export_apply=True,
        export_materials="EXPORT",
        export_cameras=False,
        export_lights=False,
    )


main()

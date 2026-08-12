"""Convert a STEP assembly to a centered, web-ready GLB using CPU tessellation."""

from __future__ import annotations

import argparse
from pathlib import Path

import cadquery as cq
import numpy as np
import trimesh


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--tolerance", type=float, default=0.8)
    parser.add_argument("--angular-tolerance", type=float, default=0.35)
    parser.add_argument("--scale", type=float, default=0.01)
    args = parser.parse_args()

    assembly = cq.importers.importStep(str(args.source))
    shape = assembly.val()
    vertices, triangles = shape.tessellate(args.tolerance, args.angular_tolerance)

    points = np.asarray([[vertex.x, vertex.y, vertex.z] for vertex in vertices], dtype=np.float32)
    faces = np.asarray(triangles, dtype=np.int32)

    # STEP is Z-up. Three.js is Y-up. Center the machine on its bed footprint
    # and place its lowest point at y=0 so scene placement is deterministic.
    center_x = (points[:, 0].min() + points[:, 0].max()) * 0.5
    center_y = (points[:, 1].min() + points[:, 1].max()) * 0.5
    min_z = points[:, 2].min()
    converted = np.column_stack(
        (
            (points[:, 0] - center_x) * args.scale,
            (points[:, 2] - min_z) * args.scale,
            -(points[:, 1] - center_y) * args.scale,
        )
    )

    material = trimesh.visual.material.PBRMaterial(
        name="Ender3-2",
        baseColorFactor=[34, 40, 47, 255],
        metallicFactor=0.72,
        roughnessFactor=0.34,
    )
    mesh = trimesh.Trimesh(vertices=converted, faces=faces, process=True)
    mesh.visual = trimesh.visual.TextureVisuals(material=material)
    mesh.remove_unreferenced_vertices()
    mesh.fix_normals()

    args.destination.parent.mkdir(parents=True, exist_ok=True)
    mesh.export(args.destination, file_type="glb")
    print(f"vertices={len(mesh.vertices)} faces={len(mesh.faces)} bounds={mesh.bounds.tolist()}")
    print(f"wrote={args.destination} bytes={args.destination.stat().st_size}")


if __name__ == "__main__":
    main()

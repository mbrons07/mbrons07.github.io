#!/bin/bash
SRC="src/components/projects"
DEST="public/assets"

cp "$SRC/cover art now you dye.png" "$DEST/cover_art_now_you_dye.png"
cp "$SRC/Cava Cool.png"             "$DEST/cava_cool.png"
cp "$SRC/Pani cool.png"             "$DEST/pani_cool.png"
cp "$SRC/Risk Cool.png"             "$DEST/risk_cool.png"
cp "$SRC/unreal anim.png"           "$DEST/unreal_anim.png"
cp "$SRC/dash bp.png"               "$DEST/dash_bp.png"

echo "✓ Done! Copied:"
ls "$DEST" | grep -E "cover|cava|pani|risk|unreal|dash"

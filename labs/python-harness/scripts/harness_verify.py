"""Pass-state gating: run verification for active feature(s); promote to passing on success."""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEATURE_LIST = ROOT / "docs" / "feature_list.json"


def main() -> int:
    data = json.loads(FEATURE_LIST.read_text(encoding="utf-8"))
    active = [f for f in data["features"] if f.get("state") == "active"]
    wip = data["rules"].get("wip_limit", 1)

    if len(active) > wip:
        print(f"ERROR: {len(active)} active features (WIP limit {wip})")
        return 1

    if not active:
        print("No active feature — nothing to verify")
        return 0

    for feature in active:
        cmd = feature.get("verification", "")
        print(f"Verifying {feature['id']}: {cmd}")
        result = subprocess.run(cmd, shell=True, cwd=ROOT)
        if result.returncode != 0:
            print(f"FAIL {feature['id']} — state stays active (pass-state gating)")
            return result.returncode

        feature["state"] = "passing"
        feature.setdefault("evidence", {})
        feature["evidence"]["verified_at"] = datetime.now(timezone.utc).isoformat()
        print(f"PASS {feature['id']} -> passing")

    FEATURE_LIST.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("feature_list.json updated by harness")
    return 0


if __name__ == "__main__":
    sys.exit(main())

from harness_lab.cart import Cart


def test_f01_cart_add_increases_total():
    cart = Cart()
    cart.add("notebook", 2)
    cart.add("pen", 1)
    assert cart.total_items() == 3


def test_f01_cart_rejects_empty_name():
    cart = Cart()
    try:
        cart.add("")
    except ValueError:
        pass
    else:
        raise AssertionError("expected ValueError for empty name")


def test_f02_repo_has_architecture_doc():
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    assert (root / "docs" / "ARCHITECTURE.md").is_file()


def test_f02_repo_has_constraints_doc():
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    assert (root / "docs" / "CONSTRAINTS.md").is_file()


def test_f03_feature_list_wip_limit_one():
    import json
    from pathlib import Path

    root = Path(__file__).resolve().parents[1]
    data = json.loads((root / "docs" / "feature_list.json").read_text(encoding="utf-8"))
    active = [f for f in data["features"] if f.get("state") == "active"]
    assert len(active) <= data["rules"]["wip_limit"]

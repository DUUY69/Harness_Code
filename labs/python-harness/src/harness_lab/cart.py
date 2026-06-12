"""Lab task domain: simple shopping cart (giỏ hàng)."""


class Cart:
    def __init__(self) -> None:
        self._items: list[dict[str, int | str]] = []

    def add(self, name: str, quantity: int = 1) -> None:
        if not name or not name.strip():
            raise ValueError("name required")
        if quantity < 1:
            raise ValueError("quantity must be >= 1")
        self._items.append({"name": name.strip(), "quantity": quantity})

    def total_items(self) -> int:
        return sum(item["quantity"] for item in self._items)

    def clear(self) -> None:
        self._items.clear()

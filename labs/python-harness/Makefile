.PHONY: setup test check verify

setup:
	pip install -e ".[dev]"

test:
	python -m pytest -q

check: test

verify:
	python scripts/harness_verify.py

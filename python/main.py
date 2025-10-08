# main.py
import sys
from typing import List, Tuple

TARGET = "XMAS"
DIRS: List[Tuple[int, int]] = [
    (-1,-1), (-1,0), (-1,1),
    ( 0,-1),         ( 0,1),
    ( 1,-1), ( 1,0), ( 1,1),
]

def count_xmas(grid: List[str]) -> int:
    if not grid: return 0
    R, C = len(grid), len(grid[0])
    total = 0

    def inb(r, c): return 0 <= r < R and 0 <= c < C

    for r in range(R):
        for c in range(C):
            if grid[r][c] != TARGET[0]:
                continue
            for dr, dc in DIRS:
                ok = True
                for k in range(1, len(TARGET)):
                    nr, nc = r + dr*k, c + dc*k
                    if not inb(nr, nc) or grid[nr][nc] != TARGET[k]:
                        ok = False
                        break
                if ok:
                    total += 1
    return total

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 main.py <input_file>", file=sys.stderr)
        sys.exit(1)
    with open(sys.argv[1], "r", encoding="utf-8") as f:
        grid = [line.strip() for line in f if line.strip()]
    print(count_xmas(grid))

if __name__ == "__main__":
    main()

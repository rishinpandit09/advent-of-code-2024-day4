#!/usr/bin/env node
import fs from "fs";

const TARGET = "XMAS";
const DIRS = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];

function countXMAS(grid) {
  if (!grid.length) return 0;
  const R = grid.length;
  const C = grid[0].length;
  let total = 0;

  const inBounds = (r, c) => r >= 0 && r < R && c >= 0 && c < C;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] !== TARGET[0]) continue;
      for (const [dr, dc] of DIRS) {
        let ok = true;
        for (let k = 1; k < TARGET.length; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (!inBounds(nr, nc) || grid[nr][nc] !== TARGET[k]) {
            ok = false;
            break;
          }
        }
        if (ok) total++;
      }
    }
  }
  return total;
}

function main() {
  const path = process.argv[2];
  if (!path) {
    console.error("Usage: node index.mjs <input_file>");
    process.exit(1);
  }
  const input = fs.readFileSync(path, "utf-8")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  const count = countXMAS(input);
  console.log(count);
}

main();

import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = await fs.open(path.resolve(__dirname, "1.txt"));
let l1 = [];
let l2 = [];
let sum = 0;

for await (const line of file.readLines()) {
  const splitter = line.split(/\s+/);
  console.log(splitter);
  l1.push(parseInt(splitter[0]));
  l2.push(parseInt(splitter[splitter.length - 1]));
}

l1 = l1.sort();
l2 = l2.sort();

const firstAnswer = async () => {
  sum = 0;
  for (const line in l1) {
    sum += Math.abs(l1[line] - l2[line]);
  }
  return sum;
};

const secondAnswer = async () => {
  sum = 0;
  for (const line of l1) {
    const amount = l2.filter((item) => item == line);
    if (amount.length > 0) {
      sum += amount.length * line;
    }
  }
  return sum;
};

console.log(await firstAnswer());
console.log(await secondAnswer());

import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = await fs.open(path.resolve(__dirname, "2.txt"));
const reports = [];
for await (const line of file.readLines()) {
  //console.log(line);
  let last = "";

  let numbers = line.split(/\s/).map((num) => parseInt(num));
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      console.log("numbers", i, numbers[i + 1], numbers[i]);
      if (numbers[i + 1] > numbers[i]) {
        last = "inc";
      } else if (numbers[i + 1] < numbers[i]) {
        last = "dec";
      } else {
        reports.push("unsafe");
        break;
      }
    }
    if (i <= numbers.length - 2) {
      if (last === "inc") {
        const comp = numbers[i + 1] - numbers[i];
        console.log("comp", numbers[i + 1], numbers[i], comp);
        if (comp <= 0 || comp > 3) {
          reports.push("unsafe");
          break;
        }
      }
      if (last === "dec") {
        const comp = numbers[i + 1] - numbers[i];
        if (comp >= 0 || comp < -3) {
          reports.push("unsafe");
          break;
        }
      }
    } else {
      reports.push("safe");
      break;
    }
  }
}
console.log(reports.filter((report) => report === "safe").length);

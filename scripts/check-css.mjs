// Verificações de CSS que o ESLint não cobre:
// 1. tokens.css é cópia fiel de design/tokens/protea.css (fonte única, valores intactos);
// 2. nenhum .css fora de src/core/theme tem cor solta (hex, rgb(), hsl(), oklch()…).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const problems = [];

const source = readFileSync(join(root, "design/tokens/protea.css"), "utf8").replace(/\r\n/g, "\n");
const copy = readFileSync(join(root, "src/core/theme/tokens.css"), "utf8").replace(/\r\n/g, "\n");
if (source !== copy) {
  problems.push("src/core/theme/tokens.css difere de design/tokens/protea.css. Copie de novo a fonte, sem editar.");
}

const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".css")) check(path);
  }
}
function check(path) {
  const rel = relative(root, path).split(sep).join("/");
  if (rel.startsWith("src/core/theme/")) return;
  const text = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  text.split("\n").forEach((line, i) => {
    if (COLOR.test(line)) problems.push(`${rel}:${i + 1} cor solta fora de src/core/theme: ${line.trim()}`);
  });
}
walk(join(root, "src"));

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("CSS ok: tokens intactos e sem cor solta.");

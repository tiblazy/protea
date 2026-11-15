import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

// Cor solta: hex, ou valor arbitrário de cor no Tailwind (bg-[#…], text-[rgb(…)], border-[color-mix(…)]…).
// Cor só por token; os valores moram em src/core/theme (PLANO §1, CLAUDE.md).
const HEX_COLOR = "#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-zA-Z_-])";
const ARBITRARY_COLOR = "\\[(?:#|rgba?\\(|hsla?\\(|oklch\\(|oklab\\(|lab\\(|lch\\(|hwb\\(|color-mix\\(|color\\()";
const COLOR_MESSAGE =
  "Cor solta fora de src/core/theme. Use um token (ex.: bg-musgo, text-tx2, var(--protea)); se faltar, crie o token primeiro.";

const LOOSE_COLOR = `${HEX_COLOR}|${ARBITRARY_COLOR}`;
const noLooseColor = [
  "error",
  { selector: `Literal[value=/${LOOSE_COLOR}/]`, message: COLOR_MESSAGE },
  { selector: `TemplateElement[value.raw=/${LOOSE_COLOR}/]`, message: COLOR_MESSAGE },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Fronteiras entre módulos (PLANO §3): app → features (só pelo index.ts) → shared + core.
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "feature", pattern: "src/features/*", capture: ["name"] },
        { type: "shared", pattern: "src/shared" },
        { type: "core", pattern: "src/core" },
      ],
    },
    rules: {
      "boundaries/no-unknown-files": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            // a rota só conhece a feature pela porta da frente
            {
              from: { element: { type: "app" } },
              allow: {
                to: [
                  { element: { type: "app" } },
                  { element: { type: "feature", fileInternalPath: "index.{ts,tsx}" } },
                  { element: { types: ["shared", "core"] } },
                ],
              },
            },
            // uma feature usa a si mesma por dentro e as outras só pelo index.ts
            {
              from: { element: { type: "feature" } },
              allow: {
                to: [
                  { element: { type: "feature", captured: { name: "{{ from.element.captured.name }}" } } },
                  { element: { type: "feature", fileInternalPath: "index.{ts,tsx}" } },
                  { element: { types: ["shared", "core"] } },
                ],
              },
            },
            // shared e core são a base: usam um ao outro, nunca features nem app
            {
              from: { element: { types: ["shared", "core"] } },
              allow: { to: { element: { types: ["shared", "core"] } } },
            },
          ],
        },
      ],
    },
  },

  // Sem cor solta fora de core/theme.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/core/theme/**"],
    rules: { "no-restricted-syntax": noLooseColor },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;

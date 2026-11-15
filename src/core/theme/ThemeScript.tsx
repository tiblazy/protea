import { buildThemeScript } from "./prefs";

const script = buildThemeScript();

/** Vai no <head>: roda antes do primeiro paint e aplica tema, modo e movimento salvos. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

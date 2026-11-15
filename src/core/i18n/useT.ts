"use client";

import { useCallback } from "react";
import { useTheme } from "@/core/theme/ThemeProvider";
import type { LabelKey } from "./labels";
import { t } from "./translate";

/** `t()` já ligado ao tema atual. Para texto visível prefira `<T k=… />`, que não pisca. */
export function useT() {
  const { theme } = useTheme();
  return useCallback((key: LabelKey) => t(key, theme), [theme]);
}

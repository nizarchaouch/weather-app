export function weatherGradient(code: number, is_day: boolean): string {
  if (!is_day)
    return "linear-gradient(135deg, hsl(250 60% 25%), hsl(230 50% 15%))";
  if (code === 0 || code === 1)
    return "linear-gradient(135deg, hsl(199 89% 55%), hsl(42 100% 65%))";
  if (code === 2)
    return "linear-gradient(135deg, hsl(210 60% 50%), hsl(215 25% 70%))";
  if (code === 3 || code === 45 || code === 48)
    return "linear-gradient(135deg, hsl(215 20% 50%), hsl(220 15% 35%))";
  if (code >= 51 && code <= 67)
    return "linear-gradient(135deg, hsl(210 70% 45%), hsl(220 50% 25%))";
  if (code >= 71 && code <= 77)
    return "linear-gradient(135deg, hsl(200 30% 80%), hsl(210 40% 55%))";
  if (code >= 80 && code <= 82)
    return "linear-gradient(135deg, hsl(210 80% 40%), hsl(230 60% 22%))";
  if (code >= 95)
    return "linear-gradient(135deg, hsl(260 50% 30%), hsl(220 60% 15%))";
  return "linear-gradient(135deg, hsl(199 89% 55%), hsl(280 80% 65%))";
}

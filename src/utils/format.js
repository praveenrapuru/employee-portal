export function toNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  }
  return 0;
}


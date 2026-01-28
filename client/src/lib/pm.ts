export const PM_MODE = true;

export function isPmModeEnabled() {
  return PM_MODE || localStorage.getItem("quickwit:pm_mode") === "true";
}

export function setPmModeEnabled(enabled: boolean) {
  localStorage.setItem("quickwit:pm_mode", enabled ? "true" : "false");
}

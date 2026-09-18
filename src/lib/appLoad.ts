/** Shared flag so heroes know the initial LoadingScreen already finished. */
let appLoadComplete = false;

export function markAppLoadComplete() {
  appLoadComplete = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("loadingComplete"));
  }
}

export function isAppLoadComplete() {
  return appLoadComplete;
}

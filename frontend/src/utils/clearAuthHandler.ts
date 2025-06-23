let clearAuthCallback: ((afterClear?: () => void) => void) | null = null;

export function setClearAuthCallback(cb: (afterClear?: () => void) => void) {
  clearAuthCallback = cb;
}

export function triggerClearAuth(afterClear?: () => void) {
  if (clearAuthCallback) {
    clearAuthCallback(afterClear);
  }
}

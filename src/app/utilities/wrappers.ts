import { environment } from "src/environments/environment";

export function tryCatch(func: Function, onError?: Function | undefined | null): Function {
  if (typeof func !== 'function') {
    return function() { }
  }

  return function() {
    try {
      return func.apply(this, arguments);
    } catch (e) {
      if (typeof onError === 'function') {
        return onError(e)
      };

      return null;
    }
  }
}
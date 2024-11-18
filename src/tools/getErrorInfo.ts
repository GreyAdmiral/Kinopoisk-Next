type ErrorsType = Record<number | string, string>;

const ERRORS: ErrorsType = {
   401: 'Wrong token.',
   402: 'Request limit exceeded.',
   403: 'Request limit exceeded.',
   404: 'Request limit exceeded.',
   429: 'Too many requests.',
   default: 'Looks like there was a problem.',
} as const;

export function getErrorInfo(code: keyof typeof ERRORS) {
   return ERRORS[code] || ERRORS.default;
}

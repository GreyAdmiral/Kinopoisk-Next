type ErrorsType = Record<number | string, string | null>;

const ERRORS: ErrorsType = {
   401: 'Неправильный токен.',
   402: 'Превышен лимит запросов.',
   403: 'Превышен лимит запросов.',
   404: 'Превышен лимит запросов.',
   429: 'Слишком много запросов.',
   default: null,
} as const;

export function getErrorInfo(code: keyof typeof ERRORS) {
   return ERRORS[code] || ERRORS.default;
}

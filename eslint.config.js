export default [
  {
    files: ['src/app.carved.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly', document: 'readonly', navigator: 'readonly',
        console: 'readonly', location: 'readonly', history: 'readonly',
        URL: 'readonly', URLSearchParams: 'readonly', fetch: 'readonly',
        setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly',
        requestAnimationFrame: 'readonly', IntersectionObserver: 'readonly', MutationObserver: 'readonly', ResizeObserver: 'readonly',
        HTMLElement: 'readonly', HTMLInputElement: 'readonly', HTMLSelectElement: 'readonly', HTMLTemplateElement: 'readonly', HTMLAnchorElement: 'readonly', HTMLImageElement: 'readonly',
        Element: 'readonly', Node: 'readonly', NodeFilter: 'readonly', DOMParser: 'readonly', CustomEvent: 'readonly', Event: 'readonly', KeyboardEvent: 'readonly',
        localStorage: 'readonly', sessionStorage: 'readonly', getComputedStyle: 'readonly',
        AbortController: 'readonly', Blob: 'readonly', FormData: 'readonly', XMLHttpRequest: 'readonly', Image: 'readonly', CSS: 'readonly', crypto: 'readonly',
      },
    },
    rules: { 'no-undef': 'error' },
  },
];

import DOMPurify from "dompurify";

export const sanitizeHTML = (html: string) => {
  if (typeof window === "undefined") {
    return html; // o maneja fallback en SSR
  }

  return DOMPurify.sanitize(html);
};
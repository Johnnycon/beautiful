import { useState } from "react";

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Error keys are the field name when it's empty and `<name>Invalid` when the value
// has the wrong shape (bad email, past date, short phone number). Forms translate
// them from their own `errors` messages.
function errorKey(field: Field) {
  return field.validity.valueMissing ? field.name : `${field.name}Invalid`;
}

// Inline, translated validation on top of the browser's constraint checks
// (required, type, min, pattern). Forms set `noValidate` and call `validate` on submit.
export function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Checks every field inside `scope`, shows the errors and focuses the first invalid field
  const validate = (scope: ParentNode | null | undefined) => {
    if (!scope) return false;
    const next: Record<string, string> = {};
    let first: Field | undefined;
    scope.querySelectorAll<Field>("input, select, textarea").forEach((field) => {
      if (!field.name || field.validity.valid || next[field.name]) return;
      next[field.name] = errorKey(field);
      first ??= field;
    });
    setErrors(next);
    // Focus after the error text renders so screen readers announce it with the field
    if (first) requestAnimationFrame(() => first?.focus());
    return !first;
  };

  // Once a field has been flagged, re-check it as the visitor fixes it
  const recheck = (field: Field) => {
    const key = field.validity.valid ? undefined : errorKey(field);
    setErrors((prev) => {
      if (!(field.name in prev)) return prev;
      const next = { ...prev };
      if (key) next[field.name] = key;
      else delete next[field.name];
      return next;
    });
  };

  return { errors, validate, recheck, clearErrors: () => setErrors({}) };
}

// Joins hint and error ids for aria-describedby, skipping the ones not shown
export function describedBy(...ids: (string | false | undefined)[]) {
  return ids.filter(Boolean).join(" ") || undefined;
}

// The browser accepts "name@gmail"; also require a domain ending like ".com"
export const emailPattern = "[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}";

// At least 10 digits, with any spacing or punctuation
export const phonePattern = "\\D*(\\d\\D*){10,}";

// Tidies a US number to (312) 555-1234; anything else is left as typed
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10 || value.trim().startsWith("+")) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

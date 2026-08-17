"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;

const EMPTY: FormValues = { name: "", email: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < MESSAGE_MIN) {
    errors.message = `A little more detail, please — at least ${MESSAGE_MIN} characters.`;
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

const fieldClass = (hasError: boolean) =>
  cn(
    "w-full rounded-lg border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground",
    "placeholder:text-muted/70 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-accent/40",
    hasError ? "border-red-500/70 focus:border-red-500" : "border-border focus:border-accent/60",
  );

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  /** Bot trap — a real visitor never fills this in. */
  const [honeypot, setHoneypot] = useState("");

  const errors = useMemo(() => validate(values), [values]);
  const showError = (field: Field) =>
    (touched[field] || status === "error") && errors[field];

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name || "…"}`);
    const body = encodeURIComponent(values.message);
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [values.name, values.message]);

  const update = (field: Field) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setServerMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const payload: { ok?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setServerMessage(
          payload.message ??
            "Something went wrong sending that. You can email me directly instead.",
        );
        return;
      }

      setStatus("success");
      setServerMessage(payload.message ?? "Thanks — I'll get back to you shortly.");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
      setServerMessage(
        "Couldn't reach the server. You can email me directly instead.",
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name")(event.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? "name-error" : undefined}
            placeholder="Ada Lovelace"
            className={fieldClass(Boolean(showError("name")))}
          />
          {showError("name") ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email")(event.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={showError("email") ? "email-error" : undefined}
            placeholder="you@company.com"
            className={fieldClass(Boolean(showError("email")))}
          />
          {showError("email") ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <span
            className={cn(
              "numeric text-[11px]",
              values.message.length > MESSAGE_MAX ? "text-red-400" : "text-muted",
            )}
          >
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => update("message")(event.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          aria-invalid={Boolean(showError("message"))}
          aria-describedby={showError("message") ? "message-error" : undefined}
          placeholder="What are you building, and where might I fit?"
          className={cn(fieldClass(Boolean(showError("message"))), "resize-y")}
        />
        {showError("message") ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: visually hidden, ignored by real users, filled by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground",
            "transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0",
          )}
        >
          {isSubmitting ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        <a
          href={mailtoHref}
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          or email me directly
        </a>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" || status === "error" ? (
          <motion.p
            key={status + serverMessage}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-start gap-2 rounded-lg border px-4 py-3 text-sm",
              status === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/40 bg-red-500/10 text-red-400",
            )}
          >
            {status === "success" ? (
              <CircleCheck size={16} className="mt-0.5 shrink-0" />
            ) : (
              <CircleAlert size={16} className="mt-0.5 shrink-0" />
            )}
            <span>{serverMessage}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

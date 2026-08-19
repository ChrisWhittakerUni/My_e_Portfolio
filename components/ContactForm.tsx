"use client";

import { Mail } from "lucide-react";
import { useMemo, useState } from "react";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type FormValues = Record<Field, string>;

const MESSAGE_MAX = 2000;
const EMPTY: FormValues = { name: "", email: "", message: "" };

const fieldClass = () =>
  cn(
    "w-full rounded-lg border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground",
    "placeholder:text-muted/70 transition-colors",
    "focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40",
  );

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${values.name || "…"}`,
    );
    const body = encodeURIComponent(values.message);
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [values.name, values.message]);

  const update = (field: Field) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
            placeholder="Jane Doe"
            className={fieldClass()}
          />
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
            placeholder="you@company.com"
            className={fieldClass()}
          />
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
              values.message.length > MESSAGE_MAX
                ? "text-red-400"
                : "text-muted",
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
          placeholder="Hi, I'm interested in learning more about ..."
          className={cn(fieldClass(), "resize-y")}
        />
      </div>

      <div className="flex items-center">
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          <Mail size={16} />
          Email me directly
        </a>
      </div>
    </form>
  );
}
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function EmptyState({
  emoji,
  title,
  description,
  actionLabel,
  actionTo,
  children,
}: {
  emoji: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: "/" | "/search" | "/cart" | "/orders";
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-up">
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-coral-100 to-cream-200 text-5xl shadow-card">
        {emoji}
      </div>
      <h2 className="font-display text-xl font-semibold text-charcoal-900">
        {title}
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-charcoal-700/65">
        {description}
      </p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="pressable mt-6 inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-coral-500 px-6 text-sm font-semibold text-white shadow-card transition hover:bg-coral-600"
        >
          {actionLabel}
        </Link>
      )}
      {children}
    </div>
  );
}

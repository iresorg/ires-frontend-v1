import type { ReactNode } from "react";

type DashboardPanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
};

/** Shared glass panel for dashboard widgets */
export default function DashboardPanel({
  children,
  className = "",
  title,
  action,
}: DashboardPanelProps) {
  return (
    <section
      className={`rounded-2xl bg-[#141327]/90 p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {title}
            </h2>
          ) : (
            <span />
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

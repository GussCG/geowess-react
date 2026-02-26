import React from "react";

interface SectionProps {
  title?: string;
  variant?: "default" | "kpi" | "chart" | "list" | "table";
  actions?: React.ReactNode;
  subHeader?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({
  title,
  variant = "default",
  actions,
  subHeader,
  children,
}: SectionProps) {
  return (
    <section className={`section section--${variant}`}>
      {(title || actions) && (
        <div className="section-header">
          {title && <h3 className="section-title">{title}</h3>}
          {actions && <div className="section-actions">{actions}</div>}
        </div>
      )}

      {subHeader && <div className="section-subheader">{subHeader}</div>}

      <div className="section-content">{children}</div>
    </section>
  );
}

import React from "react";

interface SectionProps {
  title?: string;
  variant?: "default" | "kpi" | "chart" | "list" | "table";
  children: React.ReactNode;
}

export default function Section({
  title,
  variant = "default",
  children,
}: SectionProps) {
  return (
    <section className={`section section--${variant}`}>
      {title && (
        <div className="section-header">
          <h3 className="section-title">{title}</h3>
        </div>
      )}
      <div className="section-content">{children}</div>
    </section>
  );
}

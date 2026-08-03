import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function Container({ children, className, compact = false }: ContainerProps) {
  const baseClass = compact ? "compact-container" : "content-grid";
  return <div className={[baseClass, className].filter(Boolean).join(" ")}>{children}</div>;
}

import React, { useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const isMobile = window.innerWidth < 768;

    const grid = GridStack.init(
      {
        column: 12,
        margin: 10,
        float: true,
        cellHeight: isMobile ? 80 : 140,
        resizable: {
          handles: "all",
        },
        columnOpts: {
          breakpoints: [
            { w: 768, c: 12 },
            { w: 0, c: 1 },
          ],
        },
      },
      gridRef.current,
    );

    return () => {
      grid.destroy(false);
    };
  }, []);

  return (
    <div className="grid-stack" ref={gridRef}>
      {children}
    </div>
  );
}

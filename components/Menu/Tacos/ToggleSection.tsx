"use client";
import React, { useState, useRef, useEffect } from "react";

interface ToggleSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({
  title,
  children,
  initiallyOpen = true,
}) => {
  const [open, setOpen] = useState(initiallyOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(initiallyOpen ? "auto" : 0);

  useEffect(() => {
    if (open) {
      const scrollHeight = contentRef.current?.scrollHeight ?? 0;
      setHeight(scrollHeight);
      // Wait for transition, then reset to auto to allow dynamic height content
      const timeout = setTimeout(() => setHeight("auto"), 300);
      return () => clearTimeout(timeout);
    } else {
      setHeight(contentRef.current?.scrollHeight ?? 0);
      // Trigger height to 0 after a tiny delay for animation
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div className="mb-6 border border-gray-300 rounded-md overflow-hidden shadow-sm transition-all">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-KebabGreen text-white font-semibold text-lg focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height, transition: "max-height 0.3s ease" }}
        className="overflow-hidden bg-white"
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default ToggleSection;


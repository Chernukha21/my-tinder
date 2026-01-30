"use client";

import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button, cn } from "@heroui/react";

type Props = {
  anchorRef: RefObject<HTMLDivElement | null>;
};

export default function SidebarTopButton({ anchorRef }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [left, setLeft] = useState(10);

  const btnWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const recalc = useCallback(() => {
    const anchor = anchorRef.current;
    const btn = btnWrapRef.current;
    if (!anchor || !btn) return;

    const a = anchor.getBoundingClientRect();
    const b = btn.getBoundingClientRect();

    const newLeft = a.left + a.width / 2 - b.width / 2;

    setLeft(Math.round(newLeft));
  }, [anchorRef]);

  useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);

    const anchor = anchorRef.current;
    const ro = anchor ? new ResizeObserver(() => recalc()) : null;
    if (anchor && ro) ro.observe(anchor);

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [recalc, anchorRef]);

  useEffect(() => {
    const el = document.getElementById("member-sidebar-sentinel");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goToTop = () => {
    document.getElementById("member-sidebar-sentinel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={btnWrapRef}
      style={{
        position: "fixed",
        left,
        bottom: 80,
        zIndex: 999999,
        visibility: show ? "visible" : "hidden",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className={cn("relative inline-flex", show && "animate-borderPulse")}>
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/70" />
        <Button
            radius="full"
            onPress={goToTop}
            className="relative bg-background text-blue-600 shadow-lg"
            color="primary"
            variant="bordered"
        >
          Go to profile <span className="inline-block animate-bounce">↑</span>
        </Button>
      </div>
    </div>,
    document.body
  );
}

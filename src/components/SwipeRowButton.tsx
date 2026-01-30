"use client";
import React, { useEffect, useRef, useState } from "react";

type SwipeRowProps = {
  id: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  children: React.ReactNode;
  onOpen: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

const ACTION_WIDTH = 88;
const MAX_LEFT = -ACTION_WIDTH;
const OPEN_THRESHOLD = 36;

export function SwipeRowButton({
                           id,
                           openId,
                           setOpenId,
                           children,
                           onOpen,
                           onDelete,
                           disabled,
                         }: SwipeRowProps) {
  const isOpen = openId === id;

  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<null | "x" | "y">(null);

  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (v: number) => Math.max(MAX_LEFT, Math.min(0, v));

  // синхра с внешним состоянием (открыли/закрыли)
  useEffect(() => {
    if (!isDragging) setOffset(isOpen ? MAX_LEFT : 0);
  }, [isOpen, isDragging]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    axis.current = null;
    startX.current = e.clientX;
    startY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (!axis.current) {
      if (Math.abs(dx) > 8) axis.current = "x";
      else if (Math.abs(dy) > 8) axis.current = "y";
    }
    if (axis.current !== "x") return;

    const base = isOpen ? MAX_LEFT : 0;
    setOffset(clamp(base + dx));
  };

  const finish = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (offset < -OPEN_THRESHOLD) setOpenId(id);
    else setOpenId(null);
  };

  const onClickRow = () => {

    if (isOpen) {
      setOpenId(null);
      return;
    }
    onOpen();
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <button
        type="button"
        className="absolute right-0 top-0 h-full w-[88px] bg-danger text-white text-sm font-medium flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
          setOpenId(null);
        }}
      >
        Delete
      </button>

      <div
        style={{ transform: `translateX(${offset}px)`, touchAction: "pan-y" }}
        className={`relative bg-background ${isDragging ? "" : "transition-transform duration-200"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
        onClick={onClickRow}
      >
        {children}
      </div>
    </div>
  );
}

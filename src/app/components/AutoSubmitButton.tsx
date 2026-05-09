"use client";

import { useEffect, useRef } from "react";

export default function AutoSubmitButton() {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.click(), 1500);
    return () => clearTimeout(t);
  }, []);
  return <button ref={ref} type="submit" className="hidden" />;
}

"use client";

import { useEffect } from "react";

export default function AutoSubmitButton({
  action,
  redirectTo,
}: {
  action: () => Promise<void>;
  redirectTo: string;
}) {
  useEffect(() => {
    const t = setTimeout(async () => {
      await action();
      window.location.replace(redirectTo);
    }, 1500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

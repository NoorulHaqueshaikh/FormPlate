"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSuccess() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <p>Signing you in...</p>;
}

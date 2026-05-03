import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      allowedDevOrigins: ["localhost", "192.168.1.3", "192.168.1.4"],
    };
  }

  return {};
}

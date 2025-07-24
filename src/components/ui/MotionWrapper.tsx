// components/ui/MotionWrapper.tsx
"use client";

import { PropsWithChildren } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="motion">{children}</div>;
};
export default MotionWrapper;

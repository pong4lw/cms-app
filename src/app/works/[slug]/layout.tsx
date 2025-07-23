// app/works/[slug]/layout.tsx
import { Modal } from "@/components/ui/modal";
import { usePathname } from "next/navigation";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <Modal>{children}</Modal>;
}

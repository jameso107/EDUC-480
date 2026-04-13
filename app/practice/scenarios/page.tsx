import type { Metadata } from "next";
import { scenarios } from "@/lib/scenarios";
import { ScenariosClient } from "./ui";

export const metadata: Metadata = {
  title: "Scenarios",
  description: "Interactive scenario practice for responsible AI use.",
};

export default function ScenariosPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Scenario practice
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          For each card, pick the best label. Real assignments vary—use this as
          practice for judgment, not a guarantee about your school.
        </p>
      </header>
      <ScenariosClient scenarios={scenarios} />
    </div>
  );
}

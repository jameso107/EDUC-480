import type { Metadata } from "next";
import { CheckerClient } from "./ui";

export const metadata: Metadata = {
  title: "Is This Okay?",
  description: "Lightweight check for whether a planned AI use sounds appropriate.",
};

export default function CheckerPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Is This Okay?</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Describe how you want to use AI in a few sentences. The checker uses
          simple signals (not a full model judgment), so treat it as a practice
          nudge, not a legal or school policy guarantee.
        </p>
      </header>
      <CheckerClient />
    </div>
  );
}

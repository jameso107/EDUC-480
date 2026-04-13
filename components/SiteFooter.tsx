export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-600">
        <p className="font-medium text-ink">Privacy note</p>
        <p className="mt-2 max-w-2xl">
          This MVP avoids collecting personal information. Chat may be processed
          by a model provider when enabled; do not share private details. Your
          teacher&apos;s rules always override site guidance.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          AI Learning Playbook — educational prototype.
        </p>
      </div>
    </footer>
  );
}

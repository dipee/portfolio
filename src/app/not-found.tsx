import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
      <p className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-4">404</p>
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4">
        Page not found
      </h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        The page you requested does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-6 py-3 rounded-lg font-headline font-bold text-sm uppercase tracking-widest"
      >
        Back to home
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </Link>
    </div>
  );
}

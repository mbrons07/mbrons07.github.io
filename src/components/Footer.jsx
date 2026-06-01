export default function Footer() {
  return (
    <footer className="bg-(--surface) border-t border-(--bordercolor) py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-(--muted) text-sm">
          © {new Date().getFullYear()} Mick Brons. Alle rechten voorbehouden.
        </p>
        {/* Re: Starting from zero, just like someone we know */}
        <p className="text-(--muted) text-xs mt-1 opacity-30 select-none" title="Re: Starting Life in a New World">
          Built from zero.
        </p>
      </div>
    </footer>
  );
}
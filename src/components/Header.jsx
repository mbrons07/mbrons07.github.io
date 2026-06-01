import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function Header() {
  const location = useLocation();
  const { lang, toggle } = useLang();
  const tr = t[lang];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/projects");
    }
    return location.pathname.startsWith(path);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-(--surface) border-b border-(--bordercolor)">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="text-xl font-bold text-(--accent) hover:opacity-80 transition-opacity"
        >
          Portfolio
        </Link>

        {/* Nav links + language toggle */}
        <div className="flex items-center gap-6">

          {/* Language toggle — sits just left of Projects */}
          <button
            onClick={toggle}
            title={lang === "nl" ? "Switch to English" : "Schakel naar Nederlands"}
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-(--bordercolor)
                       text-xs font-semibold tracking-wide text-(--muted)
                       hover:border-(--accent) hover:text-(--accent)
                       transition-all duration-200 select-none"
          >
            <span className={lang === "nl" ? "text-(--accent)" : "opacity-40"}>NL</span>
            <span className="opacity-30">/</span>
            <span className={lang === "en" ? "text-(--accent)" : "opacity-40"}>EN</span>
          </button>

          <Link
            to="/"
            onClick={scrollToTop}
            className={`transition-colors ${
              isActive("/")
                ? "text-(--accent) font-semibold"
                : "text-(--muted) hover:text-(--text)"
            }`}
          >
            {tr.nav.projects}
          </Link>

          <Link
            to="/about"
            onClick={scrollToTop}
            className={`transition-colors ${
              isActive("/about")
                ? "text-(--accent) font-semibold"
                : "text-(--muted) hover:text-(--text)"
            }`}
          >
            {tr.nav.about}
          </Link>

          <Link
            to="/contact"
            onClick={scrollToTop}
            className={`transition-colors ${
              isActive("/contact")
                ? "text-(--accent) font-semibold"
                : "text-(--muted) hover:text-(--text)"
            }`}
          >
            {tr.nav.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}
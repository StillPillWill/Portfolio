"use client";

import { useEffect, useState } from "react";
import { site } from "../../content/site.ts";

const NAV = [
  { href: "/#work", label: "Work", match: "/projects" },
  { href: "/#experience", label: "Experience", match: "/experience" },
  { href: "/#about", label: "About", match: "/about" },
  { href: "/#contact", label: "Contact", match: "/contact" },
];

export function SiteHeader({ current = "" }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header-inner">
        <a href="/" className="brand" aria-label="William Nzive, home">
          <span className="brand-name">William Nzive</span>
          <span className="brand-role">CSE · UC Davis</span>
        </a>
        <nav className="nav" id="site-nav" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="nav-link"
              aria-current={current && current.startsWith(n.match) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a className="nav-link nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Résumé
            <span className="sr-only"> (PDF, opens in new tab)</span>
          </a>
          <a className="nav-mail" href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            {site.email}
          </a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}

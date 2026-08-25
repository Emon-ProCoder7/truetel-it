"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS, PRIMARY_CTA_SHORT, CONTACT } from "@/lib/site";
import { spring } from "@/lib/motion-easings";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div
          className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-3 pl-5 transition-colors duration-300"
          style={{
            background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.14)",
            backdropFilter: "blur(16px) saturate(160%)",
            border: `1px solid ${scrolled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.35)"}`,
          }}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
              <Image src="/brand/truetel-logo.png" alt="TrueTel" width={26} height={26} className="object-contain" priority />
            </span>
            <span className={`text-[1.05rem] font-semibold tracking-tight transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
              TrueTel
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${scrolled ? "text-ink-secondary hover:text-ink" : "text-white/85 hover:text-white"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phoneHref}
              className={`hidden text-sm font-semibold sm:inline ${scrolled ? "text-ink" : "text-white"}`}
            >
              {CONTACT.phoneDisplay}
            </a>
            <motion.a
              href="#lead-form"
              whileTap={{ scale: 0.96 }}
              transition={spring.snappy}
              className="hidden items-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-bright sm:inline-flex"
            >
              {PRIMARY_CTA_SHORT}
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`flex size-10 items-center justify-center rounded-full md:hidden ${scrolled ? "text-ink" : "text-white"}`}
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={spring.default}
              style={{ transformOrigin: "top right" }}
              className="fixed right-4 top-4 z-[71] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="text-[1.05rem] font-semibold text-ink">TrueTel</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex size-9 items-center justify-center rounded-full text-ink-secondary hover:bg-bg-soft">
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-3 pb-3">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-3 py-3 text-lg text-ink hover:bg-bg-soft"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <a href="#lead-form" onClick={() => setOpen(false)} className="m-3 block rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-accent-ink">
                {PRIMARY_CTA_SHORT}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

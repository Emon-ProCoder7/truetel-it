"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { CONTACT, PRIMARY_CTA_SHORT } from "@/lib/site";
import { spring } from "@/lib/motion-easings";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("lead-form");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      let atForm = false;
      if (form) {
        const r = form.getBoundingClientRect();
        atForm = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(pastHero && !atForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={spring.default}
          className="fixed inset-x-4 bottom-4 z-40 flex gap-2 md:hidden"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <a
            href={CONTACT.phoneHref}
            aria-label="Call TrueTel"
            className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-lg"
          >
            <Phone size={18} weight="fill" />
          </a>
          <a
            href="#lead-form"
            className="flex flex-1 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-ink shadow-lg"
          >
            {PRIMARY_CTA_SHORT}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { SectionHead, Reveal } from "@/components/ui/Kit";
import { FAQ as FAQ_ITEMS } from "@/lib/site";
import { spring } from "@/lib/motion-easings";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-line px-4 py-24 sm:px-6 sm:py-32">
      <SectionHead label="FAQ" title="Questions Melbourne business owners actually ask." />

      <div className="mx-auto mt-14 flex max-w-2xl flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.05} className="overflow-hidden rounded-[20px] border border-line">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[1.02rem] font-semibold text-ink">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={spring.snappy}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-soft text-ink"
                >
                  <Plus size={14} weight="bold" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring.default}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-ink-secondary">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

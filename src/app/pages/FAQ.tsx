import { useState } from "react";
import { ChevronDown } from "lucide-react";

const JOTFORM = "https://www.jotform.com/253555944387168";

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — add new questions here as needed
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Why don't I have my Claude Pro yet?",
    a: (
      <div className="space-y-4 text-[#9CA3AF]">
        <p>Two things to check:</p>
        <ol className="space-y-4 list-none">
          <li className="flex gap-3">
            <span className="text-[#D97757] font-bold shrink-0">1.</span>
            <div>
              <strong className="text-[#F5F5F5]">You're officially registered.</strong>{" "}
              Perks only go to registered members — if you skipped the sign-up form,
              that's likely why.{" "}
              <a
                href={JOTFORM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97757] hover:underline"
              >
                Register here →
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-[#D97757] font-bold shrink-0">2.</span>
            <div>
              <strong className="text-[#F5F5F5]">You submitted the correct Org ID at check-in.</strong>{" "}
              There are two places to find your Org ID and they are{" "}
              <em>not</em> the same:
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>
                    <code className="text-[#F5F5F5] bg-[#0D0D0D] px-1.5 py-0.5 rounded text-sm">
                      platform.claude.com
                    </code>{" "}
                    — this is the correct one
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>
                    <code className="text-[#F5F5F5] bg-[#0D0D0D] px-1.5 py-0.5 rounded text-sm">
                      claude.ai
                    </code>{" "}
                    — this won't work
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    ),
  },
  // Add more FAQs below:
  // { q: "How do I...", a: <p>...</p> },
];

// ─────────────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#2A2A2A] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#1A1A1A] transition-colors"
      >
        <span className="font-semibold text-lg">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#D97757] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 pt-1 border-t border-[#2A2A2A] bg-[#1A1A1A]/50">
          {a}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function FAQ() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">FAQ</h1>
          <p className="text-xl text-[#9CA3AF]">
            Quick answers to common questions.
          </p>
        </div>
      </section>

      {/* ── Questions ── */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {faqs.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </div>

        {/* Still stuck? */}
        <div className="mt-14 text-center">
          <p className="text-[#9CA3AF] mb-4">Still stuck?</p>
          <a
            href="mailto:cbc@alueducation.com"
            className="inline-block border border-[#2A2A2A] text-[#F5F5F5] px-6 py-3 rounded-xl hover:border-[#D97757] hover:text-[#D97757] transition-all"
          >
            Reach out to us →
          </a>
        </div>
      </section>
    </div>
  );
}

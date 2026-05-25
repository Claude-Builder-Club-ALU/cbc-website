import {
  Award,
  BookOpen,
  Clock,
  Monitor,
  Network,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { EventsPageCard, EventsPageMetaIcon } from "../data/eventsPageUpcoming";
import { addToCalendarDownload } from "../data/upcomingEvents";
import type { HomeUpcomingEvent } from "../data/upcomingEvents";

function metaIconFor(kind: EventsPageMetaIcon): LucideIcon {
  switch (kind) {
    case "users":
      return Users;
    case "clock":
      return Clock;
    case "award":
      return Award;
    case "screen":
      return Monitor;
    case "book":
      return BookOpen;
    default:
      return Network;
  }
}

function badgeClasses(variant: EventsPageCard["badgeVariant"]): string {
  switch (variant) {
    case "hackathon":
      return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30";
    case "workshop":
      return "bg-[#D97757]/15 text-[#D97757] border border-[#D97757]/35";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}

export interface EventsPageUpcomingCardProps {
  card: EventsPageCard;
  highlighted: boolean;
  workshopIcsSource?: HomeUpcomingEvent;
}

export function EventsPageUpcomingCard({
  card,
  highlighted,
  workshopIcsSource,
}: EventsPageUpcomingCardProps) {
  const isFeatured = card.id === "hackathon";

  return (
    <article
      id={`event-card-${card.id}`}
      className={[
        "relative rounded-2xl p-6 sm:p-7 flex flex-col h-full bg-card transition-colors scroll-mt-28",
        isFeatured
          ? "border-2 border-[#D97757] shadow-sm shadow-[#D97757]/10"
          : "border border-border hover:border-[#D97757]/40",
        highlighted ? "ring-2 ring-[#D97757] ring-offset-2 ring-offset-background" : "",
        card.featuredPill ? "pt-10 sm:pt-11" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {card.featuredPill && (
        <div className="absolute -top-3 right-4 sm:right-6 z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#D97757] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
            <Star size={12} className="text-amber-200 fill-amber-200 shrink-0" aria-hidden />
            {card.featuredPill}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 ${badgeClasses(card.badgeVariant)}`}
        >
          {card.badgeLabel}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-4">{card.title}</h3>

      <div
        className={`flex gap-3 mb-4 rounded-xl p-3 border ${
          card.dateMuted
            ? "bg-muted/50 border-border text-muted-foreground"
            : "bg-[#D97757]/10 border-[#D97757]/25"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            card.dateMuted ? "bg-muted text-muted-foreground" : "bg-[#D97757]/20 text-[#D97757]"
          }`}
          aria-hidden
        >
          <Clock size={18} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug">{card.datePrimary}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{card.dateSecondary}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.description}</p>

      <div className="border-t border-border mb-4" />

      <div className="space-y-3 text-muted-foreground text-sm flex-1 mb-4">
        {card.metaRows.map((row, i) => {
          const Icon = metaIconFor(row.icon);
          return (
            <div key={i} className="flex items-start gap-2.5">
              <Icon size={16} className="shrink-0 mt-0.5 text-muted-foreground/80" aria-hidden />
              <span className="leading-snug">{row.text}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {card.highlightTags.map((tag) => (
          <span
            key={tag}
            className="inline-block text-xs font-medium text-muted-foreground bg-muted/80 border border-border rounded-full px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-border/60">
        <p className="text-xs text-muted-foreground max-w-[18rem] leading-snug">{card.footerNote}</p>
        <div className="shrink-0 sm:ml-auto">
          {card.buttonVariant === "primary" && (
            <a
              href={card.buttonHref ?? "#"}
              className="inline-flex justify-center w-full sm:w-auto min-w-[10rem] py-2.5 px-5 rounded-xl text-sm font-semibold bg-[#D97757] text-[#0D0D0D] hover:bg-[#E08967] transition-colors shadow-md text-center"
            >
              {card.buttonLabel}
            </a>
          )}
          {card.buttonVariant === "outline" && (
            <button
              type="button"
              onClick={() => {
                if (workshopIcsSource) addToCalendarDownload(workshopIcsSource);
              }}
              disabled={!workshopIcsSource}
              className="w-full sm:w-auto min-w-[10rem] py-2.5 px-5 rounded-xl text-sm font-semibold border-2 border-[#D97757]/50 bg-transparent hover:bg-[#D97757]/10 transition-colors disabled:opacity-50"
            >
              {card.buttonLabel}
            </button>
          )}
          {card.buttonVariant === "muted" && (
            <button
              type="button"
              className="w-full sm:w-auto min-w-[10rem] py-2.5 px-5 rounded-xl text-sm font-semibold border border-border bg-muted/60 text-muted-foreground hover:bg-muted transition-colors cursor-default"
            >
              {card.buttonLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

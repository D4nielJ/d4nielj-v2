"use client";

import { ResolvedProfile } from "@/lib/getCVByRole";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  SmartPhone01Icon,
  Location01Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";

interface ProfileSectionProps {
  profile: ResolvedProfile;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
        <p className="text-muted-foreground text-lg">{profile.title}</p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={Mail01Icon} className="size-4" />
          {profile.email}
        </a>
        <a
          href={`tel:${profile.phone}`}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={SmartPhone01Icon} className="size-4" />
          {profile.phone}
        </a>
        <span className="flex items-center gap-1.5">
          <HugeiconsIcon icon={Location01Icon} className="size-4" />
          {profile.location}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
          >
            <HugeiconsIcon icon={Link01Icon} className="size-3.5" />
            {link.label}
          </a>
        ))}
      </div>

      <p className="text-sm leading-relaxed max-w-2xl">{profile.summary}</p>
    </section>
  );
}

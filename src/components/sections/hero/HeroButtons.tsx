import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HeroButtonContent } from "@/types";

interface HeroButtonsProps {
  primary: HeroButtonContent;
  secondary: HeroButtonContent;
}

export function HeroButtons({ primary, secondary }: HeroButtonsProps) {
  return (
    <div className="hero-buttons">
      <Button variant="hero-orange" href={primary.href} aria-label={primary.ariaLabel}>
        {primary.label} <ArrowRight size={18} aria-hidden="true" />
      </Button>
      <Button variant="hero-blue" href={secondary.href} aria-label={secondary.ariaLabel}>
        {secondary.label} <ArrowRight size={18} aria-hidden="true" />
      </Button>
    </div>
  );
}

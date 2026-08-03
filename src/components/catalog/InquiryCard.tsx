import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InquiryCardProps {
  lineHref?: string;
  phoneHref?: string;
  emailHref?: string;
}

export function InquiryCard({ lineHref = "/#contact", phoneHref = "tel:+6620000000", emailHref = "mailto:info@originseafoods.com" }: InquiryCardProps) {
  return (
    <div className="product-inquiry-action" style={{ marginTop: "20px" }}>
      <Button variant="hero-orange" href={lineHref}>
        Line OA
      </Button>
      <Button variant="outline" href={phoneHref}>
        <Phone size={18} /> Phone
      </Button>
      <Button variant="outline" href={emailHref}>
        <Mail size={18} /> Email
      </Button>
    </div>
  );
}

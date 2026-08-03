import type { LucideIcon } from "lucide-react";

export interface ContactInformation {
  phone: string;
  mobile: string;
  email: string;
  facebook: string;
  line: string;
  address: string;
}

export interface ContactLink {
  label: string;
  icon: string | LucideIcon;
}

import { Truck, Snowflake, ShieldCheck, UsersRound, Phone, Mail, MessageCircle, MapPin, Facebook } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  snowflake: Snowflake,
  shieldcheck: ShieldCheck,
  usersround: UsersRound,
  phone: Phone,
  mail: Mail,
  messagecircle: MessageCircle,
  mappin: MapPin,
  facebook: Facebook
};

export function mapIcon(iconInput: string | LucideIcon): LucideIcon {
  if (typeof iconInput === "string") {
    return iconMap[iconInput.toLowerCase()] || ShieldCheck;
  }
  return iconInput;
}

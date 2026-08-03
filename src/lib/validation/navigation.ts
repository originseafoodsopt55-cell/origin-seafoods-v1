import { z } from "zod";

export const NavigationItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const ContactInformationSchema = z.object({
  phone: z.string(),
  mobile: z.string(),
  email: z.string().email().or(z.literal("")),
  facebook: z.string(),
  line: z.string(),
  address: z.string(),
});

export const ContactLinkSchema = z.object({
  label: z.string().min(1),
  icon: z.string().min(1),
});

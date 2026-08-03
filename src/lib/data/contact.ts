import type { ContactInformation, ContactLink } from "@/types";

export const contact: ContactInformation = {
  phone: "061-770-1888",
  mobile: "061-770-1888",
  email: "info@originseafoods.com",
  facebook: "Origin Seafoods",
  line: "@originseafoods",
  address: "48/191 หมู่ที่ 4 ตำบลนาดี อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000"
};

export const contactLinks: ContactLink[] = [
  { label: contact.phone, icon: "phone" },
  { label: contact.email, icon: "mail" },
  { label: contact.line, icon: "messagecircle" },
  { label: contact.facebook, icon: "facebook" },
  { label: contact.address, icon: "mappin" }
];

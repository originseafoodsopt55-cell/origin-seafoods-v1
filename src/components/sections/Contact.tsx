"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { assets } from "@/lib/assets";
import type { ContactLink } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mapIcon } from "@/lib/iconMapper";

interface ContactProps {
  contactLinks: ContactLink[];
}

export function Contact({ contactLinks }: ContactProps) {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <Container className="contact-grid">
        <div>
          <SectionTitle id="contact-title" eyebrow="CONTACT" title="ติดต่อเรา" />
          <div className="contact-list">
            {contactLinks.map((item) => {
              const Icon = mapIcon(item.icon);
              const isAddress = item.icon === "mappin" || item.label.includes("สมุทรสาคร");
              if (isAddress) {
                return (
                  <a
                    key={item.label}
                    href="https://maps.google.com/?q=13.5686926,100.2948019"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item hover:text-[#f58220] hover:border-[#f58220]/40 transition-colors"
                    title="เปิดแผนที่ใน Google Maps"
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </a>
                );
              }
              return (
                <div key={item.label} className="contact-item">
                  <Icon size={19} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="qr-row">
            <div className="qr-card">
              <Image
                src={assets.icons.lineQr.src}
                alt={assets.icons.lineQr.alt}
                title={assets.icons.lineQr.title}
                width={112}
                height={112}
                loading="lazy"
                decoding="async"
              />
              <span>Line OA</span>
            </div>
            <div className="qr-card">
              <Image
                src={assets.icons.facebookQr.src}
                alt={assets.icons.facebookQr.alt}
                title={assets.icons.facebookQr.title}
                width={112}
                height={112}
                loading="lazy"
                decoding="async"
              />
              <span>Facebook</span>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="relative group w-full h-full min-h-[390px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              title="แผนที่ บริษัท ออริจิน ซีฟู้ดส์ จำกัด"
              src="https://maps.google.com/maps?q=13.5686926,100.2948019&hl=th&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[390px] border-0"
            />
            <a
              href="https://maps.google.com/?q=13.5686926,100.2948019"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs sm:text-sm font-bold text-gray-800 shadow-md hover:shadow-lg hover:bg-white hover:text-[#f58220] transition-all border border-gray-200/80 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#f58220]" />
              <span>เปิดใน Maps</span>
            </a>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input name="name" aria-label="Name" placeholder="Name" required />
            <input name="company" aria-label="Company" placeholder="Company" />
            <input name="phone" aria-label="Phone" placeholder="Phone" />
            <input name="email" type="email" aria-label="Email" placeholder="Email" required />
            <textarea name="message" aria-label="Message" placeholder="Message" rows={4} required />
            <Button variant="hero-orange" type="submit">
              Send Inquiry
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}

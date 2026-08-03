"use client";

import Image from "next/image";
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
          <iframe
            title="Origin Seafoods Google Map"
            src="https://www.google.com/maps?q=48/191%20Moo%204%20Na%20Di%20Mueang%20Samut%20Sakhon%2074000%20Thailand&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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

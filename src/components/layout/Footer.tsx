import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, MessageCircle, Phone } from "lucide-react";
import { assets } from "@/lib/assets";
import type { NavigationItem, ContactInformation } from "@/types";

interface FooterProps {
  navItems: NavigationItem[];
  contact: ContactInformation;
}

export function Footer({ navItems, contact }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="Origin Seafoods home">
            <Image src={assets.logos.originLogo.src} alt={assets.logos.originLogo.alt} title={assets.logos.originLogo.title} width={230} height={110} />
          </Link>
          <p className="mt-2">บริษัทนำเข้าและส่งออกอาหารทะเลแช่แข็งทั่วโลก</p>
          <strong>INTERNATIONAL SEAFOODS IMPORTER-EXPORTER</strong>
        </div>
        <div>
          <h3>ติดต่อเรา</h3>
          <p>โทร {contact.phone}</p>
          <p>{contact.email}</p>
          <p>{contact.address}</p>
        </div>
        <div>
          <h3>เมนูหลัก</h3>
          {navItems.map((item) => {
            const navHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
            return (
              <a key={item.href} href={navHref}>
                {item.label}
              </a>
            );
          })}
        </div>
        <div>
          <h3>ติดตามเรา</h3>
          <div className="footer-qrs">
            <div className="footer-qr-item">
              <Image src={assets.icons.lineQr.src} alt={assets.icons.lineQr.alt} title={assets.icons.lineQr.title} width={108} height={108} loading="lazy" fetchPriority="low" />
              <span>Line OA</span>
            </div>
            <div className="footer-qr-item">
              <Image src={assets.icons.facebookQr.src} alt={assets.icons.facebookQr.alt} title={assets.icons.facebookQr.title} width={108} height={108} loading="lazy" fetchPriority="low" />
              <span>Facebook</span>
            </div>
          </div>
          <div className="footer-socials">
            {[MessageCircle, Facebook, Phone, Mail].map((Icon, index) => (
              <a href="#contact" key={index} aria-label="Contact social">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="copyright">© 2026 Origin Seafoods Co., Ltd. All Rights Reserved.</div>
    </footer>
  );
}

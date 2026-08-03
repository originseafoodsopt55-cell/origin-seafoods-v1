import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getNavigation, getContact } from "@/lib/data";

export default async function ProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [navItems, contact] = await Promise.all([
    getNavigation(),
    getContact()
  ]);

  return (
    <div className="site-shell">
      <Navbar navItems={navItems} />
      <div id="main-content" tabIndex={-1} />
      {children}
      <Footer navItems={navItems} contact={contact} />
    </div>
  );
}

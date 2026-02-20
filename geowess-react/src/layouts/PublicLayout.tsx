import NavBar from "../components/Layout/NavBar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}

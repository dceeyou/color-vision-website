import GlobalProgress from "@/components/GlobalProgress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalProgress />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

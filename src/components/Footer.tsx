import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-16 border-t border-border-light relative overflow-hidden">
      {/* Background Grid specific to footer */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjAgMEwwIDBaTTAgMjBMMjAgMjBaIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
        <div>
          <Link href="/" className="flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-xl text-background">CV</div>
            <span className="font-bold tracking-widest text-sm">COLOR VISION</span>
          </Link>
          <p className="text-muted text-sm max-w-xs">An independent creative design studio shaping the future of visual communication.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 text-sm font-bold uppercase tracking-widest text-muted">
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground mb-2">Studio</h4>
            <Link href="#work" className="hover:text-accent transition-colors">Work</Link>
            <Link href="#about" className="hover:text-accent transition-colors">About</Link>
            <Link href="#process" className="hover:text-accent transition-colors">Process</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground mb-2">Services</h4>
            <Link href="#" className="hover:text-accent transition-colors">Brand Identity</Link>
            <Link href="#" className="hover:text-accent transition-colors">UI/UX Design</Link>
            <Link href="#" className="hover:text-accent transition-colors">Web Design</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground mb-2">Social</h4>
            <Link href="#" className="hover:text-accent transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground mb-2">Contact</h4>
            <Link href="mailto:hello@colorvision.studio" className="hover:text-accent transition-colors normal-case tracking-normal">hello@colorvision.studio</Link>
            <Link href="#" className="hover:text-accent transition-colors normal-case tracking-normal">+1 (555) 123-4567</Link>
          </div>
        </div>
      </div>
      
      <div className="mt-24 pt-8 border-t border-border-light text-center md:text-left text-xs text-muted font-bold tracking-widest uppercase flex flex-col md:flex-row justify-between items-center relative z-10">
        <p>&copy; {new Date().getFullYear()} Color Vision. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

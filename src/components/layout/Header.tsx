import React, { useState } from 'react';
import { assets } from '../../assets/images';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { useData } from '../../context/DataContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { contact } = useData();
  const primaryPhone = contact.phone[0] || '02518543456';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Paket Outbound', path: '/packages' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <header 
      className={clsx(
        "absolute top-0 left-0 right-0 z-50 w-full px-4 py-4 md:py-6 md:px-12 lg:px-16 transition-colors duration-300",
        !isHome && "bg-primary relative" // Solid background for non-home pages
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Home">
          <Image 
            src={assets.pelitaDesaLogo}
            alt="Pelita Desa Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={clsx(
                "text-white text-base font-medium hover:text-secondary transition-colors py-2",
                pathname === link.path && "text-secondary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side (Phone + Button) */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Image src={assets.phoneIcon} alt="Phone" width={20} height={20} className="w-5 h-5" />
            <span className="text-white font-medium">{primaryPhone}</span>
          </div>
          <Link 
            href="/contact"
            className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-primary transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-dark p-6 lg:hidden flex flex-col space-y-6 shadow-lg z-50 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-white text-lg font-medium hover:text-secondary py-3 px-2 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t border-white/20 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <Image src={assets.phoneIcon} alt="Phone" width={20} height={20} className="w-5 h-5" />
              <span className="font-medium text-lg">{primaryPhone}</span>
            </div>
            <Link 
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-primary w-full text-center transition-colors text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

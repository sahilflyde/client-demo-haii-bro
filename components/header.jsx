"use client";

import Link from "next/link";
import Container from "./spacing";
import Typography from "./typography";
import { Button } from "./button";
import { useState } from "react";

export default function Header({ logo, navLinks = [], ctaText, ctaLink }) {
  const [activeLink, setActiveLink] = useState("");

  return (
    <Container variant="header">
      <header className="header-container flex items-center justify-between">
        {/* ✅ Dynamic Logo */}
        {logo && (
          <Link href="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              width={140.3}
              height={37}
              className="header-logo"
            />
          </Link>
        )}

        {/* ✅ Dynamic Navigation */}
        <nav className="nav-link-container">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href || "/"}
              className={activeLink === link.name ? "active-link" : ""}
              onClick={() => setActiveLink(link.name)}
            >
              <Typography
                className={`transition-colors ${
                  activeLink === link.name ? "font-semibold" : ""
                }`}
                variant="body-4"
                style={{
                  fontWeight: activeLink === link.name ? 600 : 400,
                  lineHeight: "150%",
                  fontSize: "16px",
                }}
              >
                {link.name}
              </Typography>
            </Link>
          ))}
        </nav>

        {/* ✅ CTA Button */}
        {ctaText && ctaLink && (
          <div className="flex items-center">
            <Link href={ctaLink}>
              <Button variant="primary" size="xl" showIcon={false}>
                {ctaText}
              </Button>
            </Link>
          </div>
        )}
      </header>
    </Container>
  );
}
  
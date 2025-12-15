"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./spacing";
import Typography from "./typography";

export default function Footer({
  logo = "https://placehold.co/100x40",
  description = "This is a sample footer description for your brand.",
  socials = [],
  quickLinks = [],
  contacts = [],
  subscribeTitle = "Subscribe to our newsletter",
  subscribeSubtitle = "Get the latest updates and offers.",
  copyright = "© 2025 Your Company. All rights reserved.",

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  descriptionVariant = "",
  socialVariant = "",
  quickLinksTitleVariant = "",
  quickLinkItemVariant = "",
  contactsTitleVariant = "",
  contactItemVariant = "",
  subscribeTitleVariant = "",
  subscribeSubtitleVariant = "",
  copyrightVariant = "",
}) {
  const [variant, setVariant] = useState("body-4");

  useEffect(() => {
    const handleResize = () => {
      setVariant(window.innerWidth <= 450 ? "body-1" : "body-4");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="footer">
      <Container className="primary-spacing">
        <div className="footer-container-one">
          <div className="footer__wrapper">
            {/* LEFT BRAND SECTION */}
            <div className="footer__brand">
              <div className="footer__brand-content">
                <Link href="/" className="footer__logo">
                  <Image src={logo} width={100} height={40} alt="footer logo" />
                </Link>

                {/* ⭐ DESCRIPTION OVERRIDE */}
                <Typography
                  variant="body-4"
                  overrideVariant={descriptionVariant}
                  className="footer__desc"
                >
                  {description}
                </Typography>
              </div>

              <div className="footer__socials">
                {socials.map((item, i) => (
                  <Link key={i} href={item.href} className="footer__social-btn">
                    <Typography
                      variant="body-4"
                      overrideVariant={socialVariant}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>

            {/* QUICK LINKS + CONTACTS */}
            <div className="footer-links-container">
              {/* QUICK LINKS */}
              <div className="footer__links">
                <Typography
                  variant="h5"
                  overrideVariant={quickLinksTitleVariant}
                >
                  Quick Links
                </Typography>
                <ul>
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href}>
                        <Typography
                          variant="body-4"
                          overrideVariant={quickLinkItemVariant}
                        >
                          {link.name}
                        </Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACTS */}
              <div className="footer__contacts">
                <Typography variant="h5" overrideVariant={contactsTitleVariant}>
                  Contacts
                </Typography>

                <ul>
                  {contacts.map((c, i) => (
                    <li key={i} className="footer__contact-item">
                      <Image
                        src={c.icon}
                        width={16}
                        height={16}
                        alt="contact icon"
                        className="footer__icon"
                      />

                      <Typography
                        variant="body-4"
                        overrideVariant={contactItemVariant}
                      >
                        {c.text}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SUBSCRIBE BOX */}
          <div className="footer__subscribe">
            <div className="footer__subscribe-content">
              {/* ⭐ SUBSCRIBE TITLE OVERRIDE */}
              <Typography variant="h3" overrideVariant={subscribeTitleVariant}>
                {subscribeTitle}
              </Typography>

              {/* ⭐ SUBSCRIBE SUBTITLE OVERRIDE */}
              <Typography
                variant="body-4"
                overrideVariant={subscribeSubtitleVariant}
                className="footer__subscribe-desc"
              >
                {subscribeSubtitle}
              </Typography>
            </div>

            <div className="footer__input">
              <input type="email" placeholder="Enter your email" />
              <button className="arrow-btn">
                <Image
                  src="https://ik.imagekit.io/a9uxeuyhx/Arrow%20Right.png?updatedAt=1763619992791"
                  width={14}
                  height={12}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* FOOTER BOTTOM COPYRIGHT */}
      <div className="footer__bottom">
        <Typography variant={variant} overrideVariant={copyrightVariant}>
          {copyright}
        </Typography>
      </div>
    </footer>
  );
}

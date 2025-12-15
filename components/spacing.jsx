import clsx from "clsx";

export default function Container({
  children,
  variant = "primary",
  className,
}) {
  const variants = {
    primary: "primary-spacing",
    header: "header-spacing",
    heroSpacing: "hero-spacing",
    secondary: "secondary-spacing",
    section: "section-spacing",
    header: "header-spacing",
    normal: "normal-spacing",
    auth: "auth-spacing",
    topSpacing: "top-spacing",
    bottomSpacing: "bottom-spacing",
    blockSpacing: "block-spacing",
  };

  return (
    <div className={clsx(`${variants[variant]}`, className)}>{children}</div>
  );
}

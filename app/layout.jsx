
import "./globals.scss";


export default async function RootLayout({ children }) {
  const slug = process.env.SITE_SLUG;

  const res = await fetch(
    `https://blinkflo-backend.onrender.com/api/websites/${slug}`,
    { cache: "no-store" }
  );
  const site = await res.json();



  return (
    <html lang="en">
      <head>
        <title>{site.websiteName}</title>
        <link rel="icon" href={site.favicon} />
      </head>

      <body >
        {children}
      </body>
    </html>
  );
}

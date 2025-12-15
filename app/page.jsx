
import dynamic from "next/dynamic";
const RenderBlock = dynamic(() => import("../components/RenderBlock"), { ssr: false });

export default async function Page() {
  const res = await fetch(
    "https://blinkflo-backend.onrender.com/api/websites/demo-haii-bro",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <main>Failed to load content.</main>;
  }

  const site = await res.json();
  const pageData = site?.pages?.find(p => p.route === "home");

  if (!pageData) {
    return <main>Page not found.</main>;
  }

  return (
    <main>
      {pageData.components?.map((b, i) => (
        <RenderBlock key={i} block={b} />
      ))}
    </main>
  );
}

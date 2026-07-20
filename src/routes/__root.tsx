import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { BottomNav } from "~/components/BottomNav";
import { StickyCartBar } from "~/components/StickyCartBar";
import appCss from "~/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Nourish — Food Delivery" },
      {
        name: "description",
        content:
          "Nourish delivers your favorite meals from local restaurants. Warm, fast, delicious.",
      },
      { name: "theme-color", content: "#E85D4C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
});

function RootComponent() {
  return (
    <>
      <div className="mx-auto min-h-screen max-w-lg bg-cream-100 pb-28">
        <Outlet />
      </div>
      <StickyCartBar />
      <BottomNav />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "#1a1715",
            color: "#fffdf9",
            border: "none",
            borderRadius: "16px",
          },
        }}
      />
    </>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

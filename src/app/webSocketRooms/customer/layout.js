

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata = {
  title: "JSON | VIEWER",
  description: "Json Viewer",
  manifest: "/manifest.json",
  keywords: ["json viewer", "technology", "web application"],
  // viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-     fit=no, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <body >{children}</body>
    </html>
  );
}

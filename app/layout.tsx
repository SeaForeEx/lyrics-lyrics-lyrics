import "./global.css";

export const metadata = {
  title: "Lyrics Lyrics Lyrics",
  description: "Music Review Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

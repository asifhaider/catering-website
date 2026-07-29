import "./globals.css";

export const metadata = {
  title: "Saffron & Sage Catering",
  description: "Homemade food, gathered around your table."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import Header from "./Components/header";
import SideBar from "./Components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <aside>
          <SideBar />
        </aside>
        <div className="w-full flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

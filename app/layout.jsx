"use client";

import { useState } from "react";
import SidebarMenu from "./components/SidebarMenu";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css";                         
import "primeflex/primeflex.css";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
     <html lang="en">
      <body style={{ margin: 0 }}>
        <SidebarMenu>
          {children}
        </SidebarMenu>
      </body>
    </html>
  );
}

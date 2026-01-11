"use client";

import "@/app/dashboard.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Tous les menus pour gérer les titres dynamiques
  const allMenuItems = [
    { name: "Acceuil", path: "/dashboard", icon: "fa-house" },
    { name: "Marketing ", path: "/contenu-ia", icon: "fa-wand-magic-sparkles" },
    { name: "Copywriting", path: "/copywriting", icon: "fa-pen-nib" },
    { name: "Factures", path: "/factures", icon: "fa-file-invoice" },
    { name: "Rapports", path: "/rapports", icon: "fa-chart-line" },
    { name: "Paramètres", path: "/parametres", icon: "fa-gear" }
    
  ];

  // Filtre pour la Sidebar (on ne veut pas tout afficher en haut)
  const sidebarPrimaryItems = allMenuItems.slice(0, 5);
  const sidebarSecondaryItems = allMenuItems.slice(5);

  // Titre dynamique pour la Topbar
  const activeItem = allMenuItems.find((item) => item.path === pathname);
  const activeTitle = activeItem ? activeItem.name : "Dashboard";

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/dashboard" className="logo">
            <div className="logo-icon">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <span className="logo-text">PichFlow</span>
          </Link>
        </div>

        <nav className="sidebar-menu">
          {/* Groupe Principal */}
          <div className="menu-group">
            {sidebarPrimaryItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`menu-item ${
                  pathname === item.path ? "active" : ""
                }`}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.name}
              </Link>
            ))}
          </div>

          {/* Groupe Bas (Paramètres, Aide, Profil) */}
          <div className="menu-group bottom">
            {sidebarSecondaryItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`menu-item ${
                  pathname === item.path ? "active" : ""
                }`}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* --- ZONE PRINCIPALE --- */}
      <main className="dashboard-main">
        <header className="topbar">
          <div className="topbar-left">
            <h1>{activeTitle}</h1>
            <p>
              {activeTitle === "Paramètres"
                ? "Gérez votre compte"
                : "Bienvenue sur PichFlow"}
            </p>
          </div>
          <div className="topbar-right">
            <button className="notif-btn">
              <i className="fa-regular fa-bell"></i>
              <span className="notif-badge"></span>
            </button>
          </div>
        </header>

        <section className="content-area">{children}</section>
      </main>

      {/* --- NAVIGATION MOBILE --- */}
      <nav className="mobile-tab-bar">
        {sidebarPrimaryItems.slice(0, 4).map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`tab-item ${pathname === item.path ? "active" : ""}`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.name}</span>
          </Link>
        ))}
        <Link
          href="/parametres"
          className={`tab-item ${pathname === "/parametres" ? "active" : ""}`}
        >
          <i className="fa-solid fa-gear"></i>
          <span>Paramètres</span>
        </Link>
      </nav>
    </div>
  );
}

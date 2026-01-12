"use client";

import "@/app/dashboard.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // --- LOGIQUE DU MENU PROFIL ---
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allMenuItems = [
    { name: "Acceuil", path: "/dashboard", icon: "fa-house" },
    { name: "Marketing ", path: "/contenu-ia", icon: "fa-wand-magic-sparkles" },
    { name: "Copywriting", path: "/copywriting", icon: "fa-pen-nib" },
    { name: "Factures", path: "/factures", icon: "fa-file-invoice" },
    { name: "Rapports", path: "/rapports", icon: "fa-chart-line" },
    { name: "Paramètres", path: "/parametres", icon: "fa-gear" }
  ];

  const sidebarPrimaryItems = allMenuItems.slice(0, 5);
  const sidebarSecondaryItems = allMenuItems.slice(5);

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
          <div className="menu-group">
            {sidebarPrimaryItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`menu-item ${pathname === item.path ? "active" : ""}`}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.name}
              </Link>
            ))}
          </div>

          <div className="menu-group bottom">
            {sidebarSecondaryItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`menu-item ${pathname === item.path ? "active" : ""}`}
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

          <div className="topbar-right" ref={profileRef}>
            <button 
              className="user-btn" 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span className="user-badge">ES</span>
            </button> 

            {/* DIV DU MENU DROPDOWN (Affichée conditionnellement) */}
            {isProfileOpen && (
              <div className="profile-dropdown" style={{
                position: 'absolute',
                top: '70px',
                right: '20px',
                backgroundColor: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 100,
                minWidth: '180px',
                border: '1px solid #e2e8f0'
              }}>
                <Link href="/parametres" className="menu-item" onClick={() => setIsProfileOpen(false)}>
                  <i className="fa-solid fa-user-gear"></i> Paramètres
                </Link>
                <button 
                  className="menu-item" 
                  style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626' }}
                  onClick={() => console.log("Déconnexion...")}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
                </button>
              </div>
            )}
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
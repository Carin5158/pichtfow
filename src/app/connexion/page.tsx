'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Connexion() {
  // États pour la gestion du chargement
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [formData, setFormData] = useState({ email: '', password: '' });

  // 1. GESTION DU CLIC GOOGLE (Redirection Backend)
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    
    // Le développeur Backend te donnera cette URL. 
    // Elle redirige l'utilisateur vers Google pour validation.
    const BACKEND_GOOGLE_URL = "https://ton-api.com/auth/google"; 
    
    // On simule un petit délai avant la redirection pour l'effet visuel
    setTimeout(() => {
      window.location.href = BACKEND_GOOGLE_URL;
    }, 800);
  };

  // 2. GESTION DU FORMULAIRE CLASSIQUE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Ici le développeur backend fera son appel API (ex: fetch('/api/login'))
    console.log("Données envoyées :", formData);
    
    // Simulation de réponse
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-side">
        <div className="auth-header">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <span className="logo-text">Pitch<span>Flow</span></span>
          </Link>
        </div>

        <div className="auth-content">
          <h1>Bon retour !</h1>
          <p className="subtitle">Connectez-vous pour accéder à votre dashboard</p>

          {/* BOUTON GOOGLE AVEC ÉTAT DE CHARGEMENT */}
          <button 
            type="button" 
            className="btn-google" 
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <img 
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
                alt="Google" 
              />
            )}
            {isGoogleLoading ? "Redirection..." : "Continuer avec Google"}
          </button>

          <div className="auth-separator">
            <span>OU</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>Mot de passe</label>
                <Link href="#" className="forgot-pass">Mot de passe oublié ?</Link>
              </div>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="........" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-auth-submit" 
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Connexion...</>
              ) : (
                <>Se connecter <i className="fa-solid fa-arrow-right"></i></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Pas encore de compte ? <Link href="/inscription">S'inscrire</Link>
          </p>
        </div>
      </div>

      <div className="auth-info-side">
        <div className="info-content">
          <div className="info-icon-box">
            <i className="fa-solid fa-bolt-lightning"></i>
          </div>
          <h2>Marketing IA + Facturation</h2>
          <p>Générez du contenu percutant et gérez vos finances en toute simplicité.</p>
          
          <ul className="info-list">
            <li><i className="fa-solid fa-circle-check"></i> Articles SEO et posts réseaux sociaux</li>
            <li><i className="fa-solid fa-circle-check"></i> Copywriting avec méthodes AIDA, PAS</li>
            <li><i className="fa-solid fa-circle-check"></i> Facturation et comptabilité automatisées</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
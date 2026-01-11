import Link from 'next/link';

export default function Connexion() {
  return (
    <div className="auth-container">
      {/* Côté Gauche : Formulaire de connexion */}
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

          <form className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope"></i>
                <input type="email" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>Mot de passe</label>
                <Link href="#" className="forgot-pass">Oublié ?</Link>
              </div>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input type="password" placeholder="........" required />
              </div>
            </div>

            <button type="submit" className="btn-auth-submit">
              Se connecter <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>

          <p className="auth-switch">
            Pas encore de compte ? <Link href="/inscription">S'inscrire</Link>
          </p>
        </div>
      </div>

      {/* Côté Droit : Panel de présentation (Identique à l'inscription) */}
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
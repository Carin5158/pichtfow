"use client";
import React, { useState } from 'react';

export default function CopywritingPage() {
  const [activeMethod, setActiveMethod] = useState('AIDA');

  const methods = [
    { id: 'AIDA', title: 'AIDA', desc: 'Attention, Interest, Desire, Action' },
    { id: 'PAS', title: 'PAS', desc: 'Problem, Agitation, Solution' },
    { id: 'BAB', title: 'BAB', desc: 'Avant, Après, Pont' },
  ];

  return (
    /* Ajout de overflow-x: hidden et width: 100% pour bloquer le scroll horizontal */
    <div className="ia-page-container" style={{ width: '100%', overflowX: 'hidden', paddingBottom: '40px' }}>
      
      {/* Configuration Gauche */}
      {/* On réduit le padding sur mobile via un style conditionnel simple ou une valeur sûre */}
      <div className="ia-config-side" style={{ padding: '20px', maxWidth: '100%' }}>
        
        {/* Onglets supérieurs */}
        {/* Ajout de flex-wrap pour que les boutons passent à la ligne sur petit écran */}
        {/* <div className="tabs-container" style={{ flexWrap: 'wrap', gap: '5px' }}>
          <button className="tab active">Créer</button>
          <button className="tab">Historique</button>
          <button className="tab">Templates</button>
        </div> */}

        <div className="config-section">
          <h4>Type de copywriting</h4>
          <select className="ia-select">
            <option>Page de vente</option>
            <option>Landing page</option>
            <option>Publicité Facebook</option>
            <option>Fiche produit</option>
          </select>
        </div>

        <div className="config-section">
          <h4>Méthode de copywriting</h4>
          {/* On s'assure que la grille ne force pas une largeur fixe */}
          <div className="method-grid" style={{ gap: '10px' }}>
            {methods.map((method) => (
              <div 
                key={method.id}
                className={`method-card ${activeMethod === method.id ? 'active' : ''}`}
                onClick={() => setActiveMethod(method.id)}
                style={{ padding: '12px', minWidth: '0' }}
              >
                <span className="method-title" style={{ fontSize: '0.9rem' }}>{method.title}</span>
                <span className="method-desc" style={{ fontSize: '0.65rem' }}>{method.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h4><i className="fa-solid fa-bolt-lightning" style={{color: '#FF7A30', marginRight: '8px'}}></i> Produit / Service</h4>
          <textarea 
            className="ia-textarea" 
            placeholder="Décrivez votre produit ou service..."
            style={{ width: '100%' }}
          ></textarea>
        </div>

        <div className="config-section">
          <h4><i className="fa-solid fa-user-group" style={{color: '#2563EB', marginRight: '8px'}}></i> Cible</h4>
          <input type="text" className="ia-input" placeholder="Ex: Entrepreneurs, PME, Freelances..." style={{ width: '100%' }} />
        </div>

        <div className="config-section">
          <h4><i className="fa-solid fa-bullseye" style={{color: '#10B981', marginRight: '8px'}}></i> Objectif</h4>
          <select className="ia-select">
            <option>Professionnel</option>
            <option>Persuasif</option>
            <option>Urgent</option>
          </select>
        </div>

        <button className="btn-generate">
          <i className="fa-solid fa-pen-nib"></i> Générer le copy
        </button>
      </div>

      {/* Aperçu Droite */}
      <div className="ia-result-side" style={{ width: '100%', minWidth: '0' }}>
        <div className="result-card" style={{ padding: '20px', minHeight: 'auto' }}>
          <h4>Texte généré</h4>
          <div className="empty-result" style={{ padding: '30px', textAlign: 'center' }}>
            <div className="empty-icon">
              <i className="fa-solid fa-pen-fancy"></i>
            </div>
            <p style={{ fontSize: '0.9rem' }}>Votre texte de vente apparaîtra ici</p>
            <span className="empty-subtext" style={{ fontSize: '0.75rem' }}>Utilisez les méthodes AIDA, PAS ou BAB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

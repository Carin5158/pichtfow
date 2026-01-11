"use client";
import React, { useState } from 'react';

export default function ContenuIAPage() {
  // 1. États pour les entrées du formulaire
  const [selectedType, setSelectedType] = useState('Article de blog SEO');
  const [tone, setTone] = useState('Professionnel');
  const [prompt, setPrompt] = useState('');
  
  // 2. États pour la gestion de la génération
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');

  const contentTypes = [
    { id: 'blog', label: 'Article de blog SEO', icon: 'fa-file-lines' },
    { id: 'social', label: 'Réseau sociaux', icon: 'fa-share-nodes' },
    { id: 'email', label: 'Email marketing', icon: 'fa-envelope' },
    { id: 'video', label: 'Script vidéo', icon: 'fa-video' },
  ];

  // 3. Fonction de génération (Simulation de l'appel API)
  const handleGenerate = async () => {
    if (!prompt) return alert("Veuillez décrire un sujet !");
    
    setIsGenerating(true);
    setGeneratedResult(''); // On vide le résultat précédent

    try {
      // --- ZONE BACKEND : C'est ici que l'on fera l'appel fetch('/api/generate') ---
      // On simule une attente de 2 secondes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fakeResult = `Voici votre ${selectedType} généré avec un ton ${tone} :\n\nLe marketing digital en 2024 s'annonce révolutionnaire... (Ceci est un exemple de texte généré par PitchFlow).`;
      
      setGeneratedResult(fakeResult);
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ia-page-container">
      {/* Colonne de gauche : Configuration */}
      <div className="ia-config-side">
        <div className="config-section">
          <h4>Type de contenu</h4>
          <div className="type-grid">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                className={`type-card ${selectedType === type.label ? 'active' : ''}`}
                onClick={() => setSelectedType(type.label)}
              >
                <i className={`fa-solid ${type.icon}`}></i>
                {type.label}
              </button>
            ))}
          </div> 
        </div>

        <div className="config-section">
          <h4>Ton du contenu</h4>
          <select 
            className="ia-select" 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Professionnel</option>
            <option>Amical</option>
            <option>Persuasif</option>
            <option>Enthousiaste</option>
          </select>
        </div>

        <div className="config-section">
          <h4>Sujet ou thème</h4>
          <textarea 
            className="ia-textarea" 
            placeholder="Décrivez le sujet de votre contenu (ex: Les tendances du marketing digital en 2024)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>

        <button 
          className="btn-generate" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <><i className="fa-solid fa-spinner fa-spin"></i> Génération...</>
          ) : (
            <><i className="fa-solid fa-wand-magic-sparkles"></i> Générer le contenu</>
          )}
        </button>
      </div>

      {/* Colonne de droite : Aperçu/Résultat */}
      <div className="ia-result-side" style={{ height: '100%' }}>
        <div className="result-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4>Contenu généré</h4>
            {generatedResult && (
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedResult)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  <i className="fa-regular fa-copy"></i> Copier
                </button>
            )}
          </div>

          {generatedResult ? (
            <div className="result-content" style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {generatedResult}
            </div>
          ) : (
            <div className="empty-result">
              {isGenerating ? (
                <div className="loading-animation">
                   <i className="fa-solid fa-ellipsis fa-fade" style={{ fontSize: '2rem' }}></i>
                   <p>L'intelligence artificielle rédige votre contenu...</p>
                </div>
              ) : (
                <>
                  <div className="empty-icon">
                    <i className="fa-solid fa-sparkles"></i>
                  </div>
                  <p>Votre contenu apparaîtra ici</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
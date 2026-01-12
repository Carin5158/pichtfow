"use client";
import React, { useState } from 'react';

export default function ContenuIAPage() {
  // 1. États pour le Backend
  const [selectedType, setSelectedType] = useState('Article de blog SEO');
  const [tone, setTone] = useState('Professionnel');
  const [prompt, setPrompt] = useState('');
  
  // 2. États de gestion
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');

  const contentTypes = [
    { id: 'blog', label: 'Article de blog SEO', icon: 'fa-file-lines' },
    { id: 'social', label: 'Réseau sociaux', icon: 'fa-share-nodes' },
    { id: 'email', label: 'Email marketing', icon: 'fa-envelope' },
    { id: 'video', label: 'Script vidéo', icon: 'fa-video' },
  ];

  // 3. Fonction de nettoyage (pour enlever les * et # du Markdown pour l'affichage)
  const cleanContent = (text) => {
    return text
      .replace(/[*#_~]/g, '') // Supprime les caractères spéciaux Markdown
      .replace(/\n{3,}/g, '\n\n') // Évite les trop grands espaces
      .trim();
  };

  // 4. Fonction de génération
  const handleGenerate = async () => {
    if (!prompt) return alert("Veuillez décrire un sujet !");
    
    setIsGenerating(true);
    setGeneratedResult(''); 

    try {
      // --- APPEL API BACKEND (Exemple de structure pour le dev) ---
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   body: JSON.stringify({ type: selectedType, tone, prompt, model: "gpt-4" })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulation d'un retour propre sans caractères spéciaux
      const rawAIResponse = `TITRE : L'AVENIR DU MARKETING\n\nLe marketing digital évolue rapidement. En utilisant PitchFlow, vous optimisez votre temps. Le contenu devient plus humain et moins robotique.`;
      
      setGeneratedResult(cleanContent(rawAIResponse));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 5. Téléchargement au format .txt
  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedResult], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "contenu-pitchflow.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="ia-page-container">
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
            placeholder="Décrivez le sujet..."
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

      <div className="ia-result-side">
        <div className="result-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4>Résultat</h4>
            {generatedResult && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedResult)}
                    title="Copier"
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  >
                    <i className="fa-regular fa-copy"></i>
                  </button>
                  <button 
                    onClick={downloadAsTxt}
                    title="Télécharger"
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  >
                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
            )}
          </div>

          {generatedResult ? (
            <div className="result-content" style={{ whiteSpace: 'pre-wrap' }}>
              {generatedResult}
            </div>
          ) : (
            <div className="empty-result">
              {isGenerating ? (
                <div className="loading-animation">
                   <i className="fa-solid fa-ellipsis fa-fade" style={{ fontSize: '2rem' }}></i>
                   <p>PitchFlow rédige...</p>
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
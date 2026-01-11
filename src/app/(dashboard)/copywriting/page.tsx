"use client";
import React, { useState } from 'react';

export default function CopywritingPage() {
  // 1. États du formulaire (Backend Ready)
  const [activeMethod, setActiveMethod] = useState('AIDA');
  const [copyType, setCopyType] = useState('Page de vente');
  const [product, setProduct] = useState('');
  const [target, setTarget] = useState('');
  const [objective, setObjective] = useState('Professionnel');

  // 2. États de génération
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const methods = [
    { id: 'AIDA', title: 'AIDA', desc: 'Attention, Interest, Desire, Action' },
    { id: 'PAS', title: 'PAS', desc: 'Problem, Agitation, Solution' },
    { id: 'BAB', title: 'BAB', desc: 'Avant, Après, Pont' },
  ];

  // 3. Fonction de génération
  const handleGenerateCopy = async () => {
    if (!product || !target) {
      alert("Veuillez remplir les champs Produit et Cible !");
      return;
    }

    setIsGenerating(true);
    setGeneratedCopy('');

    try {
      // Simulation d'appel API vers OpenAI/Claude
      await new Promise(resolve => setTimeout(resolve, 1500));

      const resultText = `[Méthode ${activeMethod}]\n\n` + 
        `Attention : Vous en avez marre de perdre du temps sur votre marketing ?\n` +
        `Intérêt : Découvrez PitchFlow, l'outil qui automatise votre croissance...\n` +
        `Désir : Imaginez une facturation et un contenu générés en 2 minutes.\n` +
        `Action : Essayez gratuitement dès maintenant !`;

      setGeneratedCopy(resultText);
    } catch (error) {
      console.error("Erreur génération copy:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ia-page-container" style={{ width: '100%', overflowX: 'hidden', paddingBottom: '40px' }}>
      
      {/* Configuration Gauche */}
      <div className="ia-config-side" style={{ padding: '20px', maxWidth: '100%' }}>
        
        <div className="config-section">
          <h4>Type de copywriting</h4>
          <select 
            className="ia-select"
            value={copyType}
            onChange={(e) => setCopyType(e.target.value)}
          >
            <option>Page de vente</option>
            <option>Landing page</option>
            <option>Publicité Facebook</option>
            <option>Fiche produit</option>
          </select>
        </div>

        <div className="config-section">
          <h4>Méthode de copywriting</h4>
          <div className="method-grid" style={{ gap: '10px' }}>
            {methods.map((method) => (
              <div 
                key={method.id}
                className={`method-card ${activeMethod === method.id ? 'active' : ''}`}
                onClick={() => setActiveMethod(method.id)}
                style={{ padding: '12px', minWidth: '0', cursor: 'pointer' }}
              >
                <span className="method-title" style={{ fontSize: '0.9rem' }}>{method.title}</span>
                <span className="method-desc" style={{ fontSize: '0.65rem' }}>{method.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="config-section">
          <h4>
            <i className="fa-solid fa-bolt-lightning" style={{color: '#FF7A30', marginRight: '8px'}}></i> 
            Produit / Service
          </h4>
          <textarea 
            className="ia-textarea" 
            placeholder="Décrivez votre produit ou service..."
            style={{ width: '100%' }}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          ></textarea>
        </div>

        <div className="config-section">
          <h4>
            <i className="fa-solid fa-user-group" style={{color: '#2563EB', marginRight: '8px'}}></i> 
            Cible
          </h4>
          <input 
            type="text" 
            className="ia-input" 
            placeholder="Ex: Entrepreneurs, PME, Freelances..." 
            style={{ width: '100%' }}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>

        <div className="config-section">
          <h4>
            <i className="fa-solid fa-bullseye" style={{color: '#10B981', marginRight: '8px'}}></i> 
            Objectif / Ton
          </h4>
          <select 
            className="ia-select"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          >
            <option>Professionnel</option>
            <option>Persuasif</option>
            <option>Urgent</option>
          </select>
        </div>

        <button 
          className="btn-generate" 
          onClick={handleGenerateCopy}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <><i className="fa-solid fa-spinner fa-spin"></i> Génération...</>
          ) : (
            <><i className="fa-solid fa-pen-nib"></i> Générer le copy</>
          )}
        </button>
      </div>

      {/* Aperçu Droite */}
      <div className="ia-result-side" style={{ width: '100%', minWidth: '0' }}>
        <div className="result-card" style={{ padding: '20px', minHeight: '400px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4>Texte généré</h4>
            {generatedCopy && (
              <button 
                onClick={() => navigator.clipboard.writeText(generatedCopy)}
                style={{ background: '#f1f5f9', border: 'none', padding: '5px 10px', borderRadius: '5px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                <i className="fa-regular fa-copy"></i> Copier
              </button>
            )}
          </div>

          {generatedCopy ? (
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              {generatedCopy}
            </div>
          ) : (
            <div className="empty-result" style={{ padding: '30px', textAlign: 'center' }}>
              {isGenerating ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <i className="fa-solid fa-wand-sparkles fa-bounce" style={{ fontSize: '2rem', color: '#FF7A30' }}></i>
                    <p>PitchFlow analyse votre cible...</p>
                 </div>
              ) : (
                <>
                  <div className="empty-icon">
                    <i className="fa-solid fa-pen-fancy"></i>
                  </div>
                  <p style={{ fontSize: '0.9rem' }}>Votre texte de vente apparaîtra ici</p>
                  <span className="empty-subtext" style={{ fontSize: '0.75rem' }}>Utilisez les méthodes AIDA, PAS ou BAB</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
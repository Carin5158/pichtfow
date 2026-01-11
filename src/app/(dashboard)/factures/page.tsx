"use client";
import React, { useState } from 'react';

export default function FacturesPage() {
  // État initial des factures
  const [factures, setFactures] = useState([
    { id: 'INV-2024-034', client: 'Client ABC', montant: '1250', devise: '€', date: '15 Jan 2026', echeance: '2026-01-30', statut: 'Payée' },
    { id: 'INV-2024-033', client: 'Startup XYZ', montant: '3500', devise: '$', date: '10 Jan 2026', echeance: '2026-01-25', statut: 'En attente' },
    { id: 'INV-2024-032', client: 'Agency Pro', montant: '850', devise: 'FCFA', date: '05 Jan 2026', echeance: '2026-01-20', statut: 'En retard' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideValues, setHideValues] = useState(false);

  // État du formulaire de création
  const [formData, setFormData] = useState({ client: '', montant: '', devise: '€', echeance: '', statut: 'En attente' });

  // --- LOGIQUE DE MISE À JOUR DU STATUT ---
  const handleStatusChange = (id, newStatus) => {
    const updatedFactures = factures.map(f => {
      if (f.id === id) {
        return { ...f, statut: newStatus };
      }
      return f;
    });
    setFactures(updatedFactures);
  };

  // --- LOGIQUE DE CRÉATION ---
  const handleCreate = (e) => {
    e.preventDefault();
    const dateToday = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    const idAuto = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newInvoice = { ...formData, id: idAuto, date: dateToday };
    setFactures([newInvoice, ...factures]);
    setIsModalOpen(false);
    setFormData({ client: '', montant: '', devise: '€', echeance: '', statut: 'En attente' });
  };

  // --- TÉLÉCHARGEMENT TXT ---
  const downloadInvoice = (item) => {
    const text = `FACTURE : ${item.id}\nClient : ${item.client}\nMontant : ${item.montant} ${item.devise}\nStatut : ${item.statut}\nDate : ${item.date}`;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${item.id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  // --- FILTRAGE ---
  const filteredFactures = factures.filter(f => {
    const matchSearch = f.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Tous' || f.statut === filterStatus;
    return matchSearch && matchStatus;
  });

  // Helper pour les classes CSS des badges
  const getStatusClass = (status) => {
    switch(status) {
      case 'Payée': return 'status-paid';
      case 'En retard': return 'status-late';
      default: return 'status-pending';
    }
  };

  return (
    <div className="factures-container">
      {/* MODAL DE CRÉATION */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nouvelle Facture</h3>
            <form onSubmit={handleCreate}>
              <div className="form-grid">
                <div className="input-group full">
                  <label>Client</label>
                  <input type="text" required value={formData.client} onChange={(e)=>setFormData({...formData, client: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Montant</label>
                  <input type="number" required value={formData.montant} onChange={(e)=>setFormData({...formData, montant: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Devise</label>
                  <select value={formData.devise} onChange={(e)=>setFormData({...formData, devise: e.target.value})}>
                    <option value="€">EUR (€)</option>
                    <option value="FCFA">FCFA</option>
                    <option value="$">USD ($)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Échéance</label>
                  <input type="date" required value={formData.echeance} onChange={(e)=>setFormData({...formData, echeance: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Statut Initial</label>
                  <select value={formData.statut} onChange={(e)=>setFormData({...formData, statut: e.target.value})}>
                    <option value="En attente">En attente</option>
                    <option value="Payée">Payée</option>
                    <option value="En retard">En retard</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={()=>setIsModalOpen(false)}>Annuler</button>
                <button type="submit" className="btn-submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BARRE DE RECHERCHE ET FILTRE */}
      <div className="table-toolbar">
        <div className="toolbar-actions">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Rechercher un client..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-group">
            <i className="fa-solid fa-filter"></i>
            <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
              <option value="Tous">Tous les statuts</option>
              <option value="Payée">Payée</option>
              <option value="En attente">En attente</option>
              <option value="En retard">En retard</option>
            </select>
          </div>
          <button className="btn-new" onClick={()=>setIsModalOpen(true)}>+ Nouvelle</button>
        </div>
      </div>

      {/* TABLEAU DES FACTURES */}
      <div className="div-table-container">
        <div className="div-table-header">
          <div className="col-id">ID</div>
          <div className="col-client">Client</div>
          <div className="col-montant">Montant</div>
          <div className="col-date">Date</div>
          <div className="col-echeance">Échéance</div>
          <div className="col-statut">Statut (Modifiable)</div>
          <div className="col-actions">Actions</div>
        </div>

        <div className="div-table-body">
          {filteredFactures.map((item) => (
            <div className="div-table-row" key={item.id}>
              <div className="col-id font-bold" data-label="ID">{item.id}</div>
              <div className="col-client" data-label="Client">{item.client}</div>
              <div className="col-montant font-bold" data-label="Montant">
                {hideValues ? '****' : `${item.montant} ${item.devise}`}
              </div>
              <div className="col-date" data-label="Date">{item.date}</div>
              <div className="col-echeance" data-label="Échéance">{item.echeance}</div>
              <div className="col-statut" data-label="Statut">
                <select 
                  className={`status-select-inline ${getStatusClass(item.statut)}`}
                  value={item.statut}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                  <option value="Payée">Payée</option>
                  <option value="En attente">En attente</option>
                  <option value="En retard">En retard</option>
                </select>
              </div>
              <div className="col-actions">
                <button onClick={() => setHideValues(!hideValues)} title="Masquer"><i className={`fa-regular ${hideValues ? 'fa-eye-slash':'fa-eye'}`}></i></button>
                <button onClick={() => downloadInvoice(item)} title="Télécharger"><i className="fa-solid fa-download"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
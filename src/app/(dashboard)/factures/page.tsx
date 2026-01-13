"use client";
import React, { useState } from 'react';

interface Facture {
  id: string;
  client: string;
  montant: string;
  devise: string;
  date: string;
  echeance: string;
  statut: string;
}

export default function FacturesPage() {
  const [factures, setFactures] = useState<Facture[]>([
    { id: 'INV-2026-034', client: 'Client ABC', montant: '1250', devise: '€', date: '15 Jan 2026', echeance: '2026-01-30', statut: 'Payée' },
    { id: 'INV-2026-033', client: 'Startup XYZ', montant: '3500', devise: '$', date: '10 Jan 2026', echeance: '2026-01-25', statut: 'En attente' },
    { id: 'INV-2026-032', client: 'Agency Pro', montant: '850', devise: 'FCFA', date: '05 Jan 2026', echeance: '2026-01-20', statut: 'En retard' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideValues, setHideValues] = useState(false);
  
  // États pour la modification
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoiceId, setCurrentInvoiceId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ client: '', montant: '', devise: '€', echeance: '', statut: 'En attente' });

  // --- LOGIQUE DE SUPPRESSION ---
  const handleDelete = (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette facture ?")) {
      setFactures(factures.filter(f => f.id !== id));
    }
  };

  // --- LOGIQUE D'OUVERTURE POUR MODIFICATION ---
  const handleEditClick = (item: Facture) => {
    setIsEditing(true);
    setCurrentInvoiceId(item.id);
    setFormData({
      client: item.client,
      montant: item.montant,
      devise: item.devise,
      echeance: item.echeance,
      statut: item.statut
    });
    setIsModalOpen(true);
  };

  // --- LOGIQUE DE SAUVEGARDE (CREATION OU EDITION) ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear(); // Capture auto de l'année

    if (isEditing && currentInvoiceId) {
      setFactures(factures.map(f => f.id === currentInvoiceId ? { ...f, ...formData } : f));
    } else {
      const idAuto = `INV-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`;
      const dateToday = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
      const newInvoice: Facture = { ...formData, id: idAuto, date: dateToday };
      setFactures([newInvoice, ...factures]);
    }

    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentInvoiceId(null);
    setFormData({ client: '', montant: '', devise: '€', echeance: '', statut: 'En attente' });
  };

  // --- LOGIQUE DE TÉLÉCHARGEMENT PDF STYLISÉ ---
  const downloadPDF = (item: Facture) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // On crée un document HTML temporaire pour le PDF
    printWindow.document.write(`
      <html>
        <head>
          <title>Facture ${item.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
            .info-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .table { width: 100%; margin-top: 40px; border-collapse: collapse; }
            .table th { background: #f9fafb; padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            .table td { padding: 12px; border-bottom: 1px solid #eee; }
            .total { margin-top: 40px; text-align: right; font-size: 20px; font-weight: bold; }
            .footer { margin-top: 60px; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">PitchFlow</div>
            <div style="text-align: right">
              <h2 style="margin:0">FACTURE</h2>
              <p style="margin:5px 0">N° ${item.id}</p>
            </div>
          </div>
          <div class="info-section">
            <div>
              <p><strong>Émetteur:</strong><br/>PitchFlow IA Service</p>
            </div>
            <div style="text-align: right">
              <p><strong>Client:</strong><br/>${item.client}</p>
              <p><strong>Date:</strong> ${item.date}<br/><strong>Échéance:</strong> ${item.echeance}</p>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr><th>Description</th><th style="text-align: right">Montant</th></tr>
            </thead>
            <tbody>
              <tr><td>Services de marketing digital et génération IA</td><td style="text-align: right">${item.montant} ${item.devise}</td></tr>
            </tbody>
          </table>
          <div class="total">Total à payer: ${item.montant} ${item.devise}</div>
          <div class="footer">Généré via PitchFlow - Merci de votre confiance.</div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setFactures(factures.map(f => f.id === id ? { ...f, statut: newStatus } : f));
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Payée': return 'status-paid';
      case 'En retard': return 'status-late';
      default: return 'status-pending';
    }
  };

  const filteredFactures = factures.filter(f => {
    const matchSearch = f.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Tous' || f.statut === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="factures-container">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? 'Modifier la Facture' : 'Nouvelle Facture'}</h3>
            <form onSubmit={handleSave}>
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
                  <label>Statut</label>
                  <select value={formData.statut} onChange={(e)=>setFormData({...formData, statut: e.target.value})}>
                    <option value="En attente">En attente</option>
                    <option value="Payée">Payée</option>
                    <option value="En retard">En retard</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={()=>{setIsModalOpen(false); setIsEditing(false);}}>Annuler</button>
                <button type="submit" className="btn-submit">{isEditing ? 'Mettre à jour' : 'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          <button className="btn-new" onClick={()=>{setIsEditing(false); setFormData({ client: '', montant: '', devise: '€', echeance: '', statut: 'En attente' }); setIsModalOpen(true);}}>+ Nouvelle</button>
        </div>
      </div>

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
                <button onClick={() => handleEditClick(item)} title="Modifier"><i className="fa-solid fa-pen-to-square" style={{color: '#2563eb'}}></i></button>
                <button onClick={() => downloadPDF(item)} title="Télécharger PDF"><i className="fa-solid fa-file-pdf" style={{color: '#e11d48'}}></i></button>
                <button onClick={() => handleDelete(item.id)} title="Supprimer"><i className="fa-solid fa-trash-can" style={{color: '#ef4444'}}></i></button>
              </div>
            </div>
          ))}
        </div>

        <br />
        <br /> <br />
      </div>
    </div>
  );
}
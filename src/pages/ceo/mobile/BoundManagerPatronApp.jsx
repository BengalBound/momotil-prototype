import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import {
  CheckSquare, Users, Package, FileText, CheckCircle2,
  XCircle, Clock, Plus, Minus, ArrowRight, ShieldCheck,
  Send, Sparkles, Filter
} from 'lucide-react';

export const BoundManagerPatronApp = () => {
  const navigate = useNavigate();
  const {
    currentRegion,
    formatMoney,
    transactions,
    clerks,
    products,
    approveTransaction,
    rejectTransaction,
    updateClerkPermissions,
    restockProduct,
    addToast,
    playSoundEffect
  } = useApp();

  const R = currentRegion;

  // Role toggle: 'manager' vs 'patron' (owner)
  const [activeRole, setActiveRole] = useState('manager');
  const [selectedTab, setSelectedTab] = useState('dash'); // 'dash' | 'approvals' | 'team' | 'pricing'
  const [dayClosed, setDayClosed] = useState(false);
  const [assignedTaskText, setAssignedTaskText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: `Compter le stock de plaquettes Bosch avant 17h`, status: 'En cours', to: R.clerk },
    { id: 2, text: `Vérifier la facture #${Math.floor(1000 + Math.random() * 9000)} avec le client`, status: 'À faire', to: R.clerk }
  ]);

  const pendingApprovals = transactions.filter(t => t.status === 'Pending');

  const handleToggleDayClose = () => {
    setDayClosed(!dayClosed);
    playSoundEffect('add');
    addToast(
      dayClosed ? 'Journée Réouverte' : 'Journée Clôturée',
      dayClosed ? 'Les ventes peuvent continuer.' : 'Caisse arrêtée et rapport envoyé au patron.',
      'info'
    );
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!assignedTaskText.trim()) return;
    setTasks(prev => [
      { id: Date.now(), text: assignedTaskText.trim(), status: 'À faire', to: R.clerk },
      ...prev
    ]);
    setAssignedTaskText('');
    playSoundEffect('success');
    addToast('Tâche Assignée', `Envoyée à ${R.clerk} avec succès.`, 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--fg)] relative select-none">
      {/* ── Role Switcher: Manager vs Patron ── */}
      <div className="p-3 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.08)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--raise)] text-xs font-bold w-full">
          <button
            onClick={() => setActiveRole('manager')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              activeRole === 'manager'
                ? 'bg-[var(--card)] text-[var(--fg)] shadow-sm'
                : 'text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]'
            }`}
          >
            👔 Manager
          </button>
          <button
            onClick={() => setActiveRole('patron')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              activeRole === 'patron'
                ? 'bg-[var(--card)] text-[var(--acc)] shadow-sm'
                : 'text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]'
            }`}
          >
            👑 Patron (Owner)
          </button>
        </div>
      </div>

      {/* ── Sub-navigation ── */}
      <div className="px-3 py-2 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.06)] flex items-center gap-1 overflow-x-auto text-[11px] font-semibold">
        <button
          onClick={() => setSelectedTab('dash')}
          className={`px-3 py-1.5 rounded-lg shrink-0 transition ${
            selectedTab === 'dash' ? 'bg-[var(--raise)] text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.5)]'
          }`}
        >
          Tableau de bord
        </button>
        <button
          onClick={() => setSelectedTab('approvals')}
          className={`px-3 py-1.5 rounded-lg shrink-0 transition relative ${
            selectedTab === 'approvals' ? 'bg-[var(--raise)] text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.5)]'
          }`}
        >
          Approbations
          {pendingApprovals.length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[var(--acc)] text-[var(--onAcc)] text-[9px] font-bold">
              {pendingApprovals.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setSelectedTab('team')}
          className={`px-3 py-1.5 rounded-lg shrink-0 transition ${
            selectedTab === 'team' ? 'bg-[var(--raise)] text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.5)]'
          }`}
        >
          Équipe &amp; Accès
        </button>
        {activeRole === 'patron' && (
          <button
            onClick={() => setSelectedTab('pricing')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition ${
              selectedTab === 'pricing' ? 'bg-[var(--raise)] text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.5)]'
            }`}
          >
            Prix &amp; Marges
          </button>
        )}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: DASHBOARD */}
        {selectedTab === 'dash' && (
          <>
            {/* Header store summary */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--fg)]">{R.store}</span>
                <span className="text-[10px] font-mono text-[var(--acc)]">{R.city} · {R.langs}</span>
              </div>
              <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)]">{R.owner} ({activeRole === 'manager' ? 'Gérant' : 'Propriétaire'})</p>
            </div>

            {/* KPI Tri-Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <span className="block font-display font-black text-sm tracking-tight">{formatMoney(R.today)}</span>
                <span className="text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">Ventes Jour</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <span className="block font-display font-black text-sm text-[var(--acc)]">{pendingApprovals.length}</span>
                <span className="text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">À Valider</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <span className="block font-display font-black text-sm text-[var(--acc2)]">{clerks.length}</span>
                <span className="text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">Vendeurs</span>
              </div>
            </div>

            {/* Day Close Feature */}
            <div className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">Clôture de Caisse du Jour</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  dayClosed ? 'bg-[rgba(255,106,19,0.15)] text-[var(--acc)]' : 'bg-[rgba(10,123,79,0.15)] text-[var(--acc2)]'
                }`}>
                  {dayClosed ? 'CLÔTURÉ' : 'OUVERT'}
                </span>
              </div>
              <button
                onClick={handleToggleDayClose}
                className="w-full py-2.5 rounded-xl font-display font-bold text-xs shadow-sm transition active:scale-98"
                style={{
                  background: dayClosed ? 'var(--raise)' : 'var(--acc)',
                  color: dayClosed ? 'var(--fg)' : 'var(--onAcc)'
                }}
              >
                {dayClosed ? 'RÉOUVRIR LA CAISSE' : 'CLÔTURER LA JOURNÉE'}
              </button>
            </div>

            {/* Field Tasks for Clerks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
                <span>Tâches Envoyées au Terrain</span>
                <span>{tasks.length}</span>
              </div>

              <form onSubmit={handleAssignTask} className="flex gap-2">
                <input
                  type="text"
                  value={assignedTaskText}
                  onChange={e => setAssignedTaskText(e.target.value)}
                  placeholder={`Assigner une tâche à ${R.clerk}…`}
                  className="flex-1 px-3 py-2 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-xs text-[var(--fg)] placeholder-[rgba(var(--fgRGB),0.4)] focus:outline-none focus:border-[var(--acc)]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold font-display"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="space-y-1.5">
                {tasks.map(t => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-medium truncate">{t.text}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Pour: {t.to}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--raise)] text-[var(--acc)] shrink-0">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: APPROVALS */}
        {selectedTab === 'approvals' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
              Ventes en Attente d'Approbation ({pendingApprovals.length})
            </div>

            {pendingApprovals.length === 0 ? (
              <div className="p-8 text-center text-xs text-[rgba(var(--fgRGB),0.5)] rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)]">
                Aucune vente en attente. Tout a été traité.
              </div>
            ) : (
              pendingApprovals.map(tx => (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[var(--acc)]">{tx.id}</span>
                      <div className="font-display font-bold text-sm text-[var(--fg)]">{tx.customerName}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Vendeur: {tx.clerkName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black text-lg text-[var(--fg)]">{formatMoney(tx.total)}</div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[rgba(255,183,3,0.15)] text-[var(--warn)]">
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {tx.approvalReason && (
                    <div className="p-2 rounded-lg bg-[var(--raise)] text-[10px] text-[rgba(var(--fgRGB),0.7)] font-mono">
                      Motif: {tx.approvalReason}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => approveTransaction(tx.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      style={{ background: 'var(--acc2)', color: '#ffffff' }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approuver
                    </button>
                    <button
                      onClick={() => rejectTransaction(tx.id, 'Rejeté par la direction')}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-[rgba(255,138,138,0.15)] text-[var(--bad)] border border-[rgba(255,138,138,0.3)] flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Rejeter
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: TEAM & ACCESS PERMISSIONS */}
        {selectedTab === 'team' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
              Membres de l'Équipe &amp; Permissions
            </div>

            {clerks.map(c => (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[rgba(var(--lineRGB),0.1)]"
                    />
                    <div>
                      <div className="font-display font-bold text-xs text-[var(--fg)]">{c.name}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{c.phone} · {c.shift}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[rgba(10,123,79,0.15)] text-[var(--acc2)]">
                    {c.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.06)]">
                  <span className="block text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.4)] mb-1.5">
                    Matrice de Permissions (RBAC) :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'accView', label: 'Voir' },
                      { key: 'accApprove', label: 'Valider' },
                      { key: 'accPrice', label: 'Prix' },
                      { key: 'accTeam', label: 'Équipe' },
                      { key: 'accExport', label: 'Export' }
                    ].map(p => {
                      const enabled = c.permissions?.[p.key];
                      return (
                        <button
                          key={p.key}
                          onClick={() => updateClerkPermissions(c.id, p.key, !enabled)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border transition ${
                            enabled
                              ? 'bg-[var(--accSoft)] border-[var(--acc)] text-[var(--acc)]'
                              : 'bg-[var(--raise)] border-transparent text-[rgba(var(--fgRGB),0.4)]'
                          }`}
                        >
                          {enabled ? '✓ ' : '+ '}{p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PRICING & MARGINS (PATRON ONLY) */}
        {selectedTab === 'pricing' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
              Gestion des Prix &amp; Marges Brutes (Patron)
            </div>

            <div className="space-y-2">
              {products.slice(0, 6).map(prod => (
                <div
                  key={prod.id}
                  className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-xs truncate">{prod.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)] font-mono">
                      Stock: {prod.stock} unités · Coût: {formatMoney(prod.costPrice || prod.price * 0.7)}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-display font-black text-xs text-[var(--acc)]">{formatMoney(prod.price)}</div>
                    <span className="text-[9px] font-mono text-[var(--acc2)] font-bold">
                      Marge: {(((prod.price - (prod.costPrice || prod.price * 0.7)) / prod.price) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

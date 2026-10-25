import { Count } from './anim.jsx';
import { pct } from '../format.js';

const CARGOS = ['Presidente', 'Governador'];

export default function MobileHeader({ m, dark, onToggleTheme, cargo, onCargo }) {
  const pres = cargo === 'Presidente';
  return (
    <header className="m-header" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div aria-hidden="true" style={{ display: 'flex', height: 3 }}>
        <div style={{ flex: 3, background: '#009c3b' }} /><div style={{ flex: 1, background: '#ffdf00' }} /><div style={{ flex: 1, background: '#002776' }} />
      </div>
      <div className="row" style={{ gap: 10, padding: '10px 16px' }}>
        <svg aria-hidden="true" width="32" height="32" viewBox="0 0 38 38">
          <rect width="38" height="38" rx="10" fill="#009c3b" /><path d="M19 6 L33 19 L19 32 L5 19 Z" fill="#ffdf00" /><circle cx="19" cy="19" r="7.2" fill="#002776" />
          <path d="M12.2 17.6 Q19 15.4 25.8 20" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div className="col" style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>Eleições 2026</span>
          <span className="muted" style={{ fontSize: 12 }}>{cargo} · 2º turno</span>
        </div>
        <button type="button" role="switch" aria-checked={dark} aria-label="Tema escuro" onClick={onToggleTheme} className="btn press"
          style={{ position: 'relative', width: 52, height: 30, borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface2)', padding: 0, flex: 'none' }}>
          <span aria-hidden="true" style={{ position: 'absolute', top: 2, left: 2, width: 24, height: 24, borderRadius: '50%', background: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `translateX(${dark ? 22 : 0}px)`, transition: 'transform .45s cubic-bezier(.3,1.6,.5,1), background-color .45s ease' }}>
            <span key={dark ? 'd' : 'l'} className="spin">
              {dark ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--surface)' }} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--surface)' }} strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              )}
            </span>
          </span>
        </button>
      </div>

      <nav aria-label="Cargo" className="row" style={{ gap: 4, margin: '0 16px 8px', background: 'var(--surface2)', padding: 3, borderRadius: 10 }}>
        {CARGOS.map((c) => (
          <button key={c} type="button" className="btn press" aria-pressed={c === cargo} onClick={() => onCargo(c)}
            style={{ flex: 1, fontSize: 13, fontWeight: c === cargo ? 700 : 500, borderRadius: 8, minHeight: 36,
              background: c === cargo ? 'var(--surface)' : 'transparent', color: c === cargo ? 'var(--text)' : 'var(--muted)', boxShadow: c === cargo ? '0 1px 2px rgba(0,0,0,.12)' : 'none' }}>{c}</button>
        ))}
      </nav>

      {pres && (
        <>
          <div className="row muted" style={{ gap: 8, padding: '0 16px 10px', fontSize: 12 }}>
            <span aria-hidden="true" className={m.final || !m.started ? undefined : 'ping'} style={{ width: 7, height: 7, borderRadius: '50%', background: m.final || !m.started ? m.statusDot : 'var(--live)' }} />
            <span>{m.statusLead} · <strong style={{ color: 'var(--text)' }}><Count v={m.nat.apNum} fmt={pct} /></strong> das seções</span>
          </div>
          <div role="progressbar" aria-label="Seções apuradas" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(m.nat.apNum)}
            style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 3 }}>
            <div className="fill stripes" style={{ height: '100%', width: m.nat.apW, backgroundColor: 'var(--live)', borderRadius: '0 3px 3px 0', boxShadow: '0 0 8px var(--live)' }} />
          </div>
        </>
      )}
    </header>
  );
}

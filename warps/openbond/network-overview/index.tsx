import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '../../../ui/lib/components'

function Main() {
  const [stats, setStats] = useState({
    agents: 1024,
    bonds: 12450,
    signals: 892,
    status: 'Operational'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Polling simulation: simulate live updates from the network
      setStats(prev => ({
        ...prev,
        signals: prev.signals + Math.floor(Math.random() * 3),
        bonds: prev.bonds + (Math.random() > 0.8 ? 1 : 0)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#0a0a0a] text-slate-200 rounded-2xl border border-[#262626] shadow-2xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">OpenBond_Telemetry</h1>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-[#98ff98]/60">LIVE_SYNC</span>
          <div className="w-1.5 h-1.5 bg-[#98ff98] rounded-full animate-pulse shadow-[0_0_8px_#98ff98]"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center group transition-colors">
          <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1 opacity-60">Total Agents</div>
          <div className="text-2xl font-black text-white">{stats.agents.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center group transition-colors">
          <div className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1 opacity-60">Active Bonds</div>
          <div className="text-2xl font-black text-white">{stats.bonds.toLocaleString()}</div>
        </div>
      </div>

      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network_Stability</span>
          <span className="text-[9px] font-mono text-[#98ff98]">{stats.status}</span>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div className="bg-[#98ff98] h-full w-[98%] shadow-[0_0_10px_#98ff98]"></div>
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
         <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Signals_Emitted: <span className="text-white">{stats.signals}</span>
         </div>
         <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Latency: <span className="text-[#98ff98]">24ms</span>
         </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App>
        <Main />
      </App>
    </React.StrictMode>
  )
}
import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { CheckCircle, ExternalLink } from '@openai/apps-sdk-ui/components/Icon'
import { Tooltip } from '@openai/apps-sdk-ui/components/Tooltip'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { OpenBondRegisterAgentData, OpenBondRegisterAgentInputs } from './warp.types'

function Main() {
  const { data, inputs } = useAppContext<OpenBondRegisterAgentData, OpenBondRegisterAgentInputs>()

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  if (!data.TX_HASH) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-[#0a0a0a] text-slate-200 rounded-2xl border border-[#262626]">
        <h1 className="text-xl font-black tracking-tighter text-white uppercase">Registering Agent...</h1>
        <p className="text-sm text-slate-400">Waiting for on-chain confirmation.</p>
      </div>
    )
  }

  const explorerUrl = `https://devnet-explorer.multiversx.com/transactions/${data.TX_HASH}`

  return (
    <div className="flex flex-col gap-4 p-6 bg-[#0a0a0a] text-slate-200 rounded-2xl border border-[#262626] shadow-2xl">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <CheckCircle className="size-10 text-[#98ff98]" />
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Agent Active</h1>
        </div>
        <Badge color="success" style={{ backgroundColor: 'rgba(152, 255, 152, 0.1)', color: '#98ff98', borderColor: 'rgba(152, 255, 152, 0.2)' }}>
            Network Sync Confirmed
        </Badge>
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-4">
        <div>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Agent Name</p>
          <p className="text-lg font-black text-white">{inputs.name}</p>
        </div>
        
        <div className="pt-4 border-t border-white/5">
          <dt className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">
            <ExternalLink className="size-3" />
            Lineage_ID
          </dt>
          <Tooltip content={data.TX_HASH}>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#98ff98] hover:underline cursor-pointer block truncate"
            >
              {data.TX_HASH}
            </a>
          </Tooltip>
        </div>
      </div>
      
      <div className="text-center pt-2">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Welcome to the Network
          </p>
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
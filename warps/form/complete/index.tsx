import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { FormCompleteInputs } from './warp.types'

function Main() {
  const { inputs, t } = useAppContext<undefined, FormCompleteInputs>()

  const firstName = inputs?.SUBMITTER_NAME?.split(' ')[0] ?? ''
  const custom = inputs?.CUSTOM_MESSAGE

  const heading = t({ en: 'All done!', de: 'Vielen Dank!', fr: 'C est fait !', es: 'Todo listo!', ro: 'Gata!' })
  const defaultMsg = t({
    en: `Thanks ${firstName} — your details are with us. We'll be in touch soon.`,
    de: `Danke ${firstName} — deine Angaben sind bei uns. Wir melden uns in Kürze.`,
    fr: `Merci ${firstName} — nous avons bien recu vos informations. Nous reviendrons vers vous bientot.`,
    es: `Gracias ${firstName} — tenemos tus datos. Te contactaremos pronto.`,
    ro: `Multumim ${firstName} — avem datele tale. Vom reveni catre tine in scurt timp.`,
  })

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center max-w-sm mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl">✓</div>
      <div>
        <h2 className="text-xl font-semibold">{heading}</h2>
        <p className="text-sm text-gray-500 mt-2">{custom || defaultMsg}</p>
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

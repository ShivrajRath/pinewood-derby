import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Guide from './components/Guide'
import SpeedSecrets from './components/SpeedSecrets'
import WeightLab from './components/WeightLab'
import ProTips from './components/ProTips'
import Tools from './components/Tools'
import RaceDay from './components/RaceDay'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { Ticker } from './components/ui'
import { tickerItems } from './data/content'

export default function App() {
  return (
    <div className="relative overflow-x-clip bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Ticker items={tickerItems} />
        <Guide />
        <SpeedSecrets />
        <WeightLab />
        <ProTips />
        <Tools />
        <RaceDay />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

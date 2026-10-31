import Hero from '../components/home/Hero.jsx'
import Expertises from '../components/home/Expertises.jsx'
import Realisations from '../components/home/Realisations.jsx'
import WhyDDS from '../components/home/WhyDDS.jsx'
import ClientSpace from '../components/home/ClientSpace.jsx'
import Contact from '../components/home/Contact.jsx'
import { usePageTitle } from '../lib/hooks.js'

export default function Home() {
  usePageTitle('')
  return (
    <>
      <Hero />
      <Expertises />
      <Realisations />
      <WhyDDS />
      <ClientSpace />
      <Contact />
    </>
  )
}

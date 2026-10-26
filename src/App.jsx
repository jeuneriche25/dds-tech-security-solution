import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Expertises from './components/Expertises.jsx'
import Realisations from './components/Realisations.jsx'
import WhyDDS from './components/WhyDDS.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Expertises />
        <Realisations />
        <WhyDDS />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

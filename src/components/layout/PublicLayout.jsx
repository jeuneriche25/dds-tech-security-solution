import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

export default function PublicLayout() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

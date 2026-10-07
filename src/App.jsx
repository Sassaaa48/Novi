import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import CtaBand from './components/CtaBand.jsx';
import Footer from './components/Footer.jsx';
import SignupDialog from './components/SignupDialog.jsx';
import useReveal from './hooks/useReveal.js';

export default function App() {
  const [dialog, setDialog] = useState({ open: false, mode: 'signup' });
  const openSignup = () => setDialog({ open: true, mode: 'signup' });
  const openLogin = () => setDialog({ open: true, mode: 'login' });
  useReveal();

  return (
    <>
      <Nav onSignup={openSignup} onLogin={openLogin} />
      <main>
        <Hero onSignup={openSignup} />
        <Features />
        <CtaBand onSignup={openSignup} />
      </main>
      <Footer />
      <SignupDialog
        open={dialog.open}
        mode={dialog.mode}
        onClose={() => setDialog((d) => ({ ...d, open: false }))}
      />
    </>
  );
}

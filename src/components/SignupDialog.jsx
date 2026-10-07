import { useEffect, useRef } from 'react';
import SignupForm from './SignupForm.jsx';
import { IconClose } from './Icons.jsx';

const COPY = {
  signup: {
    title: 'Start free with your team',
    sub: 'Create a workspace in under a minute. Free for teams up to 5, no credit card required.',
    button: 'Start free',
  },
  login: {
    title: 'Log in to Novi',
    sub: 'Enter your work email and we’ll send you a sign-in link.',
    button: 'Email me a link',
  },
};

/**
 * Native <dialog>: focus trapping, Escape to close and the backdrop come for free.
 * `mode` is 'signup' or 'login'; both send a sign-in link to the email entered.
 */
export default function SignupDialog({ open, mode = 'signup', onClose }) {
  const copy = COPY[mode];
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      inputRef.current?.focus();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
        <IconClose />
      </button>
      <div className="modal-body">
        <h2 id="modal-title">{copy.title}</h2>
        <p className="sub">{copy.sub}</p>
        <SignupForm key={mode} inputRef={inputRef} buttonLabel={copy.button} />
      </div>
    </dialog>
  );
}

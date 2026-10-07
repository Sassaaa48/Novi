import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Small controlled-form hook shared by the footer signup and the modal.
 * Returns the field value, a status message { type: '' | 'ok' | 'err', text }
 * and handlers. There is no backend: a valid email just shows `successMessage(email)`.
 */
const signInMessage = (email) => `You’re in. Check ${email} for your sign-in link.`;

export default function useEmailForm(defaultMessage = '', successMessage = signInMessage) {
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState({ type: '', text: defaultMessage });

  const onChange = (e) => {
    setEmail(e.target.value);
    if (invalid) {
      setInvalid(false);
      setMessage({ type: '', text: defaultMessage });
    }
  };

  const onSubmit = (e, inputEl) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setInvalid(true);
      setMessage({
        type: 'err',
        text: value
          ? 'That email doesn’t look right. Check it and try again.'
          : 'Enter your work email to get started.',
      });
      inputEl?.focus();
      return;
    }
    setInvalid(false);
    setMessage({ type: 'ok', text: successMessage(value) });
    setEmail('');
  };

  return { email, invalid, message, onChange, onSubmit };
}

import { useId, useRef } from 'react';
import useEmailForm from '../hooks/useEmailForm.js';

export default function SignupForm({
  defaultMessage = '',
  successMessage,
  buttonClass = 'btn-lime',
  buttonLabel = 'Start free',
  placeholder = 'you@yourteam.com',
  inputRef,
}) {
  const id = useId();
  const localRef = useRef(null);
  const ref = inputRef || localRef;
  const { email, invalid, message, onChange, onSubmit } = useEmailForm(
    defaultMessage,
    successMessage,
  );

  return (
    <form className="signup-form" noValidate onSubmit={(e) => onSubmit(e, ref.current)}>
      <label className="sr" htmlFor={id}>
        Work email
      </label>
      <div className={'field' + (invalid ? ' error' : '')}>
        <input
          ref={ref}
          id={id}
          type="email"
          placeholder={placeholder}
          autoComplete="email"
          value={email}
          onChange={onChange}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-msg`}
        />
        <button type="submit" className={`btn btn-sm ${buttonClass}`}>
          {buttonLabel}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        className={'form-msg' + (message.type ? ` ${message.type}` : '')}
        role="status"
      >
        {message.text}
      </p>
    </form>
  );
}

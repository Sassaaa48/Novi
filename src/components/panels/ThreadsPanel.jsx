import { useEffect, useRef, useState } from 'react';
import Panel from './Panel.jsx';
import { ME, PEOPLE, THREAD_MESSAGES } from '../../data.js';

const pad = (n) => String(n).padStart(2, '0');

export default function ThreadsPanel({ active }) {
  const [messages, setMessages] = useState(THREAD_MESSAGES);
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, active]);

  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const d = new Date();
    setMessages((m) => [
      ...m,
      { who: ME, name: 'You', time: `${d.getHours()}:${pad(d.getMinutes())}`, text, me: true },
    ]);
    setDraft('');
  };

  return (
    <Panel id="threads" active={active}>
      <div className="task-ref">
        <span className="pill">Web</span>
        Redesign pricing page
      </div>

      <ul className="thread" ref={listRef} aria-live="polite">
        {messages.map((m, i) => (
          <li className={'msg' + (m.me ? ' me' : '')} key={i}>
            <span className="avatar" style={{ '--c': PEOPLE[m.who] }}>
              {m.who}
            </span>
            <div className="bubble">
              <b>{m.name}</b>
              <time>{m.time}</time>
              <p>{m.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="reply" onSubmit={send}>
        <label className="sr" htmlFor="reply">
          Reply to this task
        </label>
        <input
          id="reply"
          type="text"
          placeholder="Reply to this task"
          autoComplete="off"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="btn btn-ink btn-sm" type="submit">
          Send
        </button>
      </form>
    </Panel>
  );
}

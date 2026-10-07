import { useEffect, useRef, useState } from 'react';
import Panel from './Panel.jsx';
import { IMPORT_SOURCES, importSteps } from '../../data.js';
import { IconTick } from '../Icons.jsx';

/** Simulated import: a progress bar plus steps that appear one by one. */
export default function ImportPanel({ active }) {
  const [source, setSource] = useState('Trello');
  const [status, setStatus] = useState('idle'); // idle | running | done
  const [runId, setRunId] = useState(0);
  const [steps, setSteps] = useState([]);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const start = () => {
    clearTimers();
    setStatus('running');
    setSteps([]);
    setRunId((n) => n + 1); // new key restarts the bar animation
    importSteps(source).forEach((text, i) => {
      timers.current.push(setTimeout(() => setSteps((s) => [...s, text]), 450 + i * 450));
    });
    timers.current.push(setTimeout(() => setStatus('done'), 2300));
  };

  const running = status === 'running';

  return (
    <Panel id="import" active={active}>
      <div className="sheet-head">
        <h4>Bring your work over</h4>
        <span>Pick where it lives today</span>
      </div>

      <fieldset className="sources" disabled={running}>
        <legend className="sr">Import source</legend>
        {IMPORT_SOURCES.map(({ value, label, Icon }) => (
          <label className="source" key={value}>
            <input
              type="radio"
              name="import-source"
              value={value}
              checked={source === value}
              onChange={() => setSource(value)}
            />
            <span>
              <Icon />
              {label}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="import-run">
        <div className="import-bar" aria-hidden="true">
          <b key={runId} className={status === 'idle' ? '' : 'run'} />
        </div>
        <ul className="import-steps" aria-live="polite">
          {steps.map((s) => (
            <li key={s}>
              <IconTick />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <div className="import-foot">
          <small>
            {status === 'done'
              ? 'Ready. Your boards are waiting.'
              : 'Your original data is never changed.'}
          </small>
          <button className="btn btn-ink btn-sm" type="button" onClick={start} disabled={running}>
            {running ? 'Importing' : status === 'done' ? 'Import again' : 'Start import'}
          </button>
        </div>
      </div>
    </Panel>
  );
}

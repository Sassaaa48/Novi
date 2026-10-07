import Panel from './Panel.jsx';
import { TIMELINE_ROWS, TIMELINE_TODAY } from '../../data.js';

export default function TimelinePanel({ active }) {
  return (
    <Panel id="timeline" active={active}>
      <div className="sheet-head">
        <h4>Q3 Release Milestone</h4>
        <span className="pill pill-lime">On track</span>
      </div>
      <div className="tl" style={{ '--today': TIMELINE_TODAY }}>
        <div className="tl-today" aria-hidden="true">
          <span>Today</span>
        </div>
        {TIMELINE_ROWS.map((r, i) => (
          <div className="tl-row" key={r.name}>
            <span className="tl-name">{r.name}</span>
            <div className="tl-track">
              <div
                className={`tl-bar tone-${r.tone}`}
                style={{ '--s': `${r.start}%`, '--w': `${r.width}%`, '--d': i }}
              >
                {r.bar}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sheet-foot">
        <span>Sprint 14 · Week 2</span>
        <b>Launch Oct 30</b>
      </div>
    </Panel>
  );
}

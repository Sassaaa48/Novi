import Panel from './Panel.jsx';
import { MINI_BOARD, PEOPLE } from '../../data.js';

export default function BoardPanel({ active }) {
  return (
    <Panel id="board" active={active}>
      <div className="sheet-head">
        <h4>Sprint 14</h4>
        <span className="pill pill-lime">6 of 9 done</span>
      </div>
      <div className="sprint-bar" aria-hidden="true">
        <b />
      </div>
      <div className="mini-cols">
        {MINI_BOARD.map((col) => (
          <div className="mini-col" key={col.name}>
            <h5>{col.name}</h5>
            {col.cards.map((c) => (
              <div className="mini-card" key={c.title}>
                {c.title}
                <div className="row">
                  <span className="pill">{c.tag}</span>
                  <span className="avatar" style={{ '--c': PEOPLE[c.who] }}>
                    {c.who}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sheet-foot">
        <span>Ends Friday</span>
        <b>67% complete</b>
      </div>
    </Panel>
  );
}

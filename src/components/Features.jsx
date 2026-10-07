import { useEffect, useRef, useState } from 'react';
import { FEATURES } from '../data.js';
import BoardPanel from './panels/BoardPanel.jsx';
import ThreadsPanel from './panels/ThreadsPanel.jsx';
import TimelinePanel from './panels/TimelinePanel.jsx';
import ImportPanel from './panels/ImportPanel.jsx';

const PANELS = {
  board: BoardPanel,
  threads: ThreadsPanel,
  timeline: TimelinePanel,
  import: ImportPanel,
};

const WIDE = '(min-width: 901px)';
const NAV_CLEARANCE = 88;

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/**
 * Scroll-driven feature list. On wide screens the canvas on the left is sticky
 * and switches to whichever feature crosses the middle of the viewport.
 * Each title is a heading containing a disclosure button for its demo panel.
 */
export default function Features() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    let io;
    const setup = () => {
      io?.disconnect();
      if (!mq.matches) return;
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(Number(e.target.dataset.index));
          }),
        { rootMargin: '-45% 0px -45% 0px' },
      );
      itemRefs.current.forEach((el) => el && io.observe(el));
    };
    setup();
    mq.addEventListener('change', setup);
    return () => {
      io?.disconnect();
      mq.removeEventListener('change', setup);
    };
  }, []);

  const select = (i) => {
    setActive(i);
    if (window.matchMedia(WIDE).matches) {
      // Keep the scroll position in step so the observer agrees with the click.
      itemRefs.current[i]?.scrollIntoView({ block: 'center', behavior: scrollBehavior() });
      return;
    }
    // Stacked layout: the canvas sits above the list, so bring it into view.
    const canvas = canvasRef.current;
    const r = canvas?.getBoundingClientRect();
    if (r && (r.top < NAV_CLEARANCE || r.bottom > window.innerHeight)) {
      canvas.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
    }
  };

  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Core architecture</span>
          <h2>
            Everything your team needs, <em>nothing it doesn’t.</em>
          </h2>
          <p>
            Planning, talking, and tracking in one place, so your team spends less time managing
            work and more time doing it.
          </p>
        </div>

        <div className="scrolly">
          <div className="canvas-col">
            <div className="canvas" ref={canvasRef}>
              {FEATURES.map((f, i) => {
                const Panel = PANELS[f.id];
                return <Panel key={f.id} active={active === i} />;
              })}
              <div className="canvas-foot" aria-hidden="true">
                <em>Interactive Live Canvas</em>
                <code>60 FPS Engine</code>
              </div>
            </div>
          </div>

          <div
            className="flist"
            style={{ '--fill': `${((active + 0.62) / FEATURES.length) * 100}%` }}
          >
            <span className="rail" aria-hidden="true" />
            {FEATURES.map((f, i) => {
              const selected = active === i;
              return (
                <article
                  key={f.id}
                  className={'fitem' + (selected ? ' is-active' : '')}
                  data-index={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                >
                  <div className="fitem-top">
                    <span className="ficon" aria-hidden="true">
                      <f.Icon />
                    </span>
                    <span className="fnum">Feature {f.num}</span>
                    {selected && <span className="live">Active view</span>}
                  </div>
                  <h3 className="ftitle">
                    <button
                      type="button"
                      id={`feature-${f.id}`}
                      aria-expanded={selected}
                      aria-controls={`panel-${f.id}`}
                      onClick={() => select(i)}
                    >
                      {f.title}
                    </button>
                  </h3>
                  <p className="ftext">{f.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

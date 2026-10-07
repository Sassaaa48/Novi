import { Fragment, useRef, useState } from 'react';
import HeroBoard from './HeroBoard.jsx';
import { IconArrowUp, IconPlay } from './Icons.jsx';

/* Each word rises in on load. `start` continues the stagger across lines. */
function Words({ text, start = 0 }) {
  const words = text.split(' ');
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="w" style={{ '--w': start + i }}>
        {w}
      </span>
      {i < words.length - 1 && ' '}
    </Fragment>
  ));
}

export default function Hero({ onSignup }) {
  const demoRef = useRef(null);
  // idle: play the demo · playing: stop it · done: move on to the features section
  const [demo, setDemo] = useState('idle');

  const onDemoClick = (e) => {
    if (demo === 'done') {
      setDemo('idle');
      return; // let the link scroll to #features
    }
    e.preventDefault();
    if (demo === 'playing') demoRef.current?.stop();
    else demoRef.current?.play();
  };

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-head">
          <h1>
            <Words text="Run your team without the" />
            <em>
              <Words text="tab switching." start={5} />
            </em>
          </h1>
          <p className="lede">Tasks, docs, and conversations in one calm workspace.</p>
          <div className="hero-cta">
            <a
              href="#signup"
              className="btn btn-lime btn-lg"
              onClick={(e) => {
                e.preventDefault();
                onSignup();
              }}
            >
              Start free
            </a>
            <a
              href="#features"
              className={'btn btn-outline btn-lg demo-btn is-' + demo}
              onClick={onDemoClick}
              aria-label={demo === 'playing' ? 'Stop the demo' : undefined}
            >
              {demo === 'playing' && (
                <>
                  <span className="demo-stop" aria-hidden="true" /> Stop demo
                </>
              )}
              {demo === 'done' && (
                <>
                  See all features <IconArrowUp className="arrow-down" />
                </>
              )}
              {demo === 'idle' && (
                <>
                  <IconPlay /> See how it works
                </>
              )}
            </a>
          </div>
        </div>

        <HeroBoard demoRef={demoRef} onDemoState={setDemo} />
      </div>
    </section>
  );
}

import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  BOARD_FILTERS,
  COLUMN_NAMES,
  INITIAL_TASKS,
  INTRO_TABS,
  ME,
  NEW_TASK_TITLES,
  PEOPLE,
} from '../data.js';
import {
  IconBoard,
  IconCheck,
  IconChecklist,
  IconCheckCircle,
  IconChevron,
  IconClip,
  IconComment,
  IconDoubleCheck,
  IconPlus,
  IconSearch,
} from './Icons.jsx';

const META_ICONS = {
  checklist: IconChecklist,
  clip: IconClip,
  comment: IconComment,
  done: IconCheckCircle,
};
const HOLD_MS = 260; // touch: press and hold this long to pick a card up
const SLOP = 6; // mouse: pixels to move before a drag starts
const TOUCH_SLOP = 10; // touch: moving further than this before the hold means "scroll"
const EDGE = 72; // pixels from the viewport edge where a drag auto-scrolls
const NAV_CLEARANCE = 96; // floating nav height plus breathing room
const INTRO_MS = 3000; // tabs collapse, board grows in, cards rise
const CANCELLED = Symbol('demo cancelled');

/**
 * Interactive demo board.
 * - Click/tap a card's circle to advance it (Done -> back to To do).
 * - Drag a card onto any column. Pointer events, so it works with mouse
 *   and touch (press and hold on touch, so normal swipes still scroll).
 * - Filter chips, the search field and the + buttons all work.
 * - On load, the tools Novi replaces (Slack, Docs, Jira…) collapse into the board.
 * - `demoRef.current.play()` runs a guided demo with a ghost cursor. Any real
 *   input (pointer, key, wheel, touch) cancels it and hands control back.
 *   `onDemoState` hears 'playing', then 'done' (finished) or 'idle' (stopped).
 */
export default function HeroBoard({ demoRef, onDemoState }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('sprint');
  const [query, setQuery] = useState('');
  const [entering, setEntering] = useState(true);
  const [popId, setPopId] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [overCol, setOverCol] = useState(null);
  const boardRef = useRef(null);
  const focusId = useRef(null);
  const nextId = useRef(100);
  const drag = useRef(null);
  const overRef = useRef(null);
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const demo = useRef(null);
  const [caption, setCaption] = useState('');

  useEffect(
    () => () => {
      drag.current?.cleanup();
      if (demo.current) demo.current.cancelled = true;
    },
    [],
  );

  // The entrance animation plays once, then the class is removed.
  useEffect(() => {
    const t = setTimeout(() => setEntering(false), INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (popId == null) return;
    const t = setTimeout(() => setPopId(null), 400);
    return () => clearTimeout(t);
  }, [popId]);

  // Cards remount when they change column, so hand keyboard focus back.
  useEffect(() => {
    if (focusId.current == null) return;
    boardRef.current
      ?.querySelector(`[data-id="${focusId.current}"] .check`)
      ?.focus({ preventScroll: true });
    focusId.current = null;
  }, [tasks]);

  const move = (id, col, focus = true) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.col === col) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, col } : t)));
    setPopId(id);
    if (focus) focusId.current = id;
  };

  const setOver = (ci) => {
    overRef.current = ci;
    setOverCol(ci);
  };

  const onPointerDown = (e, id) => {
    if (e.button !== 0 || e.target.closest('button') || drag.current) return;
    const d = {
      id,
      el: e.currentTarget,
      pointerId: e.pointerId,
      touch: e.pointerType !== 'mouse',
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      active: false,
    };

    // Follow the pointer every frame so edge auto-scroll keeps going while it rests.
    const tick = () => {
      if (d.y < EDGE) window.scrollBy(0, -10);
      else if (d.y > window.innerHeight - EDGE) window.scrollBy(0, 10);
      const dy = d.y - d.startY + window.scrollY - d.scrollY;
      d.el.style.transform = `translate(${d.x - d.startX}px, ${dy}px) rotate(1.5deg)`;
      const col = document.elementFromPoint(d.x, d.y)?.closest('.col');
      setOver(col && boardRef.current?.contains(col) ? Number(col.dataset.col) : null);
      d.raf = requestAnimationFrame(tick);
    };

    const start = () => {
      d.active = true;
      d.scrollY = window.scrollY;
      setDragging(id);
      navigator.vibrate?.(8);
      d.raf = requestAnimationFrame(tick);
    };

    const onMove = (ev) => {
      if (ev.pointerId !== d.pointerId) return;
      d.x = ev.clientX;
      d.y = ev.clientY;
      if (d.active) return;
      const dist = Math.hypot(d.x - d.startX, d.y - d.startY);
      if (d.touch && dist > TOUCH_SLOP) cleanup();
      else if (!d.touch && dist > SLOP) start();
    };

    const onUp = (ev) => {
      if (ev.pointerId !== d.pointerId) return;
      const target = overRef.current;
      const wasActive = d.active;
      cleanup();
      if (wasActive && target != null) move(id, target);
    };

    // Once a card is picked up on touch, stop the page from scrolling under the finger.
    const blockScroll = (ev) => {
      if (d.active) ev.preventDefault();
    };

    function cleanup() {
      clearTimeout(d.timer);
      cancelAnimationFrame(d.raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', cleanup);
      window.removeEventListener('touchmove', blockScroll);
      d.el.style.transform = '';
      if (d.active) {
        setDragging(null);
        setOver(null);
      }
      drag.current = null;
    }

    d.cleanup = cleanup;
    drag.current = d;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', cleanup);
    window.addEventListener('touchmove', blockScroll, { passive: false });
    if (d.touch) d.timer = setTimeout(start, HOLD_MS);
  };

  /* ---------- Guided demo ---------- */

  // A point inside `el`, relative to the stage the cursor is positioned in.
  const point = (el, ax = 0.5, ay = 0.5) => {
    const s = stageRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - s.left + r.width * ax, y: r.top - s.top + r.height * ay };
  };

  const playDemo = async () => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor || demo.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reduce ? 'auto' : 'smooth';

    // Only scroll when the board isn't already fully in view, and then line its top up under the nav.
    const r = stage.getBoundingClientRect();
    if (r.top < NAV_CLEARANCE || r.bottom > window.innerHeight) {
      window.scrollTo({ top: window.scrollY + r.top - NAV_CLEARANCE, behavior });
    }
    if (reduce) return;

    const run = { cancelled: false };
    demo.current = run;
    const stop = () => {
      run.cancelled = true;
      cursor.classList.remove('on');
    };
    run.stop = stop;
    let finished = false;
    onDemoState?.('playing');
    const STOP_ON = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    STOP_ON.forEach((t) => window.addEventListener(t, stop, { capture: true, passive: true }));

    const wait = (ms) =>
      new Promise((resolve, reject) => {
        setTimeout(() => (run.cancelled ? reject(CANCELLED) : resolve()), ms);
      });
    const aim = (p) => {
      cursor.classList.toggle('flip', p.x > stage.offsetWidth * 0.6);
      cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
    };
    // On phones the board is taller than the screen, so keep each step's target in view.
    const follow = (el) => {
      const b = el.getBoundingClientRect();
      if (b.top < NAV_CLEARANCE || b.bottom > window.innerHeight - 24) {
        el.scrollIntoView({ block: 'center', behavior });
      }
    };
    const click = async () => {
      cursor.classList.add('press');
      await wait(170);
      cursor.classList.remove('press');
    };
    const $ = (sel) => boardRef.current.querySelector(sel);
    let lifted = null;

    try {
      setFilter('sprint');
      setQuery('');
      await wait(entering ? 1400 : 650);

      // Appear in place, then glide from there.
      cursor.style.transition = 'none';
      aim(point(boardRef.current, 0.5, 0.1));
      cursor.getBoundingClientRect();
      cursor.style.transition = '';
      cursor.classList.add('on');
      await wait(250);

      // 1. Drag the first To do card into In progress.
      const card = $('.col[data-col="0"] .card');
      const dest = $('.col[data-col="1"] ul');
      if (card && dest) {
        const id = Number(card.dataset.id);
        setCaption('Drag a task into In progress');
        follow(card);
        aim(point(card, 0.3, 0.5));
        await wait(850);
        cursor.classList.add('press');
        const grab = point(card, 0.3, 0.5);
        const from = card.getBoundingClientRect();
        const to = dest.getBoundingClientRect();
        const dx = to.left - from.left;
        const dy = to.bottom + 10 - from.top;
        lifted = card;
        setDragging(id);
        follow(dest);
        await wait(140);
        card.style.transition = 'transform .9s var(--ease)';
        card.style.transform = `translate(${dx}px, ${dy}px) rotate(1.5deg)`;
        aim({ x: grab.x + dx, y: grab.y + dy });
        setOver(1);
        await wait(980);
        cursor.classList.remove('press');
        setOver(null);
        setDragging(null);
        move(id, 1, false); // the card remounts in its new column
        lifted = null;
        await wait(650);
      }

      // 2. Filter to my tasks, then back to the sprint.
      setCaption('Filter to just your tasks');
      follow($('[data-filter="mine"]'));
      aim(point($('[data-filter="mine"]')));
      await wait(800);
      await click();
      setFilter('mine');
      await wait(1100);
      setCaption('Back to the whole sprint');
      aim(point($('[data-filter="sprint"]')));
      await wait(750);
      await click();
      setFilter('sprint');
      await wait(650);

      // 3. Tick a card in progress to ship it.
      const check = $('.col[data-col="1"] .card:last-child .check');
      if (check) {
        setCaption('Tick the circle to ship it');
        follow(check);
        aim(point(check));
        await wait(850);
        await click();
        move(Number(check.closest('.card').dataset.id), 2, false);
        await wait(900);
      }

      setCaption('Your turn. Drag, filter, or tick.');
      await wait(2200);
      finished = true;
    } catch (err) {
      if (err !== CANCELLED) throw err;
    } finally {
      if (lifted) {
        lifted.style.transition = '';
        lifted.style.transform = '';
      }
      setDragging(null);
      setOver(null);
      cursor.classList.remove('on', 'press');
      setCaption('');
      STOP_ON.forEach((t) => window.removeEventListener(t, stop, { capture: true }));
      demo.current = null;
      onDemoState?.(finished ? 'done' : 'idle');
    }
  };

  useImperativeHandle(demoRef, () => ({ play: playDemo, stop: () => demo.current?.stop() }));

  const addTask = (col) => {
    const id = nextId.current++;
    const title = NEW_TASK_TITLES[(id - 100) % NEW_TASK_TITLES.length];
    setTasks((prev) => [
      ...prev,
      {
        id,
        title,
        tag: 'New',
        date: 'No date',
        meta: { icon: 'comment', text: '0' },
        who: ME,
        col,
        sprint: true,
      },
    ]);
    setQuery('');
    setPopId(id);
  };

  const q = query.trim().toLowerCase();
  const visible = tasks.filter(
    (t) =>
      (filter === 'all' || (filter === 'mine' ? t.who === ME : t.sprint)) &&
      (!q || `${t.title} ${t.tag}`.toLowerCase().includes(q)),
  );

  return (
    <div ref={stageRef} className={'board-stage' + (entering ? ' enter' : '')}>
      {entering && (
        <div className="intro-tabs" aria-hidden="true">
          {INTRO_TABS.map((name, i) => (
            <span
              key={name}
              className="itab"
              style={{ '--k': i, '--x': i - (INTRO_TABS.length - 1) / 2 }}
            >
              <i />
              {name}
            </span>
          ))}
        </div>
      )}

      <span ref={cursorRef} className="demo-cursor" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 3l15.5 7.6-6.7 1.9L9.8 19.4z" />
        </svg>
        <span className="demo-label">{caption}</span>
      </span>
      <p className="sr" aria-live="polite">
        {caption}
      </p>

      <div ref={boardRef} className="board-shell" aria-label="Interactive demo board">
        <div className="board-top">
          <div className="board-left">
            <span className="chip chip-select">
              <IconBoard />
              Q3 Product Roadmap
              <IconChevron />
            </span>
            <div className="chips" role="group" aria-label="Show">
              {BOARD_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="chip"
                  data-filter={f.id}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="board-right">
            <span className="stack" aria-label="6 teammates">
              <span className="avatar">EK</span>
              <span className="avatar">JF</span>
              <span className="avatar" style={{ '--c': 'var(--lime)' }}>
                AL
              </span>
              <span className="avatar">+3</span>
            </span>
            <label className="search">
              <IconSearch />
              <span className="sr">Filter tasks</span>
              <input
                type="search"
                placeholder="Filter…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <button type="button" className="btn btn-ink btn-xs" onClick={() => addTask(0)}>
              <IconPlus />
              New
            </button>
          </div>
        </div>

        <div className="cols">
          {COLUMN_NAMES.map((name, ci) => {
            const items = visible.filter((t) => t.col === ci);
            // The count is the whole column, so it stays put while a filter hides cards.
            const total = tasks.filter((t) => t.col === ci).length;
            return (
              <div key={name} className={'col' + (overCol === ci ? ' over' : '')} data-col={ci}>
                <div className="col-head">
                  <h3>
                    {name}
                    <span className="count">{total}</span>
                  </h3>
                  <button
                    type="button"
                    className="col-add"
                    aria-label={`Add a task to ${name}`}
                    onClick={() => addTask(ci)}
                  >
                    <IconPlus />
                  </button>
                </div>
                <ul>
                  {items.map((t) => {
                    const done = ci === 2;
                    const label = done
                      ? `Reopen “${t.title}”`
                      : `Move “${t.title}” to ${COLUMN_NAMES[ci + 1]}`;
                    const MetaIcon = META_ICONS[t.meta.icon];
                    const ready = ci === 1 && t.progress === 100;
                    return (
                      <li
                        key={t.id}
                        data-id={t.id}
                        className={
                          'card' +
                          (t.id === popId ? ' pop' : '') +
                          (t.id === dragging ? ' dragging' : '')
                        }
                        style={{ '--i': t.id % 10 }}
                        onPointerDown={(e) => onPointerDown(e, t.id)}
                        onContextMenu={(e) => {
                          if (drag.current?.touch) e.preventDefault();
                        }}
                      >
                        <div className="card-top">
                          <span className={'pill' + (t.goal ? ' pill-lime' : '')}>{t.tag}</span>
                          <span className="card-side">
                            {ready && (
                              <button
                                type="button"
                                className="ready"
                                aria-label={label}
                                onClick={() => move(t.id, 2)}
                              >
                                <IconCheck />
                                Done
                              </button>
                            )}
                            {!done && <span className="card-date">{t.date}</span>}
                            {!ready && (
                              <button
                                type="button"
                                className="check"
                                aria-label={label}
                                onClick={() => move(t.id, (ci + 1) % 3)}
                              >
                                <IconCheck />
                              </button>
                            )}
                          </span>
                        </div>
                        <span className="card-title">{t.title}</span>
                        {t.progress != null && ci === 1 && (
                          <div className="card-progress">
                            <span>
                              <span>Progress</span>
                              <b>{t.progress}%</b>
                            </span>
                            <span className="bar">
                              <b style={{ width: `${t.progress}%` }} />
                            </span>
                          </div>
                        )}
                        <div className="card-meta">
                          {done ? (
                            <>
                              <span className="meta-info">
                                {t.doneText || 'Completed just now'}
                              </span>
                              <IconDoubleCheck className="meta-done" />
                            </>
                          ) : (
                            <>
                              <span className="meta-info">
                                <MetaIcon />
                                {t.meta.text}
                              </span>
                              <span
                                className="avatar"
                                style={{ '--c': PEOPLE[t.who] }}
                                title={t.who}
                              >
                                {t.who}
                              </span>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {items.length === 0 && <p className="col-empty">Nothing here yet</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Lime "N" tile plus the name. `round` gives the circular mark used in the footer. */
export default function Logo({ round = false, href = '#top', label }) {
  return (
    <a href={href} className={'logo' + (round ? ' round' : '')} aria-label={label}>
      <span className="logo-mark" aria-hidden="true">
        N
      </span>
      Novi
    </a>
  );
}

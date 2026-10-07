/* Shared demo panel, labelled by its feature's button. Panels stay mounted so their state survives switching. */
export default function Panel({ id, active, children }) {
  return (
    <div
      className={'panel' + (active ? ' active' : '')}
      role="region"
      id={`panel-${id}`}
      aria-labelledby={`feature-${id}`}
      hidden={!active}
    >
      <div className="sheet">{children}</div>
    </div>
  );
}

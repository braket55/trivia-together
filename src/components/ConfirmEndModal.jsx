export function ConfirmEndModal({ onResume, onEnd }) {
  return (
    <div className="modal-backdrop">
      <section className="modal-card">
        <p className="eyebrow">Pause</p>
        <h2>End this session?</h2>
        <p>
          You can resume the current session, or end it and go to the summary
          screen.
        </p>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onResume}>
            Resume Playing
          </button>
          <button className="danger-button" onClick={onEnd}>
            End Session
          </button>
        </div>
      </section>
    </div>
  );
}
function SectionHeading({ number, title }) {
  return (
    <div
      className="section-heading"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
        width: '100%',
      }}
    >
      <span
        className="section-heading__number"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
          fontSize: '1rem',
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {number}.
      </span>
      <h2
        className="section-heading__title"
        style={{
          color: 'var(--text-primary)',
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          margin: 0,
          transition: 'color var(--transition-fast)',
        }}
      >
        {title}
      </h2>
      <div
        className="section-heading__line"
        style={{
          flex: 1,
          height: '1px',
          background: 'var(--text-secondary)',
          opacity: 0.3,
          marginLeft: '12px',
        }}
      />
    </div>
  );
}

export default SectionHeading;

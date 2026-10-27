import './Header.css'

export default function Header({ onGoHome, children }) {
  return (
    <header className="header">
      <div className="header__inner">
        <button type="button" className="brand" onClick={onGoHome}>
          <span className="brand__mark" aria-hidden="true">
            ◆
          </span>
          <span className="brand__name">Academia</span>
        </button>

        <div className="header__center">{children}</div>

        <div className="header__right">
          <span className="header__status">En vivo</span>
        </div>
      </div>
    </header>
  )
}
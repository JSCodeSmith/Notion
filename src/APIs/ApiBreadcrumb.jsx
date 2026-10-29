import { Fragment } from "react";

export default function ApiBreadcrumb({ items = [] }) {
  return (
    <nav className="notion-breadcrumb api-breadcrumb" aria-label="Ruta">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <span className="notion-breadcrumb__sep">/</span>
          )}
          <button
            type="button"
            className="notion-breadcrumb__item"
            onClick={item.onClick}
            disabled={!item.onClick}
          >
            {item.icon && (
              <span className="notion-breadcrumb__icon">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </button>
        </Fragment>
      ))}
    </nav>
  );
}

import { useEffect, useRef } from 'react';

/*
 * Editor reutilizable: usa CodeMirror si el CDN ya lo cargó y, si no,
 * deja un textarea normal perfectamente editable.
 */
export default function EditorCodigo({
  value,
  onChange,
  onRun,
  readOnly = false,
  ariaLabel = 'Editor de código',
  minHeight = 150,
}) {
  const textareaRef = useRef(null);
  const cmRef = useRef(null);
  const programmaticRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);

  useEffect(() => {
    onChangeRef.current = onChange;
    onRunRef.current = onRun;
  });

  useEffect(() => {
    if (!window.CodeMirror || !textareaRef.current || cmRef.current) return;

    const cm = window.CodeMirror.fromTextArea(textareaRef.current, {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
    });

    cmRef.current = cm;
    cm.setValue(value ?? '');
    cm.setOption('extraKeys', {
      'Ctrl-Enter': () => onRunRef.current?.(),
      'Cmd-Enter': () => onRunRef.current?.(),
    });
    cm.on('change', () => {
      if (programmaticRef.current) return;
      onChangeRef.current?.(cm.getValue());
    });

    return () => {
      cm.toTextArea();
      cmRef.current = null;
    };
    // Solo se inicializa una vez; los valores se sincronizan en otro efecto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cm = cmRef.current;
    if (!cm || cm.getValue() === (value ?? '')) return;
    programmaticRef.current = true;
    cm.setValue(value ?? '');
    programmaticRef.current = false;
  }, [value]);

  useEffect(() => {
    cmRef.current?.setOption('readOnly', readOnly);
  }, [readOnly]);

  return (
    <div className="sm-editor" style={{ '--sm-editor-min': `${minHeight}px` }}>
      <textarea
        ref={textareaRef}
        className="sm-editor__textarea"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            onRun?.();
          }
        }}
        readOnly={readOnly}
        spellCheck={false}
        aria-label={ariaLabel}
      />
    </div>
  );
}

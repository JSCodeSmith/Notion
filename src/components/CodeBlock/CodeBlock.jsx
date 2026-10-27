import './CodeBlock.css'

const TOKEN_REGEX = new RegExp(
  [
    '(?<comment>\\/\\/.*)',
    '(?<string>"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)',
    '(?<number>\\b\\d+(?:\\.\\d+)?\\b)',
    '(?<keyword>\\b(?:const|let|var|return|if|else|function|new|for|of|in|true|false|null|undefined)\\b)',
    '(?<method>\\b[A-Za-z_$][\\w$]*(?=\\())',
    '(?<property>(?<=\\.)[A-Za-z_$][\\w$]*)',
    '(?<operator>===|!==|=>|==|<=|>=|[=+\\-*/<>!&|?:])',
    '(?<punct>[{}()\\[\\];,.])',
  ].join('|'),
  'g'
)

function tokenizeLine(line) {
  const parts = []
  let last = 0
  let match

  TOKEN_REGEX.lastIndex = 0
  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'plain', text: line.slice(last, match.index) })
    }
    const type = Object.keys(match.groups).find((k) => match.groups[k] !== undefined)
    parts.push({ type, text: match[0] })
    last = match.index + match[0].length
  }
  if (last < line.length) {
    parts.push({ type: 'plain', text: line.slice(last) })
  }
  return parts
}

export default function CodeBlock({ code }) {
  return (
    <pre className="code-block">
      <code>
        {code.split('\n').map((line, i) => (
          <div key={i} className="code-line">
            {line === ''
              ? '\u00A0'
              : tokenizeLine(line).map((tok, j) => (
                  <span key={j} className={`tk tk-${tok.type}`}>
                    {tok.text}
                  </span>
                ))}
          </div>
        ))}
      </code>
    </pre>
  )
}
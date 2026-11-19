export default function Status({ tipo = 'info', children }) {
  return <div className={`status status-${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>{children}</div>
}

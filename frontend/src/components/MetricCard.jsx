function MetricCard({
  icon,
  label,
  value,
  trend,
  trendClass,
  bgColor
}) {
  return(
    <div className="metric-card">

      <div
       className="metric-icon"
       style={{background:bgColor}}
       >
        {icon}
       </div>

      <div className="metric-label">
        {label}
      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className= {`metric-trend ${trendClass}`}>
        {trend}
      </div>

    </div>
  )
}

export default MetricCard;
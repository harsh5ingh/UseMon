function InsightBanner() {
  return (
    <div className="insight">

      <div className="insight-icon">
        💡
      </div>

      <div className="insight-text">
        <strong>Heads up</strong> Your screen time is up 48 minutes compared to yesterday.
        Chrome is usage has been high since 9 AM --- <br></br>
        consider a short break
      </div>

      <button className="insight-close">
        x
      </button>

    </div>
  )
}

export default InsightBanner;
export default function LoadingBar() {
  return (
    <div className="loading-bar">
      <div className="loading-bar__track">
        <div className="loading-bar__fill" />
      </div>
      <div className="loading-bar__text">
        <span className="loading-bar__pulse" />
        Reading your code and finding issues…
      </div>
    </div>
  )
}

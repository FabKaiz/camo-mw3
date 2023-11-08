import "./ProgressBar.scss"

const ProgressBar = ({progress, zombie}) => {
  return (
      <div className="progress__bar-container">
        <div className={zombie ? "progress-bar zombie" : "progress-bar"} style={{width: `${progress}%`}}>
          <span>{zombie ? "Progress zombie" : "Progress"}: {progress.toFixed(2)}%</span>
        </div>
      </div>
  );
};

export default ProgressBar;
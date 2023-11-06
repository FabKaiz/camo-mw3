import "./ProgressBar.scss"

const ProgressBar = ({progress, zombie}) => {
  return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{width: `${progress}%`}}>
          <span>{zombie ? "Progress zombie" : "Progress"}: {progress.toFixed(2)}%</span>
        </div>
      </div>
  );
};

export default ProgressBar;
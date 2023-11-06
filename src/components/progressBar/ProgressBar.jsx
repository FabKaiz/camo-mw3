import "./ProgressBar.scss"

const ProgressBar = ({ progress }) => {
  return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{width: `${progress}%`}}>
          Progress: {progress.toFixed(2)}%
        </div>
      </div>
  );
};

export default ProgressBar;
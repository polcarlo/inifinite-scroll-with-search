import React, { useState } from 'react';
import '../assets/scss/MissionCard.scss';

function MissionCard({ mission }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mission-card">
      <div className="mission-header">
        <h3>
          {mission.name}
          <span className={`status ${mission.status}`}>{mission.status}</span>
        </h3>
      </div>
      {expanded && (
        <div className="mission-details">
          {(mission.status === 'success' || mission.status === 'failed') && (
            <>
              <p className="mission-time">
                {mission.time}
                {mission.status === 'failed' && (
                  <>
                    {' '}| <a href="#">Article</a>
                  </>
                )}
                {' '}| <a href="#">Video</a>
              </p>
              <div className="mission-success-details">
                <img src={mission.profileImg} alt="Mission Image" className="mission-image" />
                <div className="mission-text">
                  <p>{mission.description}</p>
                </div>
              </div>
            </>
          )}
          {mission.status === 'upcoming' && (
            <>
              <p className="mission-time">{mission.time}</p>
              <p className="no-image" style={{ fontStyle: 'italic', display: 'flex', gap: '10px' }}>
                No image yet. No image yet.
              </p>
            </>
          )}
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'HIDE' : 'VIEW'}</button>
    </div>
  );
}

export default MissionCard;

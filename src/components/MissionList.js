import React from 'react';
import MissionCard from './MissionCard';
import '../assets/scss/MissionList.scss';

function MissionList({ missions }) {
  return (
    <div className="mission-list">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
}

export default MissionList;

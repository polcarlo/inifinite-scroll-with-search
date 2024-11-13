import React, { useState, useEffect, useRef } from 'react';
import MissionList from './components/MissionList';
import SearchBar from './components/SearchBar';
import Spinner from './components/Spinner';
import { missions } from './sampleData';
import './App.scss';

function App() {
  const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const loaderRef = useRef(null);

  useEffect(() => {
    loadMissions();
  }, [page]);

  const loadMissions = () => {
    setLoading(true);
    setTimeout(() => {
      const itemsPerPage = 5;
      const newMissions = missions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setMissionData((prevData) => [...prevData, ...newMissions]);
      setHasMore(newMissions.length > 0);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredMissions = missionData.filter((mission) =>
    mission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="content-container">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <MissionList missions={filteredMissions} />
        {loading && <Spinner />}
        <div ref={loaderRef} className="loader"></div>
        {!hasMore && <p className="end-of-list">End of list.</p>}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const BeginScreen = () => {
  const navigate = useNavigate();

  const [platoon, setPlatoon] = useState(1);
  const [team, setTeam] = useState(1);
  const [operator, setOperator] = useState(1);
  const [comment, setComment] = useState('');
  const [startX, setStartX] = useState(51.224466);
  const [startY, setStartY] = useState(22.334455);
  const [startZ, setStartZ] = useState(123.12);

  const handleSubmit = async () => {
    const datetime = new Date().toISOString();

    const data = {
      operatorId: operator,
      teamId: team,
      platoonId: platoon,
      x: startX,
      y: startY,
      z: startZ,
      beginTime: datetime,
      comment: comment,
    };

    try {
      const response = await fetch(config.FLIGHT_BEGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Failed to create flight');

      const resData = await response.json();
      const flightID = resData.flightID;

      navigate(`/app?flightID=${flightID}`);
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500">
      <div
        id="start-popup"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-xl 
                   shadow-2xl z-50 w-80"
      >
        <p className="mb-2 font-semibold">Pluton:</p>
        <select
          id="platoon-select"
          value={platoon}
          onChange={(e) => setPlatoon(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg mb-4"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <p className="mb-2 font-semibold">Drużyna:</p>
        <select
          id="team-select"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg mb-4"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <p className="mb-2 font-semibold">Operator:</p>
        <select
          id="operator-select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg mb-4"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <p className="mb-2 font-semibold">Komentarz:</p>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500 h-12 mb-4"
        />

        <p className="mb-2 font-semibold">Współrzędna X:</p>
        <input
          type="number"
          id="start-x"
          value={startX}
          onChange={(e) => setStartX(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-green-500 h-12 mb-4 text-center text-lg"
        />

        <p className="mb-2 font-semibold">Współrzędna Y:</p>
        <input
          type="number"
          id="start-y"
          value={startY}
          onChange={(e) => setStartY(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-green-500 h-12 mb-4 text-center text-lg"
        />

        <p className="mb-2 font-semibold">Współrzędna Z:</p>
        <input
          type="number"
          id="start-z"
          value={startZ}
          onChange={(e) => setStartZ(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-green-500 h-12 mb-4 text-center text-lg"
        />

        <div id="start-popup-buttons" className="mt-4 text-center">
          <button
            id="start-button-confirm"
            onClick={handleSubmit}
            className="w-3/5 mx-auto py-2 px-4 text-white rounded-md bg-green-500 
                       hover:bg-green-600 transition-colors"
          >
            Rozpocznij lot
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeginScreen;

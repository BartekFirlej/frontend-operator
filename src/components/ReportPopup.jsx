import React, { useState, useEffect } from 'react';
import { osdTextXL } from '../style';
import '../styles/style.css';

const ReportPopup = ({ reportDetails, setReportDetails, onSendReport, onClose }) => {
  const [isIdentified, setIsIdentified] = useState(false);
  const [reportTime, setReportTime] = useState("");

  useEffect(() => {
    const time = new Date().toISOString();
    setReportTime(time);
    setReportDetails(prev => ({ ...prev, timestamp: time }));
  }, [setReportDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleReportClick = () => {
    onSendReport();
  };

  return (
    <div
      id="report-popup"
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70"
    >
      <div className="bg-gray-200 p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">ZGŁOSZENIE WYKRYCIE CELU</h2>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isIdentified}
              onChange={(e) => {
                setIsIdentified(e.target.checked);
                if (!e.target.checked) {
                  setReportDetails(prev => ({ ...prev, objectID: null }));
                }
              }}
            />
            <span className="ml-2">TAK</span>
          </label>
        </div>

        <p className="mb-2">IDENTYFIKATOR CELU:</p>
        <input
          type="number"
          name="objectID"
          className="w-full p-2 mb-4 border border-gray-400 rounded text-center"
          disabled={!isIdentified}
          value={reportDetails.objectID || ''}
          onChange={handleChange}
        />

        <p className="mb-2">ROZPOZNANY SPRZĘT:</p>
        <select
          name="objectCategory"
          className="w-full p-2 mb-4 border border-gray-400 rounded text-center"
          value={reportDetails.objectCategory}
          onChange={handleChange}
        >
          <option value="">Wybierz</option>
          <option value="bwp">BWP</option>
          <option value="mozdzierz">MOŹDZIERZ</option>
          <option value="haubica">HAUBICA</option>
          <option value="wyrzutnia">WYRZUTANIA</option>
          <option value="inne">INNE</option>
        </select>

        <p className="mb-2">KOMENTARZ:</p>
        <textarea
          name="comment"
          className="w-full p-2 mb-4 border border-gray-400 rounded text-center"
          rows="3"
          placeholder="KOMENTARZ"
          value={reportDetails.comment || ''}
          onChange={handleChange}
        />

        <div className="mb-4 flex items-center justify-center">
          <p className="mr-2">DATA: {reportTime}</p>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <p className="mr-2">
            WSPÓŁRZĘDNA X: {reportDetails.x !== null ? reportDetails.x : '-'}
          </p>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <p className="mr-2">
            WSPÓŁRZĘDNA Y: {reportDetails.y !== null ? reportDetails.y : '-'}
          </p>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <p className="mr-2">
            WSPÓŁRZĘDNA Z: {reportDetails.z !== null ? reportDetails.z : '-'}
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button
            className={`${osdTextXL} osd-text px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors`}
            onClick={handleReportClick}
          >
            Zgłoś
          </button>
          <button
            className={`${osdTextXL} osd-text px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors`}
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;

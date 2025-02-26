// ReportPopup.jsx
import React from 'react';

function ReportPopup({ onClose }) {
  return (
    <div 
      id="report-popup"
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded w-full max-w-md">
        <p>Cel zidentyfikowany:</p>
        <input type="checkbox" id="identified-checkbox" />
        <p>Identyfikator celu:</p>
        <textarea id="report-id"></textarea>
        <p>Rozpoznany sprzęt:</p>
        <select id="equipment-select">
          <option value="bwp">BWP</option>
          <option value="mozdzierz">Moździerz</option>
          <option value="haubica">Haubica</option>
          <option value="wyrzutnia">Wyrzutnia</option>
          <option value="inne">Inne</option>
        </select>
        <p>Komentarz:</p>
        <textarea id="comment"></textarea>
        <p>Godzina: </p>
        <span id="report-time"></span>
        <br />
        <p>Współrzędna X: </p>
        <span id="report-x"></span>
        <br />
        <p>Współrzędna Y:</p>
        <span id="report-y"></span>
        <br />
        <div id="report-popup-buttons" className="flex gap-2 mt-4">
          <button
            id="report-button-confirm"
            className="green-button px-4 py-2 bg-green-500 text-white rounded"
            // Add your confirm logic here
          >
            Zgłoś
          </button>
          <button
            id="report-button-close"
            className="red-button px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;

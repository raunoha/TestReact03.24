import React, { useState } from "react";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [weeks, setWeeks] = useState([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateWeeks = () => {
    const today = new Date();
    const next7Weeks = [];
    for (let i = 0; i < 7; i++) {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(
        startOfWeek.getDate() - startOfWeek.getDay() + 1 + i * 7
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      const weekRange = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
      const weekNumber = getWeekNumber(startOfWeek);
      const days = [];
      for (let j = 0; j < 7; j++) {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + j);
        days.push({
          dayName: weekdays[day.getDay()],
          date: day.toLocaleDateString(),
          selected: false,
        });
      }
      next7Weeks.push({
        weekNumber: weekNumber,
        range: weekRange,
        days: days,
      });
    }
    setWeeks(next7Weeks);
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleDaySelect = (weekIndex, dayIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].days[dayIndex].selected =
      !updatedWeeks[weekIndex].days[dayIndex].selected;
    setWeeks(updatedWeeks);
  };

  const handleSelectAll = (weekIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].days.forEach((day) => (day.selected = true));
    setWeeks(updatedWeeks);
  };

  const handleClearAll = (weekIndex) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIndex].days.forEach((day) => (day.selected = false));
    setWeeks(updatedWeeks);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "weeks") {
      generateWeeks();
    }
  };

  return (
    <div>
      <select onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="weeks">Next 7 weeks</option>
      </select>

      {selectedOption === "weeks" && (
        <div>
          <p>Next 7 weeks:</p>
          <ul>
            {weeks.map((week, weekIndex) => (
              <li key={weekIndex}>
                <div>
                  Week {week.weekNumber}: {week.range}
                </div>
                <div>
                  {week.days.map((day, dayIndex) => (
                    <label
                      key={dayIndex}
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      {day.dayName}
                      <input
                        type="checkbox"
                        checked={day.selected}
                        onChange={() => handleDaySelect(weekIndex, dayIndex)}
                      />
                    </label>
                  ))}
                </div>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectAll(weekIndex)}
                  />
                  Select All
                </label>
                <button onClick={() => handleClearAll(weekIndex)}>
                  Clear All
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

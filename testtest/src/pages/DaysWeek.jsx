import React, { useState } from "react";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dates, setDates] = useState([
    { name: "Sunday", checked: true, appointmentTimes: [] },
    { name: "Monday", checked: true, appointmentTimes: [] },
    { name: "Tuesday", checked: true, appointmentTimes: [] },
    { name: "Wednesday", checked: true, appointmentTimes: [] },
    { name: "Thursday", checked: true, appointmentTimes: [] },
    { name: "Friday", checked: true, appointmentTimes: [] },
    { name: "Saturday", checked: true, appointmentTimes: [] },
  ]);
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

  const handleDayToggle = (index) => {
    const updatedDates = [...dates];
    updatedDates[index].checked = !updatedDates[index].checked;
    setDates(updatedDates);
  };

  const handleAllDaysToggle = () => {
    if (dates.some((day) => day.checked)) {
      const updatedDates = dates.map((day) => ({
        ...day,
        checked: false,
        appointmentTimes: [],
      }));
      setDates(updatedDates);
    } else {
      const updatedDates = dates.map((day) => ({ ...day, checked: true }));
      setDates(updatedDates);
    }
  };

  const handleTimeAdd = (dayIndex) => {
    if (!dates[dayIndex].checked) return; // Prevent adding time if the day is unchecked
    const newTime = prompt("Enter the appointment time (e.g., 9:00 AM):");
    if (newTime) {
      const updatedDates = [...dates];
      updatedDates[dayIndex].appointmentTimes.push(newTime);
      setDates(updatedDates);
    }
  };

  const handleTimeRemove = (dayIndex, timeIndex) => {
    const updatedDates = [...dates];
    updatedDates[dayIndex].appointmentTimes.splice(timeIndex, 1);
    setDates(updatedDates);
  };

  const handleRemoveAll = () => {
    setDates(
      dates.map((day) => ({ ...day, checked: false, appointmentTimes: [] }))
    );
    setWeeks([]);
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
        <option value="days">7 Days</option>
        <option value="weeks">7 Weeks</option>
      </select>

      {selectedOption === "days" && (
        <div>
          <p>Next 7 days:</p>
          <label>
            <input
              type="checkbox"
              checked={dates.every((day) => day.checked)}
              onChange={handleAllDaysToggle}
            />
            Select All
          </label>
          <ul>
            {dates.map((day, dayIndex) => (
              <li key={dayIndex}>
                <input
                  type="checkbox"
                  checked={day.checked}
                  onChange={() => handleDayToggle(dayIndex)}
                />
                {day.name}
                {day.checked && ( // Render "Add Time" button only if the day is checked
                  <button onClick={() => handleTimeAdd(dayIndex)}>
                    Add Time
                  </button>
                )}
                <ul>
                  {day.appointmentTimes.map((time, timeIndex) => (
                    <li key={timeIndex}>
                      {time}
                      <button
                        onClick={() => handleTimeRemove(dayIndex, timeIndex)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleRemoveAll}>Remove All</button>
        </div>
      )}

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

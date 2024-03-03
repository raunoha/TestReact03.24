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
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="days">7 Days</option>
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
    </div>
  );
}

export default App;

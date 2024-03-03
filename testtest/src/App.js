import React, { useState } from "react";

function DayWeekForm() {
  const [option, setOption] = useState("days");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");

  const friendsAvailability = [
    { name: "Max Stone", availability: ["monday", "tuesday"] },
    { name: "Sarah Black", availability: ["monday", "tuesday"] },
    { name: "Alex Smith", availability: ["next week","today"] },
    { name: "Emily White", availability: ["next week"] },
    { name: "Lucas Brown", availability: ["tomorrow"] },
    { name: "Mia Johnson", availability: ["tomorrow"] },
    { name: "Ethan Miller", availability: ["best day"] },
    { name: "Olivia Taylor", availability: ["best day"] },
    { name: "Liam Clark", availability: ["today"] }, // No availability specified
    { name: "Ava Parker", availability: ["best week","tomorrow"] },
  ];

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };

  const handleButtonClick = (selectedDay) => {
    setDay(selectedDay);
    // Logic to set the week based on the selected day can be added here if needed
  };

  const filterFriendsByDay = (selectedDay) => {
    if (selectedDay === "all day") {
      return friendsAvailability.map((friend) => friend.name);
    } else if (selectedDay === "all week") {
      return friendsAvailability.map((friend) => friend.name);
    } else if (selectedDay === "today") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("today"))
        .map((friend) => friend.name);
    } else if (selectedDay === "tomorrow") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("tomorrow"))
        .map((friend) => friend.name);
    } else if (selectedDay === "best day") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("best day"))
        .map((friend) => friend.name);
    } else if (selectedDay === "this week") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("this week"))
        .map((friend) => friend.name);
    } else if (selectedDay === "next week") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("next week"))
        .map((friend) => friend.name);
    } else if (selectedDay === "best week") {
      return friendsAvailability
        .filter((friend) => friend.availability.includes("best week"))
        .map((friend) => friend.name);
    } else {
      return [];
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Selected day:", day);
    console.log("Selected week:", week);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="option">Select:</label>
        <br />
        <select
          id="option"
          name="option"
          value={option}
          onChange={handleOptionChange}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
        </select>
        <br />
        <br />

        <label htmlFor="select">
          {option === "days" ? "Select Mon-Sun" : "Select Next 7 Weeks"}:
        </label>
        <br />
        <select
          id="select"
          name="select"
          value={option === "days" ? day : week}
          onChange={option === "days" ? handleDayChange : handleWeekChange}
        >
          {option === "days" ? (
            <>
              <option value="">Please select</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </>
          ) : (
            <>
              <option value="">Please select</option>
              <option value="1">Week 1</option>
              <option value="2">Week 2</option>
              <option value="3">Week 3</option>
              <option value="4">Week 4</option>
              <option value="5">Week 5</option>
              <option value="6">Week 6</option>
              <option value="7">Week 7</option>
            </>
          )}
        </select>
        <br />
        <br />

        <button type="button" onClick={() => handleButtonClick("all")}>
          All ({friendsAvailability.length})
        </button>
        <button type="button" onClick={() => handleButtonClick("today")}>
          {option === "days" ? "Today" : "This Week"} (
          {filterFriendsByDay("today").length})
        </button>
        <button type="button" onClick={() => handleButtonClick("tomorrow")}>
          {option === "days" ? "Tomorrow" : "Next Week"} (
          {filterFriendsByDay("tomorrow").length})
        </button>
        <button type="button" onClick={() => handleButtonClick("best day")}>
          {option === "days" ? "Best Day" : "Best Week"} (
          {filterFriendsByDay("best day").length})
        </button>
       
      </form>

      {/* Friends */}
      <div>
        <h2>Friends</h2>
        {day === "all" ? (
          <ul>
            {friendsAvailability.map((friend, index) => (
              <li key={index}>
                <strong>{friend.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {filterFriendsByDay(day).map((friend, index) => (
              <li key={index}>
                <strong>{friend}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Availability  */}
      <div>
        <h2>Availability </h2>
        {/* Add content here */}

        {/* Action Center */}
        <div>
          <h2>Action Center</h2>
          {/* Add action center content here */}
        </div>
      </div>
    </div>
  );
}

export default DayWeekForm;

// Each pickup window uses a weekday and two same-day times in 24-hour format.
const resources = [
  {
    name: "Sample Campus Pantry",
    types: ["Groceries"],
    location: "Example campus center, ground floor",
    hours: [
      { day: "Monday", start: "10:00", end: "14:00" },
      { day: "Wednesday", start: "14:00", end: "17:00" }
    ],
    eligibility: "Students with an active campus ID",
    bring: "Campus ID and a reusable bag"
  },
  {
    name: "Sample Lunch Table",
    types: ["Ready-to-eat meals"],
    location: "Example student commons, east entrance",
    hours: [{ day: "Wednesday", start: "11:30", end: "12:45" }],
    eligibility: "Open to students",
    bring: "Nothing required"
  },
  {
    name: "Sample Neighborhood Pantry",
    types: ["Groceries"],
    location: "Example neighborhood hall near campus",
    hours: [{ day: "Saturday", start: "09:00", end: "12:00" }],
    eligibility: "Open to the community",
    bring: "A bag for groceries"
  },
  {
    name: "Sample Community Supper",
    types: ["Ready-to-eat meals"],
    location: "Example community center, main hall",
    hours: [{ day: "Thursday", start: "17:30", end: "19:00" }],
    eligibility: "Open to the community",
    bring: "Nothing required"
  },
  {
    name: "Sample Student Food Share",
    types: ["Groceries", "Ready-to-eat meals"],
    location: "Example campus annex, lobby",
    hours: [{ day: "Friday", start: "15:00", end: "17:00" }],
    eligibility: "Open to students",
    bring: "Campus ID"
  }
];

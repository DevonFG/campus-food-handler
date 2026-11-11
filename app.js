const form = document.querySelector("#filters");
const daySelect = document.querySelector("#day");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const error = document.querySelector("#error");

for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]) {
  daySelect.add(new Option(day, day));
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}

function formatWindow({ day, start, end }) {
  return `${day}, ${formatTime(start)}–${formatTime(end)}`;
}

function matchingWindows(hours, day, start, end) {
  return hours
    .filter(window => !day || window.day === day)
    .map(window => ({
      day: window.day,
      start: start > window.start ? start : window.start,
      end: end && end < window.end ? end : window.end
    }))
    .filter(window => window.start < window.end);
}

function addText(parent, tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  parent.append(element);
  return element;
}

function buildCard(resource, windows, filteredBySchedule) {
  const card = document.createElement("article");
  addText(card, "h3", resource.name);
  addText(card, "p", resource.types.join(" · "));
  addText(card, "p", resource.location);

  if (filteredBySchedule) {
    addText(card, "strong", "When you can go");
    const list = document.createElement("ul");
    for (const window of windows) addText(list, "li", formatWindow(window));
    card.append(list);
  }

  const details = document.createElement("details");
  addText(details, "summary", "Pickup details");
  const list = document.createElement("dl");
  const fields = [
    ["Pickup hours", resource.hours.map(formatWindow).join("; ")],
    ["Eligibility", resource.eligibility],
    ["What to bring", resource.bring],
    ["Last checked", resource.lastChecked || "Sample listing"]
  ];
  for (const [label, value] of fields) {
    addText(list, "dt", label);
    addText(list, "dd", value);
  }
  details.append(list);
  if (resource.source) {
    const link = addText(details, "a", "Official source");
    link.href = resource.source;
  }
  card.append(details);
  return card;
}

function render({ day = "", start = "", end = "", type = "" } = {}) {
  error.textContent = "";
  results.replaceChildren();
  const cards = [];

  for (const resource of resources) {
    if (type && !resource.types.includes(type)) continue;
    const windows = matchingWindows(resource.hours, day, start, end);
    if (windows.length) cards.push(buildCard(resource, windows, Boolean(day)));
  }

  results.append(...cards);
  status.textContent = cards.length
    ? `${cards.length} ${cards.length === 1 ? "resource" : "resources"} found`
    : "No resources match. Try another day, widen your time window, or clear the filters.";
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const filters = Object.fromEntries(new FormData(form));
  const { day, start, end } = filters;
  let message = "";
  if ((start || end) && !day) {
    message = "Choose a day to search by time.";
  } else if (start && end && end <= start) {
    message = "Choose an end time later than the start time.";
  }

  if (message) {
    results.replaceChildren();
    status.textContent = "";
    error.textContent = message;
    form.elements.namedItem(day ? "end" : "day").focus();
    return;
  }
  render(filters);
});

form.addEventListener("reset", () => render());
render();

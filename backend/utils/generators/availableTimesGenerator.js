export const generateApptTimes = (start, end, duration) => {
  let availableTimes = [];
  const hourRoundOff = 40;
  const hourLimit = "60";

  while (start <= end) {
    availableTimes.push(start.toString());
    start += duration;
    if (start.toString().split("").slice(2).join("") === hourLimit)
      start = start += hourRoundOff;
  }
  return availableTimes;
};

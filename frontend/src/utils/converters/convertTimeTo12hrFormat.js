const convertTo12hrBasedTimes = (time) => {
    let part1, part2;
    let convertedTime;
    if (time > 1259) {
      convertedTime = time - 1200;
      part1 = convertedTime.toString().slice(0, 1) + `:`;
      part2 = convertedTime.toString().slice(1) + ` P.M.`;
      convertedTime = part1 + part2;
    } else if (time < 1200) {
      convertedTime = time;
      part1 = convertedTime.toString().slice(0, 2) + `:`;
      part2 = convertedTime.toString().slice(2) + ` A.M.`;
      convertedTime = part1 + part2;
    } else {
      convertedTime = time;
      part1 = convertedTime.toString().slice(0, 2) + `:`;
      part2 = convertedTime.toString().slice(2) + ` P.M.`;
      convertedTime = part1 + part2;
    }

    return convertedTime;
  };

  export default convertTo12hrBasedTimes
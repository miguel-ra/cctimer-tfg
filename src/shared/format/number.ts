function padZero(number: number, chars = 2) {
  return number.toString().padStart(chars, "0");
}

function millisecondsToSeconds(time: number) {
  return Math.trunc(time / 1000);
}

function millisecondsToClock(time: number) {
  const mil = Math.trunc((time % 1000) / 10);
  const sec = Math.trunc((time / 1000) % 60);
  const min = Math.trunc((time / (1000 * 60)) % 60);
  const hour = Math.trunc((time / (1000 * 60 * 60)) % 24);

  if (hour > 0) {
    return `${padZero(hour)}:${padZero(min)}:${padZero(sec)}`;
  }
  if (min > 0) {
    return `${padZero(min)}:${padZero(sec)}.${padZero(mil)}`;
  }
  return `${padZero(sec)}.${padZero(mil)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export { padZero, millisecondsToSeconds, millisecondsToClock, clamp, mod };

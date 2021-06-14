// Math.random should be unique because of its seeding algorithm
// But Date.now is concatenated to avoid unexpected collisions
// Convert it to base 36 (numbers + letters)

function uuid() {
  return `${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

export default uuid;

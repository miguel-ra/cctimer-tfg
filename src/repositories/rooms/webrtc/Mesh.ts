type MeshId = string;
enum MeshStatus {
  "creating",
  "connecting",
  "connected",
  "failed",
}

export type { MeshId };
export { MeshStatus };

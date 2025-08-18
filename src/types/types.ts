export interface StatusData {
  region: string;
  createdAt: string;
  online: number;
  serversCount: number;
  cpuLoad: number;
  activeConnections: number;
  waitTime: number;
  raw?: any;
}

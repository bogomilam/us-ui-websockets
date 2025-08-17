export default interface StatusDoc {
  region: string;
  createdAt: string;
  online: number;
  serversCount: number;
  cpuLoad: number;
  raw?: any;
}

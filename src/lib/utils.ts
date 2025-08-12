import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const regions: string[] = [
  "us-east-1",
  "us-west-1",
  "eu-west-1",
  "eu-central-1",
  "ap-southeast-1",
  "ap-northeast-1",
  "sa-east-1",
  "ca-central-1",
  "af-south-1",
  "me-south-1",
  "ap-south-1",
  "ap-northeast-2",
  "ap-southeast-2",
  "eu-north-1",
  "eu-west-2",
  "eu-west-3",
  "us-gov-west-1",
  "us-gov-east-1",
  "us-gov-central-1",
];

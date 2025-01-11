import { HttpStatus } from "@nestjs/common";

export interface ApiResponse<T = any> {
  status: HttpStatus;
  message: string;
  data?: T[]; 
  error?: string;
  dataUnit?: T;
}
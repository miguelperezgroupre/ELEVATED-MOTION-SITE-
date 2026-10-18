// Follow Up Boss is now called only from the server (api/lead.js).
// This shim keeps the old import path working without any credentials in client code.
import type { LeadData } from './leadService';
import { leadService } from './leadService';

class FubService {
  async submit(data: LeadData): Promise<{ success: boolean; method: string }> {
    return leadService.submit(data);
  }
  async getApiStatus(): Promise<boolean> {
    return false;
  }
}

export const fubService = new FubService();

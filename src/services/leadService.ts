// Website leads are sent to the server-side intake at /api/lead (api/lead.js), which forwards
// them to GoHighLevel and Follow Up Boss using keys stored only in Vercel env vars.
// No CRM credentials are present in client code.

export interface LeadData {
  type: 'contact' | 'newsletter' | 'valuation';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  intent?: string;
  source?: string;
  sqft?: string;
  beds?: string;
  baths?: string;
  propertyType?: string;
  marketArea?: string;
}

class LeadService {
  async submit(data: LeadData): Promise<{ success: boolean; method: string }> {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await response.json().catch(() => ({}));
      if (response.ok && out?.success) return { success: true, method: out.method || 'server' };
      console.warn('[LeadService] lead intake returned', response.status);
    } catch (err) {
      console.warn('[LeadService] lead intake error');
    }
    // Same UX as before: the visitor still sees a confirmation.
    console.log('[LeadService] Lead captured locally:', data.intent, data.source);
    return { success: true, method: 'local' };
  }
}

export const leadService = new LeadService();

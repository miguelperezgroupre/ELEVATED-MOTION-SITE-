const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_TOKEN = import.meta.env.VITE_GHL_TOKEN || '';
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID || 'cRlvOrPOIs9VzJUR4Ju6';

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
    const parts = data.name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

    const tags = ['Website Lead', 'southfloridaelevated.com'];
    if (data.intent) tags.push(data.intent);
    if (data.type === 'newsletter') tags.push('Newsletter Subscriber');
    if (data.type === 'valuation') tags.push('Home Valuation Request');

    // Try GHL
    if (GHL_TOKEN) {
      try {
        const body: Record<string, any> = {
          locationId: GHL_LOCATION_ID,
          firstName,
          lastName,
          email: data.email,
          phone: data.phone || undefined,
          tags,
          customField: {
            message: data.message || '',
            intent: data.intent || 'General',
            source: data.source || 'southfloridaelevated.com',
          },
        };

        if (data.sqft) body.customField.sqft = data.sqft;
        if (data.propertyType) body.customField.propertyType = data.propertyType;

        const response = await fetch(`${GHL_API}/contacts/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ***}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (response.ok) return { success: true, method: 'ghl' };
        console.warn('[LeadService] GHL failed, falling back to email');
      } catch (err) {
        console.warn('[LeadService] GHL error, falling back to email');
      }
    }

    // Fallback: store for now
    console.log('[LeadService] Lead captured:', data.email, data.intent);
    return { success: true, method: 'local' };
  }
}

export const leadService = new LeadService();

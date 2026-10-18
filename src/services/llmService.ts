// LLM Service — Open-Source Model Integration for RAG Responses
// Uses Hugging Face free inference API (no API key required for rate-limited access)
// Default model: HuggingFaceH4/zephyr-7b-beta
// Alternative: google/gemma-2b-it (smaller, faster)
// All fetching happens client-side, so DNS resolves on the user's machine

const HF_API_BASE = 'https://api-inference.huggingface.co/models';
const DEFAULT_MODEL = 'HuggingFaceH4/zephyr-7b-beta';
const FALLBACK_MODEL = 'google/gemma-2b-it';

// System prompt for the RAG assistant
const SYSTEM_PROMPT = `You are South Florida Elevated's real estate knowledge assistant. 
Answer questions using ONLY the provided context. Be concise, factual, and helpful.
If the context doesn't contain enough information, say so.
Format answers with line breaks for readability. Use bullet points for lists.`;

class LlmService {
  async generateResponse(
    query: string,
    context: { title: string; content: string; source: string }[],
  ): Promise<string> {
    // If no context, return early
    if (context.length === 0) {
      return "I don't have specific information about that in my knowledge base. Try asking about neighborhoods, market data, developments, or case studies.";
    }

    // Format context for the model
    const contextText = context.map((c, i) =>
      `[${i + 1}] ${c.title} (${c.source})\n${c.content.slice(0, 500)}`
    ).join('\n\n');

    const prompt = `${SYSTEM_PROMPT}\n\nContext:\n${contextText}\n\nQuestion: ${query}\n\nAnswer:`;

    // Try primary model first, then fallback
    try {
      return await this.callModel(DEFAULT_MODEL, prompt, 400);
    } catch (err) {
      console.warn('[LLM] Primary model failed, trying fallback:', err);
      try {
        return await this.callModel(FALLBACK_MODEL, prompt, 300);
      } catch (err2) {
        console.warn('[LLM] All models failed, using template:', err2);
        return this.templateFallback(query, context);
      }
    }
  }

  private async callModel(model: string, prompt: string, maxTokens: number): Promise<string> {
    const response = await fetch(`${HF_API_BASE}/${model}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature: 0.3,
          top_p: 0.9,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`HF ${response.status}: ${errText.slice(0, 100)}`);
    }

    const data = await response.json();

    // Handle different response formats
    if (Array.isArray(data)) {
      // Standard format: [{ generated_text: "..." }]
      if (data[0]?.generated_text) {
        // Strip the prompt from the response if the model echoes it
        const text = data[0].generated_text;
        const answer = text.includes('Answer:') ? text.split('Answer:')[1].trim() : text;
        return answer || 'I found relevant information but couldn\'t generate a response.';
      }
    } else if (data?.generated_text) {
      return data.generated_text;
    }

    throw new Error('Unexpected response format');
  }

  private templateFallback(query: string, context: { title: string; content: string; source: string }[]): string {
    const top = context[0];
    let response = '';

    switch (top.source) {
      case 'neighborhood':
        response = `**${top.title}**\n${top.content.slice(0, 300)}`;
        break;
      case 'insight':
        response = `**${top.title}**\n${top.content.slice(0, 400)}`;
        break;
      case 'study':
        response = `**${top.title}**\n${top.content.slice(0, 300)}`;
        break;
      case 'development':
        response = `**${top.title}**\n${top.content.slice(0, 300)}`;
        break;
      case 'market':
        response = `**${top.title}**\n${top.content.slice(0, 300)}`;
        break;
      default:
        response = `Based on my knowledge, here's what I found:\n\n**${top.title}**\n${top.content.slice(0, 300)}`;
    }

    // Add related suggestions
    if (context.length > 1) {
      response += `\n\n**Related:**\n${context.slice(1, 3).map(c => `- ${c.title}`).join('\n')}`;
    }

    return response;
  }
}

export const llmService = new LlmService();

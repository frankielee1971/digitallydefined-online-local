import puter from '@/puter-adapter';

export async function puterHermesAgent(system, user) {
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: user }
  ];

  const response = await puter.chat.completions.create({
    model: 'puter-llm-latest',
    messages
  });

  return response?.choices?.[0]?.message?.content || '';
}

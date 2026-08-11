import { describe, it, expect } from 'vitest';
import {
  CHANGELOG_PROMPT,
  buildChangelogPrompt,
  extractTextContent,
  generateChangelog,
} from './generate-changelog.js';

function fakeClient(blocks) {
  const calls = [];
  return {
    calls,
    messages: {
      create: (params) => {
        calls.push(params);
        return Promise.resolve({ content: blocks });
      },
    },
  };
}

describe('buildChangelogPrompt', () => {
  it('wraps the commits in a fenced block after the prompt', () => {
    const prompt = buildChangelogPrompt('abc123 feat: add a thing');

    expect(prompt.startsWith(CHANGELOG_PROMPT)).toBe(true);
    expect(prompt).toContain('```\nabc123 feat: add a thing\n```');
  });

  it('names the published packages so the model can group by them', () => {
    expect(buildChangelogPrompt('')).toContain('@chemistry/formula');
  });
});

describe('extractTextContent', () => {
  it('joins text blocks and trims the result', () => {
    const message = { content: [{ type: 'text', text: '  ### Bug Fixes\n- Fix a thing  ' }] };
    expect(extractTextContent(message)).toBe('### Bug Fixes\n- Fix a thing');
  });

  it('ignores non-text blocks', () => {
    const message = {
      content: [
        { type: 'thinking', thinking: 'ignore me' },
        { type: 'text', text: '### New Features' },
        { type: 'text', text: '- Add a thing' },
      ],
    };
    expect(extractTextContent(message)).toBe('### New Features\n- Add a thing');
  });
});

describe('generateChangelog', () => {
  it('short-circuits without calling the API when there are no commits', async () => {
    const client = fakeClient([]);

    expect(await generateChangelog('', client)).toBe('No significant changes');
    expect(await generateChangelog('   ', client)).toBe('No significant changes');
    expect(client.calls).toHaveLength(0);
  });

  it('returns the model text for a set of commits', async () => {
    const client = fakeClient([{ type: 'text', text: '### Bug Fixes\n- Fix a thing' }]);

    expect(await generateChangelog('abc123 fix: a thing', client)).toBe(
      '### Bug Fixes\n- Fix a thing'
    );
  });

  it('requests a current model with enough room for a changelog', async () => {
    const client = fakeClient([{ type: 'text', text: 'ok' }]);

    await generateChangelog('abc123 fix: a thing', client);

    const [params] = client.calls;
    expect(params.model).toBe('claude-sonnet-5');
    expect(params.max_tokens).toBeGreaterThanOrEqual(4096);
    expect(params.messages).toEqual([
      { role: 'user', content: buildChangelogPrompt('abc123 fix: a thing') },
    ]);
  });

  it('sends no sampling parameters (claude-sonnet-5 rejects non-default values)', async () => {
    const client = fakeClient([{ type: 'text', text: 'ok' }]);

    await generateChangelog('abc123 fix: a thing', client);

    const [params] = client.calls;
    expect(params).not.toHaveProperty('temperature');
    expect(params).not.toHaveProperty('top_p');
    expect(params).not.toHaveProperty('top_k');
    expect(params).not.toHaveProperty('thinking');
  });

  it('propagates API failures to the caller', async () => {
    const client = {
      messages: {
        create: () => Promise.reject(Object.assign(new Error('bad key'), { status: 401 })),
      },
    };

    await expect(generateChangelog('abc123 fix: a thing', client)).rejects.toThrow('bad key');
  });
});

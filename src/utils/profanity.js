import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from 'obscenity';

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const censor = new TextCensor()
  .setStrategy((ctx) => '*'.repeat(ctx.matchLength));

export function filterProfanity(text) {
  const matches = matcher.getAllMatches(text);
  return censor.applyTo(text, matches);
}

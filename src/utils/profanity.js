import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, assignIncrementingIds, pattern } from 'obscenity';

const additionalWords = [
  pattern`twat`,
  pattern`wanker`,
];

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
  blacklistedTerms: assignIncrementingIds(
    englishDataset.build().blacklistedTerms
      .map((value) => value.pattern)
      .concat(additionalWords),
  ),
});

const censor = new TextCensor()
  .setStrategy((ctx) => '*'.repeat(ctx.matchLength));

export function filterProfanity(text) {
  const matches = matcher.getAllMatches(text);
  return censor.applyTo(text, matches);
}

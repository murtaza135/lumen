export const trixInitialJSON = '{"document":[{"text":[{"type":"string","attributes":{"blockBreak":true},"string":"\\n"}],"attributes":[]}],"selectedRange":[0,0]}';

export function textToTrix(text) {
  return `{"document":[{"text":[{"type":"string","attributes":{},"string":"${text}"},{"type":"string","attributes":{"blockBreak":true},"string":"\\n"}],"attributes":[]}],"selectedRange":[0,0]}`;
}

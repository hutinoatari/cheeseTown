interface Syntax {
  regex: RegExp;
  convert(...args: string[]): string;
}

const compile = (markup: string): string => {
  const lexicalAnalysis = (text: string): string[] => {
    return text.replace(
      /[<>]/g,
      (c) => c == "<" ? "&lt;" : "&gt;",
    ).split("\n").filter((line) => line.trim() !== "");
  };

  let titleName: string = "";
  let authorName: string = "";
  let chapterCount: number = 0;
  let sectionCount: number = 0;
  let subsectionCount: number = 0;
  let pictureCount: number = 0;
  const syntaxAnalyzer: Syntax[] = [
    {
      regex: /^\[title\]{(.+)} (.+)/,
      convert: (_, author, word) => {
        titleName = word.trim();
        authorName = author.trim();
        return `<h1>${word.trim()}</h1><p>${author.trim()}</p>`;
      },
    },
    {
      regex: /^\[chapter\] (.+)/,
      convert: (_, word) => {
        chapterCount += 1;
        sectionCount = subsectionCount = pictureCount = 0;
        return `<h2>${chapterCount} ${word.trim()}</h2>`;
      },
    },
    {
      regex: /^\[section\] (.+)/,
      convert: (_, word) => {
        sectionCount += 1;
        subsectionCount = 0;
        return `<h3>${chapterCount}.${sectionCount} ${word.trim()}</h3>`;
      },
    },
    {
      regex: /^\[subsection\] (.+)/,
      convert: (_, word) => {
        subsectionCount += 1;
        return `<h4>${chapterCount}.${sectionCount}.${subsectionCount} ${word.trim()}</h4>`;
      },
    },
    {
      regex: /^\[picture\]\{(.+)\} (.+)/,
      convert: (_, url, caption) => {
        pictureCount += 1;
        return `<figure><img src="${url.trim()}"><figcaption>図-${chapterCount}.${pictureCount} ${caption.trim()}</figcaption></figure>`;
      },
    },
    {
      regex: /(.*)/,
      convert: (_, text) => {
        return `<p>${text.trim()}</p>`;
      },
    },
  ];

  const tokens = lexicalAnalysis(markup);
  const html = tokens.map((token) => {
    for (const syntax of syntaxAnalyzer) {
      const match = token.match(syntax.regex);
      if (match === null) continue;
      return syntax.convert(...match);
    }
  }).join("");
  const css = Deno.readTextFileSync("./style.css");

  const fullHtml =
    `<html lang="ja"><head><meta charset="UTF-8"><title>${titleName} | ${authorName}</title><style>${css}</style></head><body>${html}</body></html>`;
  return fullHtml;
};

export { compile };

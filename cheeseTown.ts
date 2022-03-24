const regex = /^\[(?<tag>title|section|subsection|subsubsection)\] (?<text>.+)/;

const compile = (markdown: string): string => {
  const plainElements: string[] = markdown.split("\n").map((e) => e.trim())
    .filter((e) => e !== "");
  const htmlElements: string[] = plainElements.map((e) => {
    const match = e.match(regex);
    if (match === null) return `<p>${e}</p>`;
    const tagName = match.groups?.tag ?? "";
    const text = match.groups?.text ?? "";
    if (tagName === "title") return `<h1>${text}</h1>`;
    if (tagName === "section") return `<h2>${text}</h2>`;
    if (tagName === "subsection") return `<h3>${text}</h3>`;
    if (tagName === "subsubsection") return `<h4>${text}</h4>`;
    return "";
  });
  const html: string = htmlElements.join("");
  return html;
};

export { compile };

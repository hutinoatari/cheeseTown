const regex = /^\[(.+)\] (.+)/;
const escape = (text: string): string =>
  text.trim().replace(/[<>]/g, (c) => c == "<" ? "&lt;" : "&gt;");

const compile = (markdown: string): string => {
  const plainElements: string[] = markdown.split("\n").map((e) => e.trim())
    .filter((e) => e !== "");
  const htmlElements: string[] = plainElements.map((e) => {
    const match = e.match(regex);
    if (match === null) return `<p>${escape(e)}</p>`;
    const tagName = match[1];
    const text = escape(match[2]);
    switch (tagName) {
      case "title":
        return `<h1>${text}</h1>`;
      case "section":
        return `<h2>${text}</h2>`;
      case "subsection":
        return `<h3>${text}</h3>`;
      case "subsubsection":
        return `<h4>${text}</h4>`;
      default:
        return `<p>${escape(e)}</p>`;
    }
  });
  const html: string = htmlElements.join("");
  return html;
};

export { compile };

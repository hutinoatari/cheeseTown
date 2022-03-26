interface ElementData {
  elementType: string;
  option: string | null;
  text: string;
}

const getElementData = (elemnt: string): ElementData | null => {
  const syntaxRegex = /^\[(.+)\] (.+)/;
  const optionRegex = /^\{(.+)\} (.+)/;
  const syntaxMatch = elemnt.match(syntaxRegex);
  if (syntaxMatch === null) return null;
  const elementType = syntaxMatch[1];
  const optionAndText = syntaxMatch[2];
  const optionMatch = optionAndText.match(optionRegex);
  if (optionMatch !== null) {
    return {
      elementType: elementType,
      option: optionMatch[1],
      text: optionMatch[2],
    };
  } else {
    return {
      elementType: elementType,
      option: null,
      text: optionAndText,
    };
  }
};

const compile = (markup: string): string => {
  const escapedMarkup: string = markup.replace(
    /[<>]/g,
    (c) => c == "<" ? "&lt;" : "&gt;",
  );
  const lines: string[] = escapedMarkup.split("\n");
  let html: string = "";
  let chapterCount: number = 0;
  let sectionCount: number = 0;
  let subsectionCount: number = 0;
  let pictureCount: number = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const elementData = getElementData(line);
    if (elementData === null) {
      html += `<p>${line}</p>`;
      continue;
    }
    switch (elementData.elementType) {
      case "title":
        html += `<h1>${elementData.text}</h1>`;
        break;
      case "chapter":
        chapterCount += 1;
        sectionCount = 0;
        subsectionCount = 0;
        pictureCount = 0;
        html += `<h2>${chapterCount}. ${elementData.text}</h2>`;
        break;
      case "section":
        sectionCount += 1;
        subsectionCount = 0;
        html += `<h3>${chapterCount}.${sectionCount}. ${elementData.text}</h3>`;
        break;
      case "subsection":
        subsectionCount += 1;
        html +=
          `<h4>${chapterCount}.${sectionCount}.${subsectionCount}. ${elementData.text}</h4>`;
        break;
      case "picture":
        pictureCount += 1;
        html +=
          `<figure><img src="${elementData.option}"><figcaption>図${chapterCount}.${pictureCount} ${elementData.text}</figcaption></figure>`;
        break;
      default:
        html += `<p>${elementData.text}</p>`;
        break;
    }
  }
  return html;
};

export { compile };

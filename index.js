const fs = require("fs");

const adjectives = require("./adjectives").map((adj) => ({
  ...adj,
  word: adj.word.toLocaleLowerCase(),
}));
const verb = require("./verb").map((v) => ({
  ...v,
  word: v.word.toLocaleLowerCase(),
}));

const data = fs
  .readFileSync("./cerita.txt", "utf8")
  .split("\n")
  .filter((txt) => txt !== "");

const after = data.map((r) =>
  r
    .split(" ")
    .map((e) =>
      e
        .replace('"', "")
        .replace(",", "")
        .replace(".", "")
        .replace("“", "")
        .replace("”", "")
        .replace("‘", "")
        .replace("(", "")
        .replace(")", "")
        .trim()
        .toLocaleLowerCase()
    )
);

const search = after.map(paragraf => {
    const includedVerb = paragraf.filter(p => verb.find(v => v.word === p)).map(word => verb.find(v => v.word === word));
    const includedAdjective = paragraf.filter(p => adjectives.find(v => v.word === p)).map(word => adjectives.find(adj => adj.word === word))

    return { includedAdjective, includedVerb }
})

const narration = search.map(({ includedAdjective: adjectives, includedVerb: verb }, index) => {
    return `Paragraph ${index+1}\nAdjective: ${adjectives.length > 0 ? `${adjectives.map(adj => `${adj.word}= ${adj.meaning}`).join(', ')}\n` : ' -\n'}` + `${verb.length > 0 ? `Verb: ${verb.map(v => `${v.word}= ${v.meaning}`).join(', ')}` : '-'}`
})

const properNaration = narration.join('\n\n');
fs.writeFileSync('./result.txt', properNaration)
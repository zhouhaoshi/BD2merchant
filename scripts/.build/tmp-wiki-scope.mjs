// scripts/tmp-wiki-scope.ts
var url = "https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/718485.json";
var res = await fetch(url, {
  headers: {
    "game-alias": "zsca2",
    Origin: "https://www.gamekee.com/",
    Referer: "https://www.gamekee.com/"
  }
});
var raw = await res.json();
var content = JSON.parse(raw.content);
var skin = (content.styleData || [])[0];
for (const [i, row] of (skin.data || []).entries()) {
  console.log(
    `row${i}:`,
    row.map((c) => JSON.stringify(c?.value ?? "")).join(" | ")
  );
}

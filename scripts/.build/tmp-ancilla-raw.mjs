// src/utils/gamekee/parse.ts
var cellText = (cell) => {
  if (!cell) return "";
  const v = cell.value;
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.trim();
  return "";
};

// scripts/tmp-ancilla-raw.ts
var HEADERS = {
  "game-alias": "zsca2",
  Origin: "https://www.gamekee.com/",
  Referer: "https://www.gamekee.com/"
};
var raw = await (await fetch("https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/718485.json", { headers: HEADERS })).json();
var content = JSON.parse(raw.content);
content.styleData.forEach((skin, i) => {
  console.log(`===== skin ${i} =====`);
  skin.data.forEach((row) => {
    console.log("  " + row.map((c) => cellText(c)).join(" | "));
  });
});

// src/utils/gamekee/parse.ts
var cellText = (cell) => {
  if (!cell) return "";
  const v = cell.value;
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.trim();
  return "";
};
var toRowMap = (rows) => {
  const map = /* @__PURE__ */ new Map();
  for (const row of rows || []) {
    if (!row || !row.length) continue;
    const label = cellText(row[0]);
    if (!label) continue;
    const values = row.slice(1).map((cell) => cellText(cell));
    if (!map.has(label)) map.set(label, values);
  }
  return map;
};
var parseNumber = (value) => {
  if (!value) return 0;
  const matched = value.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return matched ? Number(matched[0]) : 0;
};
var elementMap = {
  \u706B: "fire",
  \u6C34: "water",
  \u98CE: "wind",
  \u5149: "light",
  \u6697: "dark",
  \u9ED1\u6697: "dark"
};
var parseAttackAttribute = (value) => value.includes("\u9B54") ? "matk" : "atk";
var parseAttackType = (value) => value.includes("\u8DF3\u8FC7") || value.includes("\u540E\u65B9") ? "skip" : "front";
var mapHPKey = (label) => {
  if (label.includes("\u751F\u547D")) return "HP";
  if (label.includes("\u653B\u51FB")) return "ATK";
  if (label.includes("\u9B54\u6CD5\u529B")) return "MATK";
  if (label.includes("\u9632\u5FA1")) return "DEF";
  if (label.includes("\u62B5\u6297")) return "MRES";
  return "";
};
var mapAwakeningKey = (label) => {
  if (label.includes("\u751F\u547D")) return "PHP";
  if (label.includes("\u653B\u51FB")) return "PATK";
  if (label.includes("\u9B54\u6CD5\u529B")) return "PMATK";
  if (label.includes("\u9632\u5FA1")) return "DEF";
  if (label.includes("\u62B5\u6297")) return "MRES";
  if (label.includes("\u5C5E\u6027\u4F24\u5BB3")) return "DMG";
  return "";
};
var absUrl = (url) => {
  if (!url) return void 0;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http")) return url;
  return void 0;
};
var parseCharacterTree = (raw) => {
  const groups = raw?.data?.child || [];
  const result = [];
  for (const group of groups) {
    const starMatched = group.name.match(/([345])星角色/);
    if (!starMatched) continue;
    const star = Number(starMatched[1]);
    for (const node of group.child || []) {
      const contentId = Number(node.content_id || 0);
      if (!contentId) continue;
      result.push({
        entryId: node.id,
        contentId,
        cName: node.name,
        alias: node.name_alias && node.name_alias !== node.name ? node.name_alias : void 0,
        star,
        icon: node.icon ? node.icon.startsWith("//") ? `https:${node.icon}` : node.icon : void 0,
        group: group.name
      });
    }
  }
  return result;
};
var parseCharacterDetail = (raw, entry) => {
  const content = JSON.parse(raw.content);
  const warnings = [];
  const base = toRowMap(content.baseData);
  const nameRow = base.get("\u89D2\u8272\u540D\u79F0") || [];
  const cName = nameRow[0] || "";
  const name = nameRow[1] || "";
  const star = parseNumber(base.get("\u661F\u7EA7")?.[0]);
  const elementText = base.get("\u5143\u7D20\u5C5E\u6027")?.[0] || "";
  const element = elementMap[elementText.trim()] || "fire";
  if (!elementMap[elementText.trim()]) warnings.push(`\u672A\u8BC6\u522B\u7684\u5143\u7D20\u5C5E\u6027\uFF1A${elementText}`);
  const attackAttribute = parseAttackAttribute(base.get("\u653B\u51FB\u5C5E\u6027")?.[0] || "");
  const attackType = parseAttackType(base.get("\u653B\u51FB\u76EE\u6807")?.[0] || "");
  const rowNumber = (label, index = 1) => {
    const values = base.get(label);
    if (!values || !values.length) return 0;
    const safeIndex = Math.min(index, values.length - 1);
    return parseNumber(values[safeIndex]);
  };
  const HP = rowNumber("\u751F\u547D\u529B");
  const ATK = rowNumber("\u653B\u51FB\u529B");
  const MATK = rowNumber("\u9B54\u6CD5\u529B");
  const CR = rowNumber("\u81F4\u547D\u7387");
  const CDMG = rowNumber("\u81F4\u547D\u4F24\u5BB3");
  const DEF = rowNumber("\u9632\u5FA1\u529B");
  const MRES = rowNumber("\u9B54\u6CD5\u62B5\u6297");
  let DMG = 0;
  for (const [label, values] of base) {
    if (label.includes("\u5C5E\u6027\u4F24\u5BB3") && !label.includes("\u62B5\u6297")) {
      DMG = parseNumber(values[1] ?? values[0]);
      break;
    }
  }
  const engraving = {};
  const awakening = {};
  const sealIndex = content.baseData.findIndex((row) => cellText(row[0]) === "\u523B\u5370");
  if (sealIndex >= 0) {
    for (let i = sealIndex + 1; i < content.baseData.length; i++) {
      const row = content.baseData[i];
      const leftLabel = cellText(row[0]);
      if (!leftLabel) break;
      const leftKey = mapHPKey(leftLabel);
      if (leftKey) engraving[leftKey] = parseNumber(cellText(row[1]));
      const rightLabel = cellText(row[2]);
      if (rightLabel) {
        const rightKey = mapAwakeningKey(rightLabel);
        if (rightKey) awakening[rightKey] = parseNumber(cellText(row[3]));
      }
    }
  } else {
    warnings.push("\u6CA1\u6709\u627E\u5230\u300C\u523B\u5370/\u89C9\u9192\u300D\u8868\uFF0C\u523B\u5370\u4E0E\u89C9\u9192\u7559\u7A7A");
  }
  const skills = [];
  for (const [index, skin] of (content.styleData || []).entries()) {
    const skinMap = toRowMap(skin.data);
    const skill = parseSkin(skinMap, skin.data, index, warnings);
    if (skill) skills.push(skill);
  }
  if (!skills.length) warnings.push("\u6CA1\u6709\u89E3\u6790\u5230\u4EFB\u4F55\u6280\u80FD\uFF0C\u8BE6\u60C5\u9875\u7ED3\u6784\u53EF\u80FD\u53D8\u4E86");
  return {
    contentId: entry?.contentId || 0,
    entryId: entry?.entryId,
    name,
    cName,
    star,
    element,
    attackAttribute,
    attackType,
    HP,
    ATK,
    MATK,
    CR,
    CDMG,
    DEF,
    MRES,
    DMG,
    engraving,
    awakening,
    talent: base.get("\u5929\u8D4B\u540D\u79F0")?.[0] || void 0,
    skills,
    icon: absUrl(
      (base.get("\u89D2\u8272\u5934\u50CF") || []).find((url) => url.startsWith("//") || url.startsWith("http"))
    ),
    warnings
  };
};
var parseSkin = (skinMap, rows, index, warnings) => {
  const costume = skinMap.get("\u670D\u88C5\u540D\u79F0")?.[0] || "";
  const skillName = skinMap.get("\u6280\u80FD\u540D\u79F0")?.[0] || "";
  if (!costume && !skillName) {
    warnings.push(`\u76AE\u80A4${index + 1} \u6CA1\u6709\u670D\u88C5\u540D\u79F0\u548C\u6280\u80FD\u540D\u79F0\uFF0C\u5DF2\u8DF3\u8FC7`);
    return null;
  }
  const headerIndex = rows.findIndex((row) => cellText(row[0]) === "\u6280\u80FD\u6548\u679C");
  const levels = [];
  if (headerIndex >= 0) {
    for (let i = headerIndex + 1; i < rows.length; i++) {
      const row = rows[i];
      const label = cellText(row[0]);
      if (!label) break;
      if (!/^\+\d$/.test(label)) continue;
      const level = {
        label,
        sp: parseNumber(cellText(row[2])),
        cd: parseNumber(cellText(row[3])),
        description: cellText(row[4]),
        scopeUrl: absUrl(cellText(row[1]))
      };
      const spRecover = parseNumber(cellText(row[5]));
      if (spRecover) level.spRecover = spRecover;
      levels.push(level);
    }
    if (!levels.length) {
      const fallbackIndex = rows.findIndex(
        (row) => cellText(row[0]) === "\u6EE1\u7834\u6EE1\u6F5C\u529B" && cellText(row[4])
      );
      if (fallbackIndex >= 0) {
        const row = rows[fallbackIndex];
        levels.push({
          label: "\u6EE1\u7834\u6EE1\u6F5C\u529B",
          sp: parseNumber(cellText(row[2])),
          cd: parseNumber(cellText(row[3])),
          description: cellText(row[4]),
          scopeUrl: absUrl(cellText(row[1]))
        });
        warnings.push(`\u6280\u80FD\u300C${costume || skillName}\u300Dwiki \u53EA\u7ED9\u4E86\u6EE1\u7834\u6570\u636E\uFF0C+0~+5 \u9700\u8981\u4EBA\u5DE5\u8865`);
      }
    }
  }
  if (!levels.length) warnings.push(`\u6280\u80FD\u300C${costume || skillName}\u300D\u6CA1\u6709\u89E3\u6790\u5230\u7B49\u7EA7\u8868\uFF08+0~+5\uFF09`);
  const potentials = [];
  for (const [label, values] of skinMap) {
    if (/^潜力\d*$/.test(label)) {
      const desc = values[0];
      if (desc) potentials.push(desc);
    }
  }
  const burst = [];
  for (const [label, values] of skinMap) {
    if (!/^爆发\d+$/.test(label)) continue;
    const level = {
      label,
      sp: parseNumber(values[0]),
      description: values[1] || ""
    };
    const scopeUrl = absUrl(values[2]);
    if (scopeUrl) level.scopeUrl = scopeUrl;
    if (level.sp || level.description || level.scopeUrl) burst.push(level);
  }
  const parseAbility = (text) => {
    const result = {};
    if (!text) return result;
    for (const part of text.split(/[；;，,、\n]/)) {
      const matched = part.match(/([^\d：:]+)[：:]\s*(-?\d+(?:\.\d+)?)(%?)/);
      if (!matched) continue;
      const label = matched[1].trim();
      const value = Number(matched[2]);
      const percent = matched[3] === "%";
      let key = "";
      if (label.includes("\u751F\u547D")) key = percent ? "PHP" : "HP";
      else if (label.includes("\u653B\u51FB")) key = percent ? "PATK" : "ATK";
      else if (label.includes("\u9B54\u6CD5\u529B")) key = percent ? "PMATK" : "MATK";
      else if (label.includes("\u9632\u5FA1")) key = "DEF";
      else if (label.includes("\u62B5\u6297")) key = "MRES";
      else if (label.includes("\u81F4\u547D\u7387") || label.includes("\u66B4\u51FB\u7387")) key = "CR";
      else if (label.includes("\u81F4\u547D\u4F24\u5BB3") || label.includes("\u7206\u4F24")) key = "CDMG";
      else if (label.includes("\u5C5E\u6027\u4F24\u5BB3")) key = "DMG";
      if (key) result[key] = value;
    }
    return result;
  };
  const permanent = parseAbility(skinMap.get("\u5171\u4EAB\u80FD\u529B\u503C")?.[0]);
  const bonding = parseAbility(skinMap.get("\u7ED1\u5B9A\u80FD\u529B\u503C")?.[0]);
  return {
    costume: costume || skillName,
    cName: costume || skillName,
    skillName,
    levels,
    burst,
    potentials,
    permanent,
    bonding,
    icon: absUrl(
      (skinMap.get("\u6280\u80FD\u56FE\u6807") || []).find((url) => url.startsWith("//") || url.startsWith("http"))
    ),
    art: absUrl(
      (skinMap.get("\u670D\u88C5\u7ACB\u7ED8") || []).find((url) => url.startsWith("//") || url.startsWith("http"))
    ),
    chibi: absUrl(
      (skinMap.get("\u670D\u88C5\u5C0F\u4EBA\u56FE") || []).find(
        (url) => url.startsWith("//") || url.startsWith("http")
      )
    )
  };
};

// scripts/tmp-wiki-compare.ts
var HEADERS = {
  "game-alias": "zsca2",
  Origin: "https://www.gamekee.com/",
  Referer: "https://www.gamekee.com/"
};
var requestJson = async (url) => {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return await res.json();
};
var venakaRaw = await requestJson(
  "https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/625113.json"
);
var venaka = parseCharacterDetail(venakaRaw, { entryId: 152215, contentId: 625113 });
console.log("===== venaka =====");
venaka.skills.forEach((skill, index) => {
  console.log(`[skin${index + 1}] \u670D\u88C5: ${skill.costume} | \u6280\u80FD: ${skill.skillName}`);
  console.log(`  \u6F5C\u529B(${skill.potentials.length}):`);
  skill.potentials.forEach((p, i) => console.log(`    \u6F5C\u529B${i + 1}: ${p}`));
  console.log(`  \u7206\u53D1(${skill.burst.length}):`);
  skill.burst.forEach((b) => console.log(`    ${b.label}: sp=${b.sp} ${b.description}${b.scopeUrl ? " [\u6709\u8303\u56F4\u56FE]" : ""}`));
});
var tree = await requestJson("https://www.gamekee.com/v1/entry/treesByPidV1?pid=194491");
var entries = parseCharacterTree(tree);
var bladeEntry = entries.find((e) => e.cName === "\u5E03\u83B1\u5FB7" || e.cName.includes("\u5E03\u83B1\u5FB7"));
console.log("\n===== blade =====");
console.log("tree \u6761\u76EE:", bladeEntry ? `${bladeEntry.cName} contentId=${bladeEntry.contentId} entryId=${bladeEntry.entryId} ${bladeEntry.star}\u661F` : "\u672A\u627E\u5230");
if (bladeEntry) {
  const bladeRaw = await requestJson(
    `https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/${bladeEntry.contentId}.json`
  );
  const blade = parseCharacterDetail(bladeRaw, { entryId: bladeEntry.entryId, contentId: bladeEntry.contentId });
  blade.skills.forEach((skill, index) => {
    console.log(`[skin${index + 1}] \u670D\u88C5: ${skill.costume} | \u6280\u80FD: ${skill.skillName}`);
    console.log(`  +0 \u63CF\u8FF0: ${(skill.levels[0]?.description || "").slice(0, 120)}`);
    console.log(`  sp=${skill.levels[0]?.sp} cd=${skill.levels[0]?.cd}`);
    console.log(`  \u6F5C\u529B(${skill.potentials.length}):`);
    skill.potentials.forEach((p, i) => console.log(`    \u6F5C\u529B${i + 1}: ${p}`));
    console.log(`  \u7206\u53D1(${skill.burst.length}):`);
    skill.burst.forEach((b) => console.log(`    ${b.label}: sp=${b.sp} ${b.description}`));
  });
  console.log("\n  styleData \u539F\u59CB\u884C\uFF08\u524D 60 \u884C\uFF09:");
  bladeRaw && JSON.parse(bladeRaw.content).styleData.forEach((skin, si) => {
    console.log(`  --- style${si} ---`);
    skin.data.slice(0, 60).forEach((row) => {
      console.log("    " + row.map((c) => cellText(c)).join(" | "));
    });
  });
}

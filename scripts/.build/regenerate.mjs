// scripts/regenerate.ts
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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

// src/utils/gamekee/generate.ts
var DOT_KIND = {
  \u51FA\u8840: "bleed",
  \u707C\u4F24: "burn",
  \u70E7\u4F24: "burn",
  \u4E2D\u6BD2: "poison",
  \u8150\u70C2: "rot"
};
var REPELLING_DIRECTION = {
  \u540E\u65B9: [0, -1],
  \u524D\u65B9: [0, 1],
  \u5DE6\u65B9: [-1, 0],
  \u53F3\u65B9: [1, 0]
};
var ELEMENT = {
  \u5149\u5C5E\u6027: "light",
  \u6697\u5C5E\u6027: "dark",
  \u706B\u5C5E\u6027: "fire",
  \u6C34\u5C5E\u6027: "water",
  \u98CE\u5C5E\u6027: "wind"
};
var createContext = (level) => {
  const effect = {
    chain: 0,
    multiplying: 0,
    extraMultiplying: 0,
    mainMultiplying: 0,
    threeMultiplying: 0,
    lifemanship: 0,
    spNumber: 0,
    spExtraMultiplying: 0,
    buffs: [],
    deBuffs: [],
    dotBuffs: [],
    hitBuffs: [],
    spAdds: [],
    notes: [],
    uncertain: []
  };
  return {
    effect,
    spOffset: level.spRecover ? 1 : 0,
    carriedDuration: 0,
    newBuff: (fields, duration, scope, attribute) => {
      effect.buffs.push({ fields, duration, scope, attribute });
      return effect.buffs.length - 1;
    },
    newDeBuff: (fields, duration, attribute, attributeElement, type) => {
      effect.deBuffs.push({ fields, duration, attribute, attributeElement, type });
      return effect.deBuffs.length - 1;
    },
    newDotBuff: (type, fields, duration) => {
      effect.dotBuffs.push({ type, fields, duration });
      return effect.dotBuffs.length - 1;
    },
    newHitBuff: (target, fields) => {
      effect.hitBuffs.push({ target, fields });
      return effect.hitBuffs.length - 1;
    }
  };
};
var durPrefix = (m, group, ctx, path) => m[group] ? `&-effect/${path}duration-&\u56DE\u5408\u5185\uFF0C` : "";
var num = (text) => text ? Number(text) : 0;
var SCAN_RULES = [
  // 先发制人标记：本身不是数值，命中后保留原文
  {
    re: /【?先发制人】?/g,
    apply: (m, ctx) => {
      ctx.effect.lifemanship = 1;
      return m[0];
    }
  },
  // 条件伤害（若…则改为…）：整句保留原文，数值不结构化，交给人工
  {
    re: /若[^。；\n]{0,70}?(?:则改为|则在|，则|则)[^。；\n]{0,50}/g,
    apply: (m, ctx) => {
      ctx.effect.notes.push(`\u6761\u4EF6\u6548\u679C\u672A\u7ED3\u6784\u5316\uFF1A${m[0]}`);
      return m[0];
    }
  },
  // 每层叠加的持续伤害（必须在倍率规则之前，句子里也有「造成相当于」）
  {
    re: /(?:(\d+)回合内，)?对敌人应用每层叠加造成相当于(自身(?:攻击力|魔法力)|敌人(?:攻击力|魔法力))(\d+(?:\.\d+)?)%(的)?((?:物理|魔法))?伤害的(出血|灼伤|烧伤|中毒)叠加效果/g,
    apply: (m, ctx) => {
      const kind = DOT_KIND[m[6]] || "poison";
      const i = ctx.newDotBuff(kind, { dotMultiplying: num(m[3]), dotbuffNumber: 1 }, num(m[1]) || ctx.carriedDuration || 99);
      return `${durPrefix(m, 1, ctx, `dotBuff/${i}/`)}\u5BF9\u654C\u4EBA\u5E94\u7528\u6BCF\u5C42\u53E0\u52A0\u9020\u6210\u76F8\u5F53\u4E8E${m[2]}&-effect/dotBuff/${i}/dotMultiplying-&${m[4]}${m[5]}\u4F24\u5BB3\u7684${m[6]}\u53E0\u52A0\u6548\u679C`;
    }
  },
  // 普通持续伤害
  {
    re: /(?:(\d+)回合内，)?对敌人应用造成相当于(自身(?:攻击力|魔法力)|敌人(?:攻击力|魔法力))(\d+(?:\.\d+)?)%(的)?((?:物理|魔法))?伤害的(出血|灼伤|烧伤|中毒)效果/g,
    apply: (m, ctx) => {
      const kind = DOT_KIND[m[6]] || "poison";
      const i = ctx.newDotBuff(kind, { dotMultiplying: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99);
      return `${durPrefix(m, 1, ctx, `dotBuff/${i}/`)}\u5BF9\u654C\u4EBA\u5E94\u7528\u9020\u6210\u76F8\u5F53\u4E8E${m[2]}&-effect/dotBuff/${i}/dotMultiplying-&${m[4]}${m[5]}\u4F24\u5BB3\u7684${m[6]}\u6548\u679C`;
    }
  },
  // 「N回合期间，每回合根据目标攻击力…」的中毒式持续伤害
  {
    re: /(\d+)回合期间，每回合根据目标攻击力的(\d+(?:\.\d+)?)%对其造成物理伤害/g,
    apply: (m, ctx) => {
      const i = ctx.newDotBuff("poison", { dotMultiplying: num(m[2]) }, num(m[1]));
      return `&-effect/dotBuff/${i}/duration-&\u56DE\u5408\u671F\u95F4\uFF0C\u6BCF\u56DE\u5408\u6839\u636E\u76EE\u6807\u653B\u51FB\u529B\u7684&-effect/dotBuff/${i}/dotMultiplying-&%\u5BF9\u5176\u9020\u6210\u7269\u7406\u4F24\u5BB3`;
    }
  },
  // 最多可叠加层数（挂在最近一个持续伤害上）
  {
    re: /((?:并且)?最多可(?:赋予)?叠加(?:至)?)(\d+)(层?[^。；]{0,4})/g,
    apply: (m, ctx) => {
      const last = ctx.effect.dotBuffs[ctx.effect.dotBuffs.length - 1];
      if (!last) return m[0];
      last.fields.maxNumber = num(m[2]);
      return `${m[1]}&-effect/dotBuff/${ctx.effect.dotBuffs.length - 1}/maxNumber-&${m[3]}`;
    }
  },
  // 技能倍率：造成相当于自身攻击力X%…
  {
    re: /(造成相当于)(自身(?:攻击力|魔法力|最大生命力|当前生命力|生命力)|敌人最大生命力)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[3]);
      return `${m[1]}${m[2]}&-effect/multiplying-&${m[4]}`;
    }
  },
  // 技能倍率：根据自己攻击力的X%造成伤害
  {
    re: /(根据自己(?:攻击力|魔法力)的)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[2]);
      return `${m[1]}&-effect/multiplying-&${m[3]}`;
    }
  },
  // 技能倍率：每次攻击时造成自身魔法力X%的魔法伤害（无「相当于」）
  {
    re: /(每次攻击时造成)(自身(?:攻击力|魔法力))(?:的)?(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[3]);
      return `${m[1]}${m[2]}&-effect/multiplying-&${m[4]}`;
    }
  },
  // 每命中一个目标，伤害量增加X%
  {
    re: /(每命中一个目标，伤害量增加)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.extraMultiplying = num(m[2]);
      return `${m[1]}&-effect/extraMultiplying-&${m[3]}`;
    }
  },
  // 每额外消耗N点SP，伤害提升X%
  {
    re: /(每额外消耗)(\d+)(点SP，伤害提升)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.spNumber = num(m[2]);
      ctx.effect.spExtraMultiplying = num(m[4]);
      return `${m[1]}&-effect/spNumber-&${m[3]}&-effect/spExtraMultiplying-&${m[5]}`;
    }
  },
  // 连锁次数
  {
    re: /(攻击敌人)(\d+)(次)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2]);
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0];
    }
  },
  {
    re: /(对敌人进行)(\d+)(次攻击)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2]);
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0];
    }
  },
  {
    re: /(攻击)(\d+)(次)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2]);
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0];
    }
  },
  // 受击触发：为自己附加攻击力增加（阿奇拉战场狂喜式）
  {
    re: /(?:(\d+)回合内，)?自身受到攻击时，为自己附加持续(\d+)回合攻击力增加(\d+(?:\.\d+)?)%的效果/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ hit: 1 }, num(m[1]) || ctx.carriedDuration || 99, "self");
      const j = ctx.newHitBuff("friendly", { duration: num(m[2]), attackAdd: num(m[3]) });
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u4E3A\u81EA\u5DF1\u9644\u52A0\u6301\u7EED&-effect/hitBuff/${j}/duration-&\u56DE\u5408\u653B\u51FB\u529B\u589E\u52A0&-effect/hitBuff/${j}/attackAdd-&%\u7684\u6548\u679C`;
    }
  },
  // 叠加层数（挂在最近一个受击 buff 上）
  {
    re: /(此效果叠加至)(\d+)(。最多可叠加至)(\d+)(。)/g,
    apply: (m, ctx) => {
      const last = ctx.effect.hitBuffs[ctx.effect.hitBuffs.length - 1];
      if (!last) return m[0];
      const index = ctx.effect.hitBuffs.length - 1;
      last.fields.increasingNumber = num(m[2]);
      last.fields.maxNumber = num(m[4]);
      return `${m[1]}&-effect/hitBuff/${index}/increasingNumber-&${m[3]}&-effect/hitBuff/${index}/maxNumber-&${m[5]}`;
    }
  },
  // 受击触发：当前服装冷却时间减少
  {
    re: /(?:(\d+)回合内，)?自身受到攻击时，当前服装的冷却时间减少(\d+)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ hit: 1 }, num(m[1]) || ctx.carriedDuration || 99, "self");
      const j = ctx.newHitBuff("friendly", { cdReduce: num(m[2]) });
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u5F53\u524D\u670D\u88C5\u7684\u51B7\u5374\u65F6\u95F4\u51CF\u5C11&-effect/hitBuff/${j}/cdReduce-&`;
    }
  },
  // 反击：开启 / 反击伤害 / 反击次数
  {
    re: /(?:(\d+)回合内，)?(自身遭受攻击时，将进行反击)/g,
    apply: (m, ctx) => {
      ctx.newBuff({ hit: 1 }, num(m[1]) || 99, "self");
      return m[0];
    }
  },
  {
    re: /(每次反击时，对敌人(?:全体)?造成相当于)(自身攻击力|承受伤害)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newHitBuff("enemy", { hitMultiplying: num(m[3]) });
      return `${m[1]}${m[2]}&-effect/hitBuff/${i}/hitMultiplying-&${m[4]}`;
    }
  },
  {
    re: /(此效果在遭受)(\d+)(次攻击后将消失)/g,
    apply: (m, ctx) => {
      const last = ctx.effect.hitBuffs[ctx.effect.hitBuffs.length - 1];
      if (!last) return m[0];
      last.fields.triggerCount = num(m[2]);
      return `${m[1]}&-effect/hitBuff/${ctx.effect.hitBuffs.length - 1}/triggerCount-&${m[3]}`;
    }
  },
  // 击退与碰撞伤害
  {
    re: /((?:并将目标|将目标)向(后方|前方|左方|右方)击退)(\d+)(格)/g,
    apply: (m, ctx) => {
      const repelling = ctx.effect.repelling ||= { distance: 0, multiplying: 0 };
      repelling.direction = REPELLING_DIRECTION[m[2]];
      repelling.distance = num(m[3]);
      return `${m[1]}&-effect/repellingDistance-&${m[4]}`;
    }
  },
  {
    re: /(向(后方|前方|左方|右方)击退)(\d+)(格)/g,
    apply: (m, ctx) => {
      const repelling = ctx.effect.repelling ||= { distance: 0, multiplying: 0 };
      repelling.direction = REPELLING_DIRECTION[m[2]];
      repelling.distance = num(m[3]);
      return `${m[1]}&-effect/repellingDistance-&${m[4]}`;
    }
  },
  {
    re: /(对被撞击的敌人造成相当于(?:被推开)?目标最大生命力)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const repelling = ctx.effect.repelling ||= { distance: 0, multiplying: 0 };
      repelling.multiplying = num(m[2]);
      return `${m[1]}&-effect/repellingMultiplying-&${m[3]}`;
    }
  },
  // 自身攻击/魔法力增加
  {
    re: /(?:(\d+)回合内，)?自身(攻击力|魔法力)(增加|提升|上升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "self", m[2] === "\u9B54\u6CD5\u529B" ? "matk" : "atk");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u81EA\u8EAB${m[2]}${m[3]}&-effect/buff/${i}/attackAdd-&%`;
    }
  },
  // 友军攻击/魔法力增加
  {
    re: /(?:(\d+)回合内，)?友军的(攻击力|魔法力)(增加|提升|上升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "allies", m[2] === "\u9B54\u6CD5\u529B" ? "matk" : "atk");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u53CB\u519B\u7684${m[2]}${m[3]}&-effect/buff/${i}/attackAdd-&%`;
    }
  },
  // 友军的攻击力或魔法力将根据各自攻击类型增加X%
  {
    re: /(?:(\d+)回合内，)?友军的攻击力或魔法力将根据各自攻击类型(增加|提升|提高)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u53CB\u519B\u7684\u653B\u51FB\u529B\u6216\u9B54\u6CD5\u529B\u5C06\u6839\u636E\u5404\u81EA\u653B\u51FB\u7C7B\u578B${m[2]}&-effect/buff/${i}/attackAdd-&%`;
    }
  },
  // 对自身应用攻击力增加X%的效果
  {
    re: /(对自身应用)(攻击力|魔法力|爆伤|暴击伤害|致命伤害|致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)(%的效果)/g,
    apply: (m, ctx) => {
      const kind = m[2];
      let fields;
      let attribute;
      if (kind === "\u653B\u51FB\u529B" || kind === "\u9B54\u6CD5\u529B") {
        fields = { attackAdd: num(m[4]) };
        attribute = kind === "\u9B54\u6CD5\u529B" ? "matk" : "atk";
      } else if (kind === "\u81F4\u547D\u7387" || kind === "\u66B4\u51FB\u7387") {
        fields = { CRAdd: num(m[4]) };
      } else {
        fields = { critical: num(m[4]) };
      }
      const i = ctx.newBuff(fields, ctx.carriedDuration || 99, "self", attribute);
      return `${m[1]}${m[2]}${m[3]}&-effect/buff/${i}/${Object.keys(fields)[0]}-&${m[5]}`;
    }
  },
  // 友军/自身致命率（暴击率）
  {
    re: /(?:(\d+)回合内，)?友军的(致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ CRAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u53CB\u519B\u7684${m[2]}${m[3]}&-effect/buff/${i}/CRAdd-&%`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?自身(致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ CRAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "self");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u81EA\u8EAB${m[2]}${m[3]}&-effect/buff/${i}/CRAdd-&%`;
    }
  },
  // 致命伤害（爆伤）
  {
    re: /(?:(\d+)回合内，)?友军的(爆伤|暴击伤害|致命伤害)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ critical: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u53CB\u519B\u7684${m[2]}${m[3]}&-effect/buff/${i}/critical-&%`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?自身(爆伤|暴击伤害|致命伤害)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ critical: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, "self");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u81EA\u8EAB${m[2]}${m[3]}&-effect/buff/${i}/critical-&%`;
    }
  },
  // 属性伤害
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)([火水风光暗])?属性伤害(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const field = m[3] === "\u5149" ? "lightAttributeDamage" : "attributeDamage";
      const i = ctx.newBuff({ [field]: num(m[5]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === "\u81EA\u8EAB" ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3] || ""}\u5C5E\u6027\u4F24\u5BB3${m[4]}&-effect/buff/${i}/${field}-&%`;
    }
  },
  // 使自身属性伤害在N回合内增加X%
  {
    re: /((?:使自身属性伤害|自身属性伤害)在)(\d+)(回合内(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attributeDamage: num(m[4]) }, num(m[2]), "self");
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/attributeDamage-&${m[5]}`;
    }
  },
  // 伤害增加 / 伤害减少
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)((?:造成的)?伤害(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === "\u81EA\u8EAB" ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)((?:受到的)?伤害(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ damageReduction: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === "\u81EA\u8EAB" ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3]}&-effect/buff/${i}/damageReduction-&${m[5]}`;
    }
  },
  // 增强效果（伤害增加）的各种句式
  {
    re: /(为下一名攻击的友军施加增强效果，持续)(\d+)(回合，使其造成的伤害增加)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), "allies");
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`;
    }
  },
  {
    re: /(对友军应用在)(\d+)(回合内，施加伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), "allies");
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`;
    }
  },
  {
    re: /(对自己在)(\d+)(回合内，应用施加伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), "self");
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`;
    }
  },
  {
    re: /(\d+)(回合内，对友军应用攻击连携叠加\d+或以上的敌人时，施加的伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[3]) }, num(m[1]), "allies");
      return `&-effect/buff/${i}/duration-&${m[2]}&-effect/buff/${i}/increasedDamage-&${m[4]}`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?对友军应用(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[2]) }, num(m[1]) || ctx.carriedDuration || 99, "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}\u5BF9\u53CB\u519B\u5E94\u7528&-effect/buff/${i}/increasedDamage-&${m[3]}`;
    }
  },
  // 能量护盾
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用相当于|光环效果内友军应用相当于)(?:各自自身)?(?:最大生命力|攻击力|魔法力))(\d+(?:\.\d+)?)(%的能量护盾效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ shield: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes("\u81EA\u5DF1") ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/shield-&${m[4]}`;
    }
  },
  // 防护罩
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用|对光环效果内友军应用))((?:物理|魔法))?(\d+(?:\.\d+)?)(%的防护罩(?:效果)?)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ damageReduction: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes("\u81EA\u5DF1") ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3] || ""}&-effect/buff/${i}/damageReduction-&${m[5]}`;
    }
  },
  // 挑衅（自己/友军身上，值恒为 1 不占位）
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用|对自身应用))(?:挑衅|嘲讽)(?:效果)?/g,
    apply: (m, ctx) => {
      ctx.newBuff({ provocation: 1 }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes("\u81EA\u5DF1") || m[2].includes("\u81EA\u8EAB") ? "self" : "allies");
      return m[0];
    }
  },
  // 先发制人闪避次数
  {
    re: /(自身成功闪避敌人)(\d+)(次前)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ sidestep: num(m[2]) }, 99, "self");
      return `${m[1]}&-effect/buff/${i}/sidestep-&${m[3]}`;
    }
  },
  // SP消耗减少
  {
    re: /(?:(\d+)回合内，)?(对友军应用SP消耗减少)(\d+)(的效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ spReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/spReduce-&${m[4]}`;
    }
  },
  // 恢复生命力（持续回合结束时恢复 / 立即恢复）
  {
    re: /(?:(\d+)回合内，)?((?:每回合结束时，)?恢复(?:自身|友军)相当于(?:自身|友军)?(?:各自自身)?(?:当前生命力|最大生命力|攻击力|魔法力)(?:的)?)(\d+(?:\.\d+)?)(%的生命力)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ HPAdd: num(m[3]) }, num(m[1]) || 0, m[2].startsWith("\u6062\u590D\u81EA\u8EAB") ? "self" : "allies");
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/HPAdd-&${m[4]}`;
    }
  },
  // 命中触发：友军 SP 恢复
  {
    re: /(每次攻击命中敌人时，友军的SP恢复)(\d+)(点)/g,
    apply: (m, ctx) => {
      const i = ctx.newHitBuff("friendly", { spAdd: num(m[2]) });
      return `${m[1]}&-effect/hitBuff/${i}/spAdd-&${m[3]}`;
    }
  },
  // 直接 SP 恢复（表里已有 SP恢复 列时指向 special[0]）
  {
    re: /((?:友军|自身)的SP恢复)(\d+)(点)/g,
    apply: (m, ctx) => {
      let index;
      if (ctx.spOffset) {
        index = 0;
      } else {
        ctx.effect.spAdds.push(num(m[2]));
        index = ctx.effect.spAdds.length - 1;
      }
      return `${m[1]}&-effect/special/${index}/spAdd-&${m[3]}`;
    }
  },
  // 防御/魔抗/攻击力降低
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?防御力(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ DEFReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99);
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/DEFReduce-&${m[4]}`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?(?:魔法抵抗|魔抗)(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ MRESReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99);
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/MRESReduce-&${m[4]}`;
    }
  },
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?(攻击力|魔法力)(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ attackReduce: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[3] === "\u9B54\u6CD5\u529B" ? "matk" : "atk");
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/attackReduce-&${m[5]}`;
    }
  },
  // 虚弱（物理/魔法前缀是脆弱类，属性前缀是属性虚弱）
  {
    re: /(?:(\d+)回合内，)?((?:对(?:主要目标)?敌人应用|应用))((?:物理|魔法|光属性|暗属性|火属性|水属性|风属性)?)(\d+(?:\.\d+)?)(%的?(?:虚弱|虚弱效果)(?:效果)?)/g,
    apply: (m, ctx) => {
      const main = m[2].includes("\u4E3B\u8981\u76EE\u6807");
      const attrPrefix = m[3] === "\u7269\u7406" || m[3] === "\u9B54\u6CD5" ? m[3] : "";
      const field = main ? "mainEnemyWeakness" : "enemyWeakness";
      const i = ctx.newDeBuff(
        { [field]: num(m[4]) },
        num(m[1]) || ctx.carriedDuration || 99,
        attrPrefix === "\u9B54\u6CD5" ? "matk" : attrPrefix === "\u7269\u7406" ? "atk" : void 0,
        ELEMENT[m[3]],
        attrPrefix ? "fragility" : "weakness"
      );
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/${field}-&${m[5]}`;
    }
  },
  // 脆弱
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用|应用))((?:物理|魔法)?)(\d+(?:\.\d+)?)(%的?脆弱(?:效果)?)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff(
        { enemyWeakness: num(m[4]) },
        num(m[1]) || ctx.carriedDuration || 99,
        m[3] === "\u9B54\u6CD5" ? "matk" : m[3] === "\u7269\u7406" ? "atk" : void 0,
        void 0,
        "fragility"
      );
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/enemyWeakness-&${m[5]}`;
    }
  },
  // 受到的伤害增加（易伤）
  {
    re: /(?:(\d+)回合内，)?([^。；\n]{0,10}?)((?:受到|承受)(?:的)?伤害(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ enemyWeakness: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, void 0, void 0, "weakness");
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/enemyWeakness-&${m[5]}`;
    }
  },
  // 受到的连携伤害增加
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用)受到的连携伤害增加)(\d+(?:\.\d+)?)(%的效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ chainDamageAdd: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99);
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/chainDamageAdd-&${m[4]}`;
    }
  },
  // 沉默
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用)沉默(?:效果)?)/g,
    apply: (m, ctx) => {
      ctx.newDeBuff({ silence: 1 }, num(m[1]) || ctx.carriedDuration || 99);
      return m[0];
    }
  },
  // 兜底：任何「N回合」，更新持续回合记录
  {
    re: /(\d+)回合内?/g,
    apply: (m, ctx) => {
      ctx.carriedDuration = num(m[1]);
      return m[0];
    }
  }
];
var NOTE_KEYWORDS = [
  "\u53EC\u5524",
  "\u6807\u8BB0",
  "\u96C6\u4E2D\u5C04\u51FB",
  "\u590D\u6D3B",
  "\u514D\u75AB",
  "\u89E3\u9664",
  "\u53E0\u52A0",
  "\u8FDE\u643A",
  "SP\u51CF\u5C11",
  "\u51BB\u4F24",
  "\u9886\u57DF",
  "\u5149\u73AF",
  "\u5370\u8BB0",
  "\u66B4\u8D70",
  "\u5438\u6536",
  "\u51B7\u5374\u65F6\u95F4",
  "\u653B\u51FB\u987A\u5E8F",
  "\u53D7\u5230\u653B\u51FB",
  "\u906D\u53D7\u653B\u51FB",
  "\u53D8\u8EAB",
  "\u6982\u7387",
  "\u5632\u8BBD",
  "\u6311\u8845",
  "\u53CD\u51FB",
  "\u4F7F\u7528\u76F8\u5F53\u4E8E",
  "\u6D88\u8017\u81EA\u8EAB",
  "\u751F\u547D\u503C",
  "\u865A\u5F31",
  "\u6301\u7EED\u4F24\u5BB3",
  "\u51FB\u9000",
  "\u6B63\u5728\u51B7\u5374",
  "\u81EA\u7206",
  "\u5669\u68A6",
  "\u989D\u5916\u9020\u6210"
];
var scanDescription = (description, ctx) => {
  const matches = [];
  for (const rule of SCAN_RULES) {
    rule.re.lastIndex = 0;
    let m;
    while (m = rule.re.exec(description)) {
      if (!m[0]) {
        rule.re.lastIndex++;
        continue;
      }
      matches.push({ rule, m, start: m.index, end: m.index + m[0].length });
    }
  }
  matches.sort((a, b) => a.start - b.start || b.end - a.end);
  let out = "";
  let pos = 0;
  const unmatched = [];
  for (const item of matches) {
    if (item.start < pos) continue;
    if (item.start > pos) {
      const segment = description.slice(pos, item.start);
      unmatched.push(segment);
      out += segment;
    }
    out += item.rule.apply(item.m, ctx);
    pos = item.end;
  }
  const tail = description.slice(pos);
  unmatched.push(tail);
  out += tail;
  for (const segment of unmatched) {
    for (const clause of segment.split(/[。；\n]/)) {
      const trimmed = clause.trim();
      if (!trimmed) continue;
      const matched = NOTE_KEYWORDS.some((keyword) => trimmed.includes(keyword));
      if (matched || /(增加|减少|提升|降低|恢复|赋予|施加|应用)/.test(trimmed)) {
        ctx.effect.notes.push(trimmed.length > 40 ? `${trimmed.slice(0, 40)}\u2026` : trimmed);
      }
    }
  }
  return out;
};
var extractSkillEffect = (description) => {
  const ctx = createContext({ label: "+0", sp: 0, cd: 0, description });
  scanDescription(description, ctx);
  if (!ctx.effect.multiplying && /伤害/.test(description)) {
    ctx.effect.uncertain.push("\u6CA1\u6709\u89E3\u6790\u5230\u6280\u80FD\u500D\u7387");
  }
  if (!ctx.effect.chain) ctx.effect.uncertain.push("\u6CA1\u6709\u89E3\u6790\u5230\u8FDE\u9501\u6B21\u6570");
  if (!ctx.effect.buffs.length && !ctx.effect.deBuffs.length && !ctx.effect.dotBuffs.length && /(增加|减少|恢复|免疫|解除|刷新|叠加)/.test(description)) {
    ctx.effect.uncertain.push("\u63CF\u8FF0\u91CC\u6709\u589E\u76CA/\u51CF\u76CA\u5173\u952E\u8BCD\uFF0C\u4F46\u6CA1\u89E3\u6790\u6210 buff");
  }
  return ctx.effect;
};
var toFileName = (ch) => {
  const english = (ch.name || "").trim();
  const words = english.split(/[\s_-]+/).filter(Boolean);
  if (!words.length) return `char${ch.contentId}`;
  const camel = words.map(
    (word, index) => index === 0 ? word.charAt(0).toLowerCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join("");
  const cleaned = camel.replace(/[^a-zA-Z0-9]/g, "");
  return /^[a-zA-Z]/.test(cleaned) ? cleaned : `char${ch.contentId}`;
};
var numberText = (value) => {
  if (!Number.isFinite(value)) return "0";
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
};
var quote = (text) => `'${(text || "").replace(/\\/g, "\\\\").replace(/\r?\n/g, " ").replace(/\s+/g, " ").replace(/'/g, "\\'")}'`;
var FULL_WIDTH = /[\u1100-\u115f\u2e80-\u303e\u3041-\u33ff\u3400-\u4dbf\u4e00-\u9fff\ua000-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe6f\uff00-\uff60\uffe0-\uffe6]/;
var displayWidth = (text) => [...text].reduce((sum, char) => sum + (FULL_WIDTH.test(char) ? 2 : 1), 0);
var longProp = (indent, key, value) => {
  const line = `${indent}${key}: ${value},`;
  return displayWidth(line) <= 100 ? [line] : [`${indent}${key}:`, `${indent}  ${value},`];
};
var parsePotentialField = (description) => {
  if (/【|虚弱|噩梦|护盾|反击|连携|持续|范围增加|召唤|标记|吸收/.test(description)) return null;
  const match = description.match(/(.+?)\s*([+-])\s*(\d+(?:\.\d+)?)\s*(回合|层|点)?%?/);
  if (!match) return null;
  const label = match[1].trim();
  const value = Number(match[3]) * (match[2] === "-" ? -1 : 1);
  if (/^SP消耗$/.test(label)) return { key: "sp", value: Math.abs(value) };
  if (/^冷却时间$/.test(label)) return { key: "cd", value: -Math.abs(value) };
  if (/^(攻击力|魔法力|攻击力增加倍率|魔法力增加倍率|攻击力或魔法力增加倍率)$/.test(label)) {
    return { key: "attackAdd", value };
  }
  if (/^(致命伤害|爆伤)$/.test(label)) return { key: "critical", value };
  if (/^(致命率|暴击率)$/.test(label)) return { key: "CRAdd", value };
  if (/^(伤害倍率|技能伤害|技能伤害倍率|每次攻击技能伤害|每次攻击的技能伤害|伤害量|伤害增加|伤害提升)$/.test(label)) {
    return { key: "multiplying", value };
  }
  if (/^伤害提升倍率$/.test(label)) return { key: "spExtraMultiplying", value };
  if (/^每命中一个目标，伤害倍率$/.test(label)) return { key: "extraMultiplying", value };
  if (/^撞击伤害倍率$/.test(label)) return { key: "repellingMultiplying", value };
  if (/^(增强效果倍率|造成的伤害增加)$/.test(label)) return { key: "increasedDamage", value };
  if (/^恢复倍率$/.test(label)) return { key: "HPAdd", value };
  if (/^防护罩$/.test(label)) return { key: "damageReduction", value };
  if (/^(出血效果倍率|灼伤效果倍率|中毒效果倍率|持续伤害倍率)$/.test(label)) {
    return { key: "dotMultiplying", value };
  }
  return null;
};
var potentialsSource = (potentials) => {
  const lines2 = [];
  if (!potentials.length) {
    lines2.push("        // TODO: wiki \u6CA1\u6709\u6280\u80FD\u6F5C\u529B\u6570\u636E");
    return lines2;
  }
  potentials.forEach((descText, index) => {
    const linesInCell = descText.split("\n").map((line) => line.trim()).filter(Boolean);
    const fields = linesInCell.map((line) => parsePotentialField(line)).filter((field) => !!field);
    lines2.push(`        potentials${index + 1}: {`);
    if (fields.length) {
      lines2.push(`          ${fields.map((f) => `${f.key}: ${numberText(f.value)}`).join(", ")},`);
    } else {
      lines2.push("          // TODO: \u8BE5\u6F5C\u529B\u4E0D\u662F\u901A\u7528\u6570\u503C\uFF0C\u9700\u8981\u5728 buff/deBuff \u91CC\u624B\u5DE5\u8865");
    }
    lines2.push(`          description: ${quote(linesInCell.join(" "))},`);
    lines2.push("        },");
  });
  return lines2;
};
var abilitySource = (skill) => {
  const lines2 = ["      ability: {"];
  if (Object.keys(skill.permanent).length) {
    lines2.push("        Permanent: {");
    lines2.push("          // \u901A\u7528\u5C5E\u6027");
    for (const [key, value] of Object.entries(skill.permanent)) {
      lines2.push(`          ${key}: ${numberText(value)},`);
    }
    lines2.push("        },");
  }
  if (Object.keys(skill.bonding).length) {
    lines2.push("        Bonding: {");
    lines2.push("          // \u7ED1\u5B9A\u5C5E\u6027");
    for (const [key, value] of Object.entries(skill.bonding)) {
      lines2.push(`          ${key}: ${numberText(value)},`);
    }
    lines2.push("        },");
  }
  if (!Object.keys(skill.permanent).length && !Object.keys(skill.bonding).length) {
    lines2.push("        // TODO: wiki \u6CA1\u6709\u586B\u5199\u5171\u4EAB/\u7ED1\u5B9A\u80FD\u529B\u503C");
  }
  lines2.push("      },");
  return lines2;
};
var targetOf = (skill) => {
  const description = skill.levels[0]?.description || "";
  if (/对敌人|攻击敌人|击退|撞击|反击/.test(description)) return "enemy";
  return /友军|我军/.test(description) ? "friendly" : "enemy";
};
var scopeSource = (scope, indent = "      ") => {
  if (!scope) return [`${indent}scope: [[0, 0]], // TODO: \u8303\u56F4\u56FE\u6CA1\u89E3\u6790\u51FA\u6765\uFF0C\u8BF7\u4EBA\u5DE5\u786E\u8BA4\u547D\u4E2D\u8303\u56F4`];
  if (!scope.length) return [`${indent}scope: [], // \u653B\u51FB\u8BBF\u95EE\uFF0C\u4E8C\u7EF4\u5750\u6807\u7CFB\u5B58\u50A8\u3002\u8303\u56F4\u4E3A\u7A7A\u5C31\u662F\u5168\u90E8`];
  if (scope.length === 1) {
    const [x, y] = scope[0];
    return [`${indent}scope: [[${x}, ${y}]], // \u653B\u51FB\u8BBF\u95EE\uFF0C\u4E8C\u7EF4\u5750\u6807\u7CFB\u5B58\u50A8\u3002\u8303\u56F4\u4E3A\u7A7A\u5C31\u662F\u5168\u90E8`];
  }
  return [
    `${indent}scope: [`,
    ...scope.map(([x, y]) => `${indent}  [${x}, ${y}],`),
    `${indent}], // \u653B\u51FB\u8BBF\u95EE\uFF0C\u4E8C\u7EF4\u5750\u6807\u7CFB\u5B58\u50A8\u3002\u76F4\u63A5\u547D\u4E2D\u76EE\u6807\u4E3A[0,0]`
  ];
};
var parseBurstFields = (description) => {
  const fields = {};
  const damage = description.match(/伤害量\+(\d+(?:\.\d+)?)%/);
  if (damage) fields.multiplying = Number(damage[1]);
  const extra = description.match(/额外伤害(?:量|倍率)\+(\d+(?:\.\d+)?)%/);
  if (extra) fields.extraMultiplying = Number(extra[1]);
  const attack = description.match(/(?:攻击力|魔法力)(?:强化|增加|提升)(\d+(?:\.\d+)?)%/);
  if (attack) fields.attackAdd = Number(attack[1]);
  const shield = description.match(
    /(?:(\d+(?:\.\d+)?)%[^。；]*?(?:能量护盾|护盾)|(?:能量护盾|护盾)[^。；]*?(\d+(?:\.\d+)?)%)/
  );
  if (shield) fields.shield = Number(shield[1] || shield[2]);
  const duration = description.match(/持续(\d+)回合/);
  if (duration) fields.duration = Number(duration[1]);
  return fields;
};
var burstSource = (skill) => {
  const filled = skill.burst.filter((level) => level.sp || level.description || level.scopeUrl);
  if (!filled.length) return [];
  const lines2 = ["      // \u7206\u53D1\u6280\u80FD", "      burst: {"];
  for (const level of filled) {
    lines2.push(`        ${level.label.replace("\u7206\u53D1", "burst")}: {`);
    lines2.push(`          sp: ${numberText(level.sp)}, // \u6D88\u8017SP`);
    if (level.description) {
      lines2.push(...longProp("          ", "description", quote(level.description)));
      lines2.push(...emitFields(parseBurstFields(level.description), BURST_FIELD_ORDER, "          "));
    }
    if (level.scopeUrl) {
      lines2.push(
        ...scopeSource(level.scope, "          ").map(
          (line) => line.replace("\u653B\u51FB\u8BBF\u95EE", "\u7206\u53D1\u540E\u7684\u653B\u51FB\u8303\u56F4")
        )
      );
    }
    lines2.push("        },");
  }
  lines2.push("      },");
  return lines2;
};
var BUFF_FIELD_ORDER = [
  "attackAdd",
  "critical",
  "CRAdd",
  "attributeDamage",
  "lightAttributeDamage",
  "increasedDamage",
  "damageReduction",
  "shield",
  "HPAdd",
  "hit",
  "provocation",
  "sidestep",
  "spReduce",
  "chainAddNumber"
];
var DEBUFF_FIELD_ORDER = [
  "attackReduce",
  "DEFReduce",
  "MRESReduce",
  "enemyWeakness",
  "mainEnemyWeakness",
  "chainDamageAdd",
  "silence",
  "provocation"
];
var DOT_FIELD_ORDER = ["dotMultiplying", "dotbuffNumber", "maxNumber"];
var HIT_FIELD_ORDER = [
  "spAdd",
  "HPAdd",
  "hitMultiplying",
  "triggerCount",
  "attackAdd",
  "cdReduce",
  "increasingNumber",
  "maxNumber",
  "duration"
];
var BURST_FIELD_ORDER = ["multiplying", "extraMultiplying", "attackAdd", "shield", "duration"];
var emitFields = (fields, order, indent) => {
  const lines2 = [];
  for (const key of order) {
    if (fields[key] !== void 0) lines2.push(`${indent}${key}: ${numberText(fields[key])},`);
  }
  for (const [key, value] of Object.entries(fields)) {
    if (!order.includes(key)) lines2.push(`${indent}${key}: ${numberText(value)},`);
  }
  return lines2;
};
var emitBuffArray = (buffs, needsDot, needsWeakness) => {
  if (!buffs.length) return [];
  const lines2 = ["          buff: ["];
  for (const buff of buffs) {
    lines2.push("            {");
    lines2.push(`              duration: ${numberText(buff.duration)},`);
    if (buff.attribute) lines2.push(`              attribute: '${buff.attribute}',`);
    lines2.push(...emitFields(buff.fields, BUFF_FIELD_ORDER, "              "));
    lines2.push(`              scope: ${buff.scope === "self" ? "[[0, 0]]" : "[]"},`);
    lines2.push("            },");
  }
  lines2.push("          ],");
  void needsDot;
  void needsWeakness;
  return lines2;
};
var emitDeBuffArray = (deBuffs, needsWeakness) => {
  if (!deBuffs.length) return [];
  const lines2 = ["          deBuff: ["];
  for (const debuff of deBuffs) {
    lines2.push("            {");
    lines2.push(`              duration: ${numberText(debuff.duration)},`);
    if (debuff.attribute) lines2.push(`              attribute: '${debuff.attribute}',`);
    if (debuff.attributeElement) lines2.push(`              attributeElement: '${debuff.attributeElement}',`);
    if (debuff.type) {
      lines2.push(`              type: enemyWeaknessDeBuffType.${debuff.type},`);
      needsWeakness.value = true;
    }
    lines2.push(...emitFields(debuff.fields, DEBUFF_FIELD_ORDER, "              "));
    lines2.push("              scope: [],");
    lines2.push("            },");
  }
  lines2.push("          ],");
  return lines2;
};
var emitDotArray = (dotBuffs, needsDot) => {
  if (!dotBuffs.length) return [];
  const lines2 = ["          dotBuff: ["];
  for (const dot of dotBuffs) {
    lines2.push("            {");
    lines2.push(`              type: dotBuffType.${dot.type},`);
    needsDot.value = true;
    lines2.push("              scope: [],");
    lines2.push(`              duration: ${numberText(dot.duration)},`);
    lines2.push(...emitFields(dot.fields, DOT_FIELD_ORDER, "              "));
    lines2.push("            },");
  }
  lines2.push("          ],");
  return lines2;
};
var emitHitArray = (hitBuffs) => {
  if (!hitBuffs.length) return [];
  const lines2 = ["          hitBuff: ["];
  for (const hit of hitBuffs) {
    lines2.push("            {");
    lines2.push("              scope: [],");
    lines2.push(`              target: '${hit.target}',`);
    lines2.push(...emitFields(hit.fields, HIT_FIELD_ORDER, "              "));
    lines2.push("            },");
  }
  lines2.push("          ],");
  return lines2;
};
var emitSpecialArray = (spRecover, spAdds) => {
  const spAddsAll = [...spRecover ? [spRecover] : [], ...spAdds];
  if (!spAddsAll.length) return [];
  const lines2 = ["          special: ["];
  for (const spAdd of spAddsAll) {
    lines2.push("            {");
    lines2.push(`              spAdd: ${numberText(spAdd)},`);
    lines2.push("            },");
  }
  lines2.push("          ],");
  return lines2;
};
var emitEffectLevel = (levelIndex, label, effect, spDelta, cdDelta, spRecover, needsDot, needsWeakness) => {
  const parts = [
    `sp: ${numberText(spDelta)}`,
    `cd: ${numberText(cdDelta)}`,
    `multiplying: ${numberText(effect.multiplying)}`
  ];
  if (effect.extraMultiplying) parts.push(`extraMultiplying: ${numberText(effect.extraMultiplying)}`);
  if (effect.mainMultiplying) parts.push(`mainMultiplying: ${numberText(effect.mainMultiplying)}`);
  if (effect.threeMultiplying) parts.push(`ThreeMultiplying: ${numberText(effect.threeMultiplying)}`);
  if (effect.lifemanship) parts.push(`lifemanship: ${numberText(effect.lifemanship)}`);
  if (effect.spNumber) parts.push(`spNumber: ${numberText(effect.spNumber)}`);
  if (effect.spExtraMultiplying) parts.push(`spExtraMultiplying: ${numberText(effect.spExtraMultiplying)}`);
  if (effect.repelling?.direction) parts.push(`repellingDirection: [${effect.repelling.direction.join(", ")}]`);
  if (effect.repelling?.distance) parts.push(`repellingDistance: ${numberText(effect.repelling.distance)}`);
  if (effect.repelling?.multiplying) parts.push(`repellingMultiplying: ${numberText(effect.repelling.multiplying)}`);
  const hasArrays = effect.buffs.length || effect.deBuffs.length || effect.dotBuffs.length || effect.hitBuffs.length || spRecover || effect.spAdds.length;
  if (!hasArrays) {
    return [`        ${levelIndex}: { ${parts.join(", ")} }, // ${label}`];
  }
  const lines2 = [`        ${levelIndex}: {`];
  for (const part of parts) lines2.push(`          ${part},`);
  lines2.push(...emitSpecialArray(spRecover, effect.spAdds));
  lines2.push(...emitHitArray(effect.hitBuffs));
  lines2.push(...emitBuffArray(effect.buffs, needsDot, needsWeakness));
  lines2.push(...emitDeBuffArray(effect.deBuffs, needsWeakness));
  lines2.push(...emitDotArray(effect.dotBuffs, needsDot));
  lines2.push("        },");
  return lines2;
};
var todoLines = (label, items) => {
  if (!items.length) return [];
  const prefix = `        // TODO ${label}\uFF1A`;
  const lines2 = [];
  let current = prefix;
  for (const item of items) {
    if (displayWidth(current + item + " | ") > 100) {
      lines2.push(current.replace(/ \| $/, ""));
      current = `        // ${"\u3000".repeat(label.length)}\u3000`;
    }
    current += `${item} | `;
  }
  lines2.push(current.replace(/ \| $/, ""));
  return lines2;
};
var generateCharacterFile = (ch, fileName) => {
  const key = fileName.replace(/\.ts$/, "");
  const lines2 = [];
  lines2.push("// \u672C\u6587\u4EF6\u7531\u300C\u89D2\u8272\u6293\u53D6\u300D\u9875\u9762\u81EA\u52A8\u751F\u6210\uFF0C\u6570\u636E\u6E90\uFF1Agamekee wiki\uFF08zsca2 \u56FE\u9274\uFF09");
  lines2.push(`// contentId: ${ch.contentId}${ch.entryId ? ` / entryId: ${ch.entryId}` : ""}`);
  if (/^char\d+$/.test(key)) {
    lines2.push("// TODO wiki \u4E0A\u6CA1\u6709\u82F1\u6587\u540D\uFF0C\u6587\u4EF6\u540D\u548C name \u6682\u65F6\u7528 contentId\uFF0C\u8BF7\u6539\u6210\u6E38\u620F\u91CC\u7684\u89D2\u8272 key");
  }
  lines2.push("// \u6CE8\u610F\uFF1A\u6280\u80FD\u8303\u56F4 scope \u7531 wiki \u8303\u56F4\u56FE\u81EA\u52A8\u8BC6\u522B\uFF0C\u63CF\u8FF0\u4E0E effect \u6570\u503C\u7531\u63CF\u8FF0\u6587\u672C\u89E3\u6790\u751F\u6210\uFF0C\u6807 TODO \u7684\u5730\u65B9\u8BF7\u4EBA\u5DE5\u590D\u6838");
  lines2.push("");
  const renders = ch.skills.map((skill, index) => {
    const first = skill.levels[0];
    const levels = skill.levels.length === 1 && skill.levels[0].label !== "+0" ? Array.from({ length: 6 }, (_, levelIndex) => ({ ...skill.levels[0], label: `+${levelIndex}` })) : skill.levels;
    const levelData = levels.map((level) => {
      const effect = extractSkillEffect(level.description);
      return { label: level.label, level, effect };
    });
    const template = levelData[0] ? scanDescription(levelData[0].level.description, createContext(levelData[0].level)) : "";
    return {
      skill,
      key: `skill${index + 1}`,
      template,
      levels: levelData,
      baseSp: first?.sp || 0,
      baseCd: first?.cd || 0
    };
  });
  const needsDot = { value: false };
  const needsWeakness = { value: false };
  for (const render of renders) {
    for (const { effect } of render.levels) {
      if (effect.dotBuffs.length) needsDot.value = true;
      if (effect.deBuffs.some((debuff) => debuff.type)) needsWeakness.value = true;
    }
  }
  const importParts = [];
  if (needsDot.value) importParts.push("dotBuffType");
  if (needsWeakness.value) importParts.push("enemyWeaknessDeBuffType");
  if (importParts.length) {
    lines2.push(`import { ${importParts.join(", ")} } from '@/utils/globals'`);
    lines2.push("");
  }
  lines2.push(`const ${key}: characterDataObj = {`);
  lines2.push(`  name: ${quote(key)},`);
  lines2.push(`  cName: ${quote(ch.cName)},`);
  lines2.push(`  star: ${ch.star}, // \u661F\u7EA7`);
  lines2.push(`  element: '${ch.element}', // \u5143\u7D20\u5C5E\u6027 light/dark/fire/wind/water`);
  lines2.push(`  attackAttribute: '${ch.attackAttribute}', // \u653B\u51FB\u5C5E\u6027 matk \u9B54\u6CD5 atk \u7269\u7406`);
  lines2.push(`  attackType: '${ch.attackType}', // \u653B\u51FB\u76EE\u6807 front \u6700\u524D skip \u8DF3\u8FC7`);
  if (ch.attackAttribute === "matk") {
    lines2.push(`  MATK: ${numberText(ch.MATK)}, // \u9B54\u6CD5\u529B`);
  } else {
    lines2.push(`  ATK: ${numberText(ch.ATK)}, // \u653B\u51FB\u529B`);
  }
  lines2.push(`  HP: ${numberText(ch.HP)}, // \u751F\u547D\u503C`);
  lines2.push(`  DEF: ${numberText(ch.DEF)}, // \u9632\u5FA1\u529B`);
  lines2.push(`  MRES: ${numberText(ch.MRES)}, // \u9B54\u6CD5\u62B5\u6297`);
  lines2.push(`  CR: ${numberText(ch.CR)}, // \u66B4\u51FB\u7387`);
  lines2.push(`  CDMG: ${numberText(ch.CDMG)}, // \u66B4\u51FB\u4F24\u5BB3`);
  lines2.push(`  DMG: ${numberText(ch.DMG)}, // \u5C5E\u6027\u4F24\u5BB3`);
  lines2.push(
    `  panel: ${numberText(ch.attackAttribute === "matk" ? ch.MATK : ch.ATK)}, // TODO \u9ED8\u8BA4\u9762\u677F\uFF0C\u88C5\u5907/\u8BCD\u6761\u52A0\u6210\u9700\u8981\u53E6\u914D`
  );
  lines2.push(`  critical: ${numberText(ch.CDMG)}, // \u9ED8\u8BA4\u7206\u4F24`);
  lines2.push(`  attributeDamage: ${numberText(ch.DMG)}, // \u9ED8\u8BA4\u5C5E\u4F24`);
  lines2.push("  engraving: {");
  lines2.push("    // \u523B\u5370");
  for (const [k, v] of Object.entries(ch.engraving)) lines2.push(`    ${k}: ${numberText(v)},`);
  lines2.push("  },");
  lines2.push("  Awakening: {");
  lines2.push("    // \u89C9\u9192");
  for (const [k, v] of Object.entries(ch.awakening)) lines2.push(`    ${k}: ${numberText(v)},`);
  lines2.push("  },");
  lines2.push("  commonSkill: {");
  lines2.push("    general: {");
  lines2.push(`      name: 'general',`);
  lines2.push(`      cName: '\u666E\u653B',`);
  lines2.push(`      target: 'enemy',`);
  lines2.push(`      sp: 0,`);
  lines2.push(`      cd: 0,`);
  lines2.push(`      chain: 1,`);
  lines2.push(`      scope: [[0, 0]],`);
  lines2.push(`      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',`);
  lines2.push(`      skillEffect: { multiplying: 100 },`);
  lines2.push("    },");
  lines2.push("  },");
  lines2.push("  // \u670D\u88C5\u6280\u80FD");
  lines2.push("  Skill: {");
  renders.forEach(({ skill, key: skillKey, template, levels, baseSp, baseCd }) => {
    const firstEffect = levels[0]?.effect || extractSkillEffect("");
    const onlyMax = skill.levels.length === 1 && skill.levels[0].label !== "+0";
    lines2.push(`    // \u670D\u88C5\uFF1A${skill.costume} / \u6280\u80FD\uFF1A${skill.skillName || skill.cName}`);
    if (onlyMax) lines2.push("    // TODO: wiki \u53EA\u7ED9\u4E86\u6EE1\u7834\u6570\u636E\uFF0C+0~+5 \u6682\u7528\u6EE1\u7834\u503C\u586B\u5145\uFF0C\u9700\u8981\u4EBA\u5DE5\u6838\u5BF9");
    lines2.push(`    ${skillKey}: {`);
    lines2.push(`      name: '${skillKey}', // TODO: wiki \u53EA\u6709\u4E2D\u6587\u540D\uFF0C\u82F1\u6587 key \u9700\u8981\u4EBA\u5DE5\u547D\u540D`);
    lines2.push(`      cName: ${quote(skill.cName)},`);
    lines2.push(`      target: '${targetOf(skill)}',`);
    lines2.push(`      sp: ${numberText(baseSp ? -baseSp : 0)},`);
    lines2.push(`      cd: ${numberText(baseCd)},`);
    lines2.push(`      chain: ${firstEffect.chain || 1},`);
    lines2.push(...scopeSource(skill.scope));
    if (skill.art) {
      lines2.push("      // \u670D\u88C5\u7ACB\u7ED8\uFF08wiki \u539F\u56FE\uFF09");
      lines2.push(...longProp("      ", "image", quote(skill.art)));
    }
    if (skill.chibi) {
      lines2.push("      // Q\u7248\u5F62\u8C61\uFF08wiki \u539F\u56FE\uFF09");
      lines2.push(...longProp("      ", "qimage", quote(skill.chibi)));
    }
    lines2.push(...longProp("      ", "description", quote(template)));
    lines2.push("      effect: {");
    levels.forEach(({ label, level, effect }, levelIndex) => {
      lines2.push(
        ...emitEffectLevel(
          levelIndex,
          label,
          effect,
          baseSp - level.sp,
          level.cd - baseCd,
          level.spRecover,
          needsDot,
          needsWeakness
        )
      );
    });
    const noteSet = /* @__PURE__ */ new Set();
    const uncertainSet = /* @__PURE__ */ new Set();
    for (const { effect } of levels) {
      effect.notes.forEach((note) => noteSet.add(note));
      effect.uncertain.forEach((item) => uncertainSet.add(item));
    }
    const lengthMismatch = (get, name) => {
      const lengths = new Set(levels.map(({ effect }) => get(effect).length));
      if (lengths.size > 1) uncertainSet.add(`\u5404\u7B49\u7EA7 ${name} \u6570\u91CF\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u4EBA\u5DE5\u6838\u5BF9`);
    };
    lengthMismatch((effect) => effect.buffs, "buff");
    lengthMismatch((effect) => effect.deBuffs, "deBuff");
    lengthMismatch((effect) => effect.dotBuffs, "dotBuff");
    lengthMismatch((effect) => effect.hitBuffs, "hitBuff");
    lines2.push(...todoLines("\u63CF\u8FF0\u91CC\u672A\u80FD\u8BC6\u522B\u7684\u6548\u679C", [...noteSet]));
    lines2.push(...todoLines("\u5F85\u4EBA\u5DE5\u590D\u6838", [...uncertainSet]));
    lines2.push("      },");
    lines2.push("      // \u6280\u80FD\u89C9\u9192\u6548\u679C");
    lines2.push("      skillPotentials: {");
    lines2.push(...potentialsSource(skill.potentials));
    lines2.push("      },");
    lines2.push(...burstSource(skill));
    lines2.push("      // \u670D\u88C5\u80FD\u529B");
    lines2.push(...abilitySource(skill));
    lines2.push("    },");
  });
  lines2.push("  },");
  lines2.push("}");
  lines2.push("");
  lines2.push(`export default ${key}`);
  lines2.push("");
  return lines2.join("\n");
};

// scripts/regenerate.ts
var DRY = process.argv.includes("--dry");
var ONLY = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7)?.toLowerCase() ?? "";
var ROOT = process.cwd();
var CHARACTER_DIR = join(ROOT, "src", "utils", "character");
var DRY_DIR = join(ROOT, "scripts", ".build", "dry");
var REPORT_PATH = join(ROOT, "scripts", "regenerate-report.txt");
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
var balancedEnd = (text, open) => {
  const opener = text[open];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === opener) depth++;
    else if (text[i] === closer) {
      depth--;
      if (!depth) return i;
    }
  }
  return -1;
};
var extractBlock = (text, marker) => {
  const at = text.indexOf(marker);
  if (at < 0) return null;
  const open = text.indexOf("{", at);
  const end = balancedEnd(text, open);
  if (end < 0) return null;
  return text.slice(at, end + 1);
};
var replaceBlock = (text, marker, replacement) => {
  const at = text.indexOf(marker);
  if (at < 0) return text;
  const open = text.indexOf("{", at);
  const end = balancedEnd(text, open);
  if (end < 0) return text;
  return text.slice(0, at) + replacement + text.slice(end + 1);
};
var splitSkillBlock = (block) => {
  const match = /^(  Skill: \{)([\s\S]*)(\n  \})$/.exec(block);
  if (!match) return { header: block, prefix: "", skills: [], tail: "" };
  const parts = match[2].split(/(?=^    \/\/ 服装：)/m);
  return { header: match[1], prefix: parts[0], skills: parts.slice(1), tail: match[3] };
};
var scopeStmtOf = (block) => {
  const at = block.indexOf("scope:");
  if (at < 0) return null;
  const open = block.indexOf("[", at);
  if (open < 0) return null;
  const close = balancedEnd(block, open);
  if (close < 0) return null;
  const lineEnd = block.indexOf("\n", close);
  return block.slice(at, lineEnd < 0 ? close + 1 : lineEnd);
};
var replaceScopeStmt = (block, newStmt) => {
  const at = block.indexOf("scope:");
  if (at < 0) return block;
  const open = block.indexOf("[", at);
  if (open < 0) return block;
  const close = balancedEnd(block, open);
  if (close < 0) return block;
  const lineEnd = block.indexOf("\n", close);
  const end = lineEnd < 0 ? close + 1 : lineEnd;
  return block.slice(0, at) + newStmt + block.slice(end);
};
var cNameOf = (block) => {
  const match = /^\s{6}cName: '([^']*)'/m.exec(block);
  return match ? match[1] : "";
};
var costumeOf = (block) => {
  const match = /^    \/\/ 服装：([^/]+)/m.exec(block);
  return match ? match[1].trim() : "";
};
var lineOf = (text, key) => text.match(new RegExp(`^  ${key}: .*$`, "m"))?.[0] ?? null;
var replaceLine = (text, key, line) => text.replace(new RegExp(`^  ${key}: .*$`, "m"), line);
var GLOBAL_ENUMS = ["dotBuffType", "enemyWeaknessDeBuffType", "specialInjuryBuffType", "damageType"];
var fixImports = (out) => {
  let text = out.replace(/^import .* from '@\/utils\/globals'\n/gm, "");
  const needed = GLOBAL_ENUMS.filter((name) => new RegExp(`\\b${name}\\b`).test(text));
  if (needed.length) {
    const importLine = `import { ${needed.join(", ")} } from '@/utils/globals'
`;
    text = text.replace(/(?=^const \w+: characterDataObj = \{)/m, `${importLine}
`);
  }
  return text;
};
var existingFiles = readdirSync(CHARACTER_DIR).filter((name) => name.endsWith(".ts")).map((name) => {
  const text = readFileSync(join(CHARACTER_DIR, name), "utf8");
  return {
    file: name,
    text,
    cName: /^\s{2}cName: '([^']*)'/m.exec(text)?.[1] ?? "",
    // 带「手工维护」标记的自动生成文件仍按 HAND 处理，Skill 块不会被覆盖
    isAuto: text.includes("\u81EA\u52A8\u751F\u6210") && !text.includes("\u624B\u5DE5\u7EF4\u62A4")
  };
});
var usedFiles = /* @__PURE__ */ new Set();
var FIELD_KEYS = [
  "name",
  "cName",
  "star",
  "element",
  "attackAttribute",
  "attackType",
  "ATK",
  "MATK",
  "HP",
  "DEF",
  "MRES",
  "CR",
  "CDMG",
  "DMG",
  "panel",
  "critical",
  "attributeDamage"
];
var fieldValues = (text) => {
  const map = {};
  for (const key of FIELD_KEYS) {
    const match = text.match(new RegExp(`^  ${key}: ('[^']*'|-?\\d+(?:\\.\\d+)?)`, "m"));
    if (match) map[key] = match[1];
  }
  return map;
};
var processCharacter = async (entry, order) => {
  const raw = await requestJson(
    `https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/${entry.contentId}.json`
  );
  if (!raw || typeof raw.content !== "string") {
    throw new Error(`\u8BE6\u60C5\u9875\u8FD4\u56DE\u5F02\u5E38\uFF1A${entry.cName}\uFF08contentId ${entry.contentId}\uFF09`);
  }
  const ch = parseCharacterDetail(raw, {
    entryId: entry.entryId,
    contentId: entry.contentId
  });
  let existing = existingFiles.find((f) => f.cName === ch.cName && !usedFiles.has(f.file));
  if (!existing) {
    const byName = existingFiles.find((f) => f.file === `${toFileName(ch)}.ts` && !usedFiles.has(f.file));
    existing = byName;
  }
  const fileName = existing ? existing.file : `${toFileName(ch)}.ts`;
  if (existing) usedFiles.add(existing.file);
  let out = generateCharacterFile(ch, fileName.replace(/\.ts$/, ""));
  let kind = "NEW";
  let scopeInfo = "-";
  let skipped = false;
  const baseDiff = [];
  const skillLines = [];
  if (existing) {
    const oldSkill = extractBlock(existing.text, "  Skill: {");
    const keepSkills = !existing.isAuto && !!oldSkill && oldSkill.includes("&-");
    if (keepSkills) {
      kind = "HAND-keep";
      skipped = true;
      skillLines.push("    \u5DF2\u4F7F\u7528 &- \u5360\u4F4D\u7B26\uFF0C\u4E14\u542B\u624B\u5DE5\u7EF4\u62A4\u6570\u636E\uFF0C\u6574\u6587\u4EF6\u4FDD\u6301\u4E0D\u53D8");
      return {
        order,
        file: fileName,
        cName: ch.cName,
        star: ch.star,
        kind,
        skillCount: ch.skills.length,
        scopeInfo,
        baseDiff,
        skillLines,
        skipped
      };
    }
    for (const key of ["panel", "critical", "attributeDamage"]) {
      const line = lineOf(existing.text, key);
      if (line) out = replaceLine(out, key, line);
    }
    const oldCommon = extractBlock(existing.text, "  commonSkill: {");
    if (oldCommon) out = replaceBlock(out, "  commonSkill: {", oldCommon);
    kind = existing.isAuto ? "AUTO" : "HAND-regen";
    const oldChunks = oldSkill ? splitSkillBlock(oldSkill).skills : [];
    const oldScopes = oldChunks.map((chunk) => ({
      costume: costumeOf(chunk),
      name: cNameOf(chunk),
      stmt: scopeStmtOf(chunk),
      used: false
    })).filter((item) => item.stmt);
    const takeScope = (chunk) => {
      const costume = costumeOf(chunk);
      const name = cNameOf(chunk);
      const byCostume = oldScopes.find((item) => !item.used && costume && item.costume === costume);
      const byName = oldScopes.find((item) => !item.used && name && item.name === name);
      const hit = byCostume || byName;
      if (hit) {
        hit.used = true;
        return hit.stmt;
      }
      return null;
    };
    const newBlock = extractBlock(out, "  Skill: {");
    const { header, prefix, skills, tail } = splitSkillBlock(newBlock ?? "");
    let matched = 0;
    const rebuilt = skills.map((chunk) => {
      const scope = takeScope(chunk);
      if (scope) {
        matched++;
        return replaceScopeStmt(chunk, scope);
      }
      return null;
    });
    const finalChunks = rebuilt.map((chunk, index) => {
      if (chunk !== null) return chunk;
      const unused = oldScopes.find((item) => !item.used);
      if (unused) {
        unused.used = true;
        matched++;
        return replaceScopeStmt(skills[index], unused.stmt);
      }
      return skills[index];
    });
    out = replaceBlock(out, "  Skill: {", header + prefix + finalChunks.join("") + tail);
    scopeInfo = `${matched}/${skills.length}`;
    const newChunks = splitSkillBlock(extractBlock(out, "  Skill: {") ?? "").skills;
    ch.skills.forEach((skill, index) => {
      const e0 = extractSkillEffect(skill.levels[0]?.description || "");
      const chunk = newChunks[index] ?? "";
      const hasPlaceholder = chunk.includes("&-");
      const onlyMax = skill.levels.length === 1 && skill.levels[0]?.label !== "+0";
      skillLines.push(
        `    \u6280\u80FD\u300C${skill.skillName || skill.cName}\u300D${onlyMax ? "(\u4EC5\u6EE1\u7834)" : ""}: buff=${e0.buffs.length} deBuff=${e0.deBuffs.length} dot=${e0.dotBuffs.length} hit=${e0.hitBuffs.length} | uncertain=${e0.uncertain.length} notes=${e0.notes.length} | \u5360\u4F4D\u7B26=${hasPlaceholder ? "\u6709" : "\u65E0"} | ${skill.levels[0]?.description?.slice(0, 50) ?? ""}`
      );
    });
    const oldValues = fieldValues(existing.text);
    const newValues = fieldValues(out);
    for (const key of FIELD_KEYS) {
      if (key === "panel" || key === "critical" || key === "attributeDamage") continue;
      if (oldValues[key] !== void 0 && oldValues[key] !== newValues[key]) {
        baseDiff.push(`${key}: ${oldValues[key]} \u2192 ${newValues[key]}`);
      }
    }
  } else {
    skillLines.push("    \u65B0\u89D2\u8272\uFF0C\u65E0\u73B0\u6709\u6587\u4EF6\uFF0C\u5168\u90E8\u6309 wiki \u751F\u6210");
  }
  out = fixImports(out);
  if (!out.endsWith("\n")) out += "\n";
  const target = DRY ? join(DRY_DIR, fileName) : join(CHARACTER_DIR, fileName);
  mkdirSync(DRY ? DRY_DIR : CHARACTER_DIR, { recursive: true });
  writeFileSync(target, out, "utf8");
  return {
    order,
    file: fileName,
    cName: ch.cName,
    star: ch.star,
    kind,
    skillCount: ch.skills.length,
    scopeInfo,
    baseDiff,
    skillLines,
    skipped
  };
};
var tree = await requestJson("https://www.gamekee.com/v1/entry/treesByPidV1?pid=194491");
var entries = parseCharacterTree(tree);
if (ONLY) {
  const cNames = new Set(
    existingFiles.filter((f) => f.file.replace(/\.ts$/, "").toLowerCase().includes(ONLY) && f.cName).map((f) => f.cName)
  );
  const filtered = entries.filter(
    (entry) => entry.cName.toLowerCase().includes(ONLY) || (entry.alias || "").toLowerCase().includes(ONLY) || cNames.has(entry.cName)
  );
  console.log(`--only=${ONLY} \u547D\u4E2D ${filtered.length} \u4E2A\u89D2\u8272`);
  entries.length = 0;
  entries.push(...filtered);
}
console.log(`wiki \u89D2\u8272\u6570\uFF1A${entries.length}\uFF0C\u6A21\u5F0F\uFF1A${DRY ? "dry\uFF08\u5199 scripts/.build/dry/\uFF09" : "\u5199\u56DE src/utils/character"}`);
var reports = [];
var failures = [];
for (let i = 0; i < entries.length; i++) {
  const entry = entries[i];
  try {
    const report = await processCharacter(entry, i + 1);
    if (report) {
      reports.push(report);
      console.log(
        `[${i + 1}/${entries.length}] [${report.kind}] ${report.file} ${report.cName} (${report.star}\u661F/${report.skillCount}\u6280\u80FD) scope=${report.scopeInfo}`
      );
    }
  } catch (error) {
    failures.push(`${entry.cName}\uFF08contentId ${entry.contentId}\uFF09\uFF1A${error.message}`);
    console.log(`[${i + 1}/${entries.length}] [FAILED] ${entry.cName}: ${error.message}`);
  }
}
var orphans = ONLY ? [] : existingFiles.filter((f) => !usedFiles.has(f.file)).map((f) => f.file);
var count = (kind) => reports.filter((r) => r.kind === kind).length;
var lines = [];
lines.push(`===== \u89D2\u8272\u6587\u4EF6\u91CD\u65B0\u751F\u6210\u62A5\u544A\uFF08${(/* @__PURE__ */ new Date()).toLocaleString("zh-CN")}\uFF09 =====`);
lines.push(`\u6A21\u5F0F\uFF1A${DRY ? "dry" : "write"} | wiki \u89D2\u8272 ${entries.length} | \u751F\u6210\u6210\u529F ${reports.length} | \u5931\u8D25 ${failures.length}`);
lines.push(
  `\u5206\u7C7B\uFF1AAUTO ${count("AUTO")} | HAND\u4FDD\u7559\u6280\u80FD ${count("HAND-keep")} | HAND\u91CD\u5EFA ${count("HAND-regen")} | \u65B0\u589E ${count("NEW")}`
);
lines.push("");
if (failures.length) {
  lines.push("---- \u5931\u8D25 ----");
  failures.forEach((item) => lines.push(`  ${item}`));
  lines.push("");
}
if (orphans.length) {
  lines.push(`---- \u5B64\u513F\u6587\u4EF6\uFF08wiki \u65E0\u5BF9\u5E94\uFF0C\u672A\u5904\u7406\uFF09----`);
  orphans.forEach((item) => lines.push(`  ${item}`));
  lines.push("");
}
lines.push("---- \u5404\u89D2\u8272 ----");
for (const r of reports) {
  lines.push(`[${r.order}] [${r.kind}] ${r.file} ${r.cName}\uFF08${r.star}\u661F\uFF09scope\u590D\u7528 ${r.scopeInfo}`);
  if (r.baseDiff.length) lines.push(`    \u57FA\u7840\u5C5E\u6027\u5DEE\u5F02: ${r.baseDiff.join(" | ")}`);
  r.skillLines.forEach((item) => lines.push(item));
}
lines.push("");
lines.push("---- \u6C47\u603B\uFF1A+0 \u7EA7 uncertain / notes \u4E0D\u4E3A\u7A7A\u7684\u6280\u80FD ----");
for (const r of reports) {
  const interesting = r.skillLines.filter(
    (line) => line.includes("uncertain=") && !/uncertain=0 notes=0/.test(line)
  );
  if (interesting.length) {
    lines.push(`[${r.file}]`);
    interesting.forEach((item) => lines.push(item));
  }
}
writeFileSync(REPORT_PATH, lines.join("\n") + "\n", "utf8");
console.log(`
\u62A5\u544A\u5DF2\u5199\u5165 ${REPORT_PATH}`);
console.log(`\u5206\u7C7B\uFF1AAUTO ${count("AUTO")} | HAND\u4FDD\u7559\u6280\u80FD ${count("HAND-keep")} | HAND\u91CD\u5EFA ${count("HAND-regen")} | \u65B0\u589E ${count("NEW")} | \u5931\u8D25 ${failures.length} | \u5B64\u513F ${orphans.length}`);
if (orphans.length) console.log(`\u5B64\u513F\u6587\u4EF6\uFF1A${orphans.join(", ")}`);

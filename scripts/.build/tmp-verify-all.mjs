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

// src/utils/utils.ts
var specialKey = [
  "buff",
  "special",
  "aureole",
  "deBuff",
  "specialInjuryBuff",
  "hitBuff",
  "dotBuff"
];
var scopeKey = ["scope", "repellingDirection", "removeBuffList", "condition"];
function replacePathPlaceholders(str, data, breakthrough, potentials = {}, bursts2 = {}, prefix = "&-", suffix = "-&") {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escapedPrefix}(.*?)${escapedSuffix}`, "g");
  return str.replace(regex, (match, path) => {
    const value = getValueByPath(data, path.trim(), breakthrough, potentials, bursts2);
    return value !== void 0 ? String(Math.abs(Number(value))) : match;
  });
}
function getValueByPath(obj, path, breakthrough = 0, potentials = {}, bursts2 = {}, separator = "/") {
  if (!obj || typeof obj !== "object" || !path) {
    return void 0;
  }
  const pathList = path.split(separator);
  let current = void 0;
  let potentialsCurrent = void 0;
  pathList.forEach((item, index) => {
    if (item in potentials) {
      if (specialKey.includes(item)) {
        if (potentials[item][pathList[index + 1]]) {
          const buff = potentials[item][pathList[index + 1]][pathList[pathList.length - 1]];
          potentialsCurrent = buff || 0;
        }
      } else {
        potentialsCurrent = potentials[item];
      }
    }
    if (item in bursts2) {
      potentialsCurrent = (potentialsCurrent || 0) + (bursts2[item] || 0);
    }
    if (item === "effect") {
      const effectObj = obj[item]?.[breakthrough];
      current = effectObj;
    } else if (current && typeof current === "object" && item in current) {
      current = current[item];
    } else if (item in obj) {
      const keyString = item;
      current = obj[keyString];
    } else {
      current = void 0;
    }
  });
  return (current || 0) + (potentialsCurrent || 0);
}
function conversionDescription(skillData, breakthrough = 0, potentials = {}, bursts2 = {}) {
  let description = skillData.description;
  const potentialsObj = JSON.parse(JSON.stringify(potentials));
  for (const extra in potentials) {
    if (Array.isArray(potentialsObj[extra])) {
      potentialsObj[extra].forEach((item) => {
        if (!!item && item.extra === 1) {
          description = description + item.extraDescription;
        }
      });
    }
  }
  return replacePathPlaceholders(description, skillData, breakthrough, potentials, bursts2);
}
function conversionScopeCommon(data, key, breakthrough = 0, potentials = {}) {
  const toArray = (v) => Array.isArray(v) ? v : v !== void 0 && v !== null ? [v] : [];
  const baseArr = toArray(data[key]);
  const potArr = toArray(potentials[key]);
  const effectByBreak = data["effect"]?.[breakthrough];
  const effArr = toArray(effectByBreak?.[key]);
  return [...baseArr, ...potArr, ...effArr || []];
}
function setPotentials(checkList, skillPotentials) {
  const tempPotentials = {};
  checkList.forEach((item) => {
    const itemKey = String(item);
    const potItem = skillPotentials[itemKey];
    if (potItem && typeof potItem === "object") {
      const potRecord = potItem;
      for (const value in potRecord) {
        const val = potRecord[value];
        if (value !== "description" && !scopeKey.includes(value) && !specialKey.includes(value)) {
          tempPotentials[value] = (tempPotentials[value] || 0) + (Number(val) || 0);
        } else if (specialKey.includes(value)) {
          const keyList = Object.keys(val);
          if (!keyList.includes("extra")) {
            for (const buffValue in val) {
              if (buffValue !== "index") {
                const index = val.index;
                if (!tempPotentials[value]) {
                  tempPotentials[value] = [];
                }
                if (!tempPotentials[value][index]) {
                  tempPotentials[value][index] = {};
                }
                tempPotentials[value][index][buffValue] = (tempPotentials[value][index][buffValue] || 0) +  
                val[buffValue];
                if (tempPotentials[value].length === 0) {
                  delete tempPotentials[value];
                }
              }
            }
          } else {
            const index = val.index;
            const tempData = JSON.parse(JSON.stringify(val));
            delete tempData.index;
            if (!!tempPotentials[value]) {
              tempPotentials[value][index] = tempData;
            } else {
              Reflect.set(tempPotentials, value, []);
              tempPotentials[value][index] = tempData;
            }
          }
        } else if (scopeKey.includes(value)) {
          tempPotentials[value] = [...tempPotentials[value] || [], ...val || []];
        }
      }
    }
  });
  return tempPotentials;
}
var BURST_MERGE_KEYS = ["multiplying", "extraMultiplying", "attackAdd"];
function setBursts(checkList, burstList) {
  const tempBursts = {};
  checkList.forEach((item) => {
    const burst = burstList[String(item)];
    if (burst && typeof burst === "object") {
      for (const key of BURST_MERGE_KEYS) {
        if (burst[key] !== void 0) {
          tempBursts[key] = (tempBursts[key] || 0) + (Number(burst[key]) || 0);
        }
      }
    }
  });
  return tempBursts;
}

// src/utils/character/ancilla.ts
var ancilla = {
  name: "ancilla",
  cName: "\u963F\u5947\u62C9",
  star: 5,
  // 星级
  element: "fire",
  // 元素属性 light/dark/fire/wind/water
  attackAttribute: "atk",
  // 攻击属性 matk 魔法 atk 物理
  attackType: "skip",
  // 攻击目标 front 最前 skip 跳过
  ATK: 352,
  // 攻击力
  HP: 2100,
  // 生命值
  DEF: 0,
  // 防御力
  MRES: 0,
  // 魔法抵抗
  CR: 10,
  // 暴击率
  CDMG: 50,
  // 暴击伤害
  DMG: 50,
  // 属性伤害
  panel: 352,
  // TODO 默认面板，装备/词条加成需要另配
  critical: 50,
  // 默认爆伤
  attributeDamage: 50,
  // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    ATK: 34,
    DEF: 8
  },
  Awakening: {
    // 觉醒
    PATK: 12,
    DMG: 10
  },
  commonSkill: {
    general: {
      name: "general",
      cName: "\u666E\u653B",
      target: "enemy",
      sp: 0,
      cd: 0,
      chain: 1,
      scope: [[0, 0]],
      image: "https://www.souseihaku.com/common/svg/icon_atk.svg",
      skillEffect: { multiplying: 100 }
    }
  },
  // 服装技能
  Skill: {
    // 服装：战场猛兽 / 技能：战场狂喜
    skill1: {
      name: "skill1",
      // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: "\u6218\u573A\u731B\u517D",
      target: "enemy",
      sp: -5,
      cd: 9,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [-1, -2],
        [-1, -1],
        [-2, -1],
        [-1, 0],
        [1, 0],
        [2, -1],
        [1, -1],
        [1, -2]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image: "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_1233/h_1505/497891/2026/7/25/53302409mt8fz762.png",
      // Q版形象（wiki 原图）
      qimage: "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/7/27/27528619mtb4ngqj.png",
      description: "&-effect/buff/0/duration-&\u56DE\u5408\u5185\uFF0C\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u4E3A\u81EA\u5DF1\u9644\u52A0\u6301\u7EED&-effect/hitBuff/0/duration-&\u56DE\u5408\u653B\u51FB\u529B\u589E\u52A0&-effect/hitBuff/0/attackAdd-&%\u7684\u6548\u679C\u3002\u6B64\u6548\u679C\u53E0\u52A0\u81F3&-effect/hitBuff/0/increasingNumber-&\u3002\u6700\u591A\u53EF\u53E0\u52A0\u81F3&-effect/hitBuff/0/maxNumber-&\u3002&-effect/buff/1/duration-&\u56DE\u5408\u5185\uFF0C\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u5F53\u524D\u670D\u88C5\u7684\u51B7\u5374\u65F6\u95F4\u51CF\u5C11&-effect/hitBuff/1/cdReduce-&\u3002\u653B\u51FB\u654C\u4EBA&-chain-&\u6B21\uFF0C\u6BCF\u6B21\u653B\u51FB\u65F6\uFF0C\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/multiplying-&%\u7684\u7269\u7406\u4F24\u5BB3\u3002",
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 15,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 200,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 15,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 250,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 15,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 250,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 21,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 21,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          buff: [
            {
              duration: 4,
              scope: [[0, 0]],
              hit: 1
            },
            {
              duration: 2,
              scope: [[0, 0]],
              hit: 1
            }
          ],
          hitBuff: [
            {
              scope: [],
              target: "friendly",
              duration: 4,
              attackAdd: 27,
              increasingNumber: 1,
              maxNumber: 99
            },
            {
              scope: [],
              target: "friendly",
              cdReduce: 2
            }
          ]
        }
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          attackAdd: 3,
          description: "\u653B\u51FB\u529B+3%"
        },
        potentials2: {
          multiplying: 25,
          description: "\u4F24\u5BB3\u91CF+25%"
        },
        potentials3: {
          multiplying: 25,
          description: "\u4F24\u5BB3\u91CF+25%"
        }
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1,
          // 消耗SP
          description: "\u4F24\u5BB3\u91CF+125%",
          multiplying: 125
          // 伤害倍率增加
        },
        burst2: {
          sp: 1,
          // 消耗SP
          description: "\u4F24\u5BB3\u91CF+125%",
          multiplying: 125
          // 伤害倍率增加
        },
        burst3: {
          sp: 1,
          // 消耗SP
          description: "[\u989D\u5916\u80FD\u529B]\u83B7\u5F97\u76F8\u5F53\u4E8E\u653B\u51FB\u529B200%\u7684\u80FD\u91CF\u62A4\u76FE\uFF0C\u6301\u7EED2\u56DE\u5408\u3002",
          shield: 200,
          // 能量护盾（自身攻击力百分比）
          duration: 2
          // 持续回合
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PATK: 52,
          DMG: 30
        }
      }
    },
    // 服装：被封印的欲望 / 技能：狩猎时间到！
    skill2: {
      name: "skill2",
      // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: "\u88AB\u5C01\u5370\u7684\u6B32\u671B",
      target: "enemy",
      sp: -5,
      cd: 5,
      chain: 2,
      scope: [
        [0, 0],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image: "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_2048/h_2048/497891/2026/9/22/76496014mvj4w0ot.png",
      // Q版形象（wiki 原图）
      qimage: "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/9/10/94165154mv23wx2r.png",
      description: "\u6D88\u8017\u81EA\u8EAB\u5F53\u524D\u751F\u547D\u503C\u768495%\uFF0C\u5E76\u4F7F\u81EA\u8EAB\u5C5E\u6027\u4F24\u5BB3\u5728&-effect/buff/0/duration-&\u56DE\u5408\u5185\u589E\u52A0&-effect/buff/0/attributeDamage-&%\u3002\u4E3A\u81EA\u8EAB\u65BD\u52A0\u6301\u7EED2\u56DE\u5408\u7684\u6062\u590D\u6280\u80FD\u6548\u679C\u514D\u75AB\u3002\u6B64\u6548\u679C\u4E0D\u4F1A\u56E0\u4E3A\u89E3\u9664\u6548\u679C\u800C\u6D88\u5931\u3002\u653B\u51FB\u654C\u4EBA&-chain-&\u6B21\uFF0C\u6BCF\u6B21\u653B\u51FB\u65F6\uFF0C\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/multiplying-&%\u7684\u7269\u7406\u4F24\u5BB3 \u3002",
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 350,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 350,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 380,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 410,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 440,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 470,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [[0, 0]]
            }
          ]
        }
        // TODO 描述里未能识别的效果：消耗自身当前生命值的95%，并 | 为自身施加持续
        // 　　　　　　　　　　　的恢复技能效果免疫 | 此效果不会因为解除效果而消失
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: "\u51B7\u5374\u65F6\u95F4-2\u56DE\u5408"
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: "\u5C5E\u6027\u4F24\u5BB3\u589E\u52A0+2\u56DE\u5408"
        },
        potentials3: {
          multiplying: 30,
          description: "\u4F24\u5BB3\u91CF+30%"
        }
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1,
          // 消耗SP
          description: "\u6280\u80FD\u8303\u56F4\u6269\u5927",
          scope: [[0, 0]]
          // TODO: 范围图没解析出来，请人工确认命中范围
        },
        burst2: {
          sp: 1,
          // 消耗SP
          description: "[\u989D\u5916\u80FD\u529B]\u81EA\u8EAB\u7684\u9632\u5FA1\u529B\u4E0E\u9B54\u6CD5\u62B5\u6297\u964D\u4F4E50%\uFF0C\u6301\u7EED2\u56DE\u5408\u3002\u81EA\u8EAB\u83B7\u5F97200%\u7684\u589E\u5F3A\u6548\u679C\uFF0C\u6301\u7EED4\u56DE\u5408\u3002"
        },
        burst3: {
          sp: 1,
          // 消耗SP
          description: "\u4F24\u5BB3\u91CF+200%"
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2
        },
        Bonding: {
          // 绑定属性
          PATK: 66.2,
          CDMG: 47.2
        }
      }
    }
  }
};
var ancilla_default = ancilla;

// src/utils/character/venaka.ts
var venaka = {
  name: "venaka",
  cName: "\u8D1D\u90A3\u5361",
  star: 5,
  // 星级
  element: "wind",
  // 元素属性 light/dark/fire/wind/water
  attackAttribute: "matk",
  // 攻击属性 matk 魔法 atk 物理
  attackType: "front",
  // 攻击目标 front 最前 skip 跳过
  MATK: 363,
  // 魔法力
  HP: 1785,
  // 生命值
  DEF: 0,
  // 防御力
  MRES: 10,
  // 魔法抵抗
  CR: 10,
  // 暴击率
  CDMG: 75,
  // 暴击伤害
  DMG: 50,
  // 属性伤害
  panel: 363,
  // TODO 默认面板，装备/词条加成需要另配
  critical: 75,
  // 默认爆伤
  attributeDamage: 50,
  // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    MATK: 34,
    MRES: 8
  },
  Awakening: {
    // 觉醒
    PMATK: 12,
    DMG: 10
  },
  commonSkill: {
    general: {
      name: "general",
      cName: "\u666E\u653B",
      target: "enemy",
      sp: 0,
      cd: 0,
      chain: 1,
      scope: [[0, 0]],
      image: "https://www.souseihaku.com/common/svg/icon_atk.svg",
      skillEffect: { multiplying: 100 }
    }
  },
  // 服装技能
  Skill: {
    // 服装：DJ / 技能：站起来，音乐响起！
    skill1: {
      name: "skill1",
      // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: "DJ",
      target: "enemy",
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image: "https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/586749.png",
      // Q版形象（wiki 原图）
      qimage: "https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/681252.png",
      description: "&-effect/deBuff/0/duration-&\u56DE\u5408\u5185\uFF0C\u654C\u4EBA\u9B54\u6CD5\u62B5\u6297\u51CF\u5C11&-effect/deBuff/0/MRESReduce-&%\u3002\u5BF9\u654C\u4EBA\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u9B54\u6CD5\u529B&-effect/multiplying-&%\u7684\u9B54\u6CD5\u4F24\u5BB3\u3002",
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 500,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 600,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 700,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 800,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 900,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: []
            }
          ]
        }
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: "\u4F24\u5BB3\u91CF+100%"
        },
        potentials2: {
          cd: -2,
          description: "\u51B7\u5374\u65F6\u95F4-2\u56DE\u5408"
        },
        potentials3: {
          description: "\u6280\u80FD\u8303\u56F4\u6269\u5927",
          scope: [
            [0, 2],
            [-2, 0],
            [2, 0],
            [0, -2]
          ]
        }
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2,
          // 消耗SP
          description: "\u3010\u989D\u5916\u80FD\u529B\u30114\u56DE\u5408\u5185\uFF0C\u81EA\u8EAB\u9B54\u6CD5\u529B\u5F3A\u5316100%\uFF0C\u51B7\u5374\u51CF2\u56DE\u5408\u3002"
        },
        burst2: {
          sp: 1,
          // 消耗SP
          description: "\u4F24\u5BB3\u91CF+150%"
        },
        burst3: {
          sp: 1,
          // 消耗SP
          description: "\u4F24\u5BB3\u91CF+150%"
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2
        },
        Bonding: {
          // 绑定属性
          PMATK: 14.2,
          CDMG: 104,
          DMG: 30
        }
      }
    },
    // 服装：风之舞姬 / 技能：清风之舞
    skill2: {
      name: "skill2",
      // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: "\u98CE\u4E4B\u821E\u59EC",
      target: "enemy",
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [[0, 0]],
      // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image: "https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/100501.png",
      // Q版形象（wiki 原图）
      qimage: "https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/411646.png",
      description: "4\u56DE\u5408\u5185\uFF0C\u5BF9\u654C\u4EBA\u5E94\u752875%\u7684\u98CE\u5C5E\u6027\u865A\u5F31\u6548\u679C\u3002\u5BF9\u654C\u4EBA\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u9B54\u6CD5\u529B&-effect/multiplying-&%\u7684\u9B54\u6CD5\u4F24\u5BB3\u3002",
      effect: {
        0: { sp: 0, cd: 0, multiplying: 200 },
        // +0
        1: { sp: 1, cd: 0, multiplying: 200 },
        // +1
        2: { sp: 1, cd: 0, multiplying: 250 },
        // +2
        3: { sp: 1, cd: 0, multiplying: 250 },
        // +3
        4: { sp: 1, cd: 0, multiplying: 300 },
        // +4
        5: { sp: 1, cd: 0, multiplying: 350 }
        // +5
        // TODO 描述里未能识别的效果：，对敌人应用75%的风属性虚弱效果
        // 　　　　　　　　　　　，对敌人应用125%的风属性虚弱效果
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 25,
          description: "\u4F24\u5BB3\u91CF+25%"
        },
        potentials2: {
          multiplying: 25,
          description: "\u4F24\u5BB3\u91CF+25%"
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: "\u98CE\u5C5E\u6027\u865A\u5F31\u6548\u679C+25%"
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2
        },
        Bonding: {
          // 绑定属性
          PMATK: 52,
          CDMG: 28.4,
          DMG: 30
        }
      }
    }
  }
};
var venaka_default = venaka;

// src/utils/character/blade.ts
var blade = {
  name: "blade",
  cName: "\u5E03\u83B1\u5FB7",
  star: 5,
  // 星级
  element: "dark",
  attackAttribute: "atk",
  // 攻击属性 matk 魔法 atk为物理
  ATK: 429,
  // 攻击力
  HP: 1050,
  // 生命值
  DEF: 0,
  // 防御力
  MRES: 0,
  // 魔法抵抗
  CR: 10,
  // 暴击率
  CDMG: 75,
  // 暴击伤害
  DMG: 50,
  // 属性伤害
  panel: 2438,
  critical: 667.08,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243,
    // 生命值
    ATK: 34,
    // 攻击力
    DEF: 8
    // 防御力
  },
  Awakening: {
    // 觉醒
    PATK: 12,
    // 百分比攻击力
    DMG: 10
    // 属性伤害
  },
  attackType: "front",
  // 攻击类型 front为最前 skip为跳过
  commonSkill: {
    general: {
      name: "general",
      cName: "\u666E\u653B",
      target: "enemy",
      cd: 0,
      sp: 0,
      chain: 1,
      scope: [[0, 0]],
      image: "https://www.souseihaku.com/common/svg/icon_atk.svg",
      skillEffect: {
        multiplying: 100
      }
    }
  },
  // 服装技能
  Skill: {
    apostle: {
      name: "apostle",
      cName: "\u4F7F\u8005",
      target: "enemy",
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [-1, 1],
        [1, 1]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: "Blade_1_idle",
      // 图片形象
      qimage: "Blade_1_idle",
      // q版形象
      description: "\u81EA\u8EAB\u906D\u53D7\u653B\u51FB\u65F6\uFF0C\u5C06\u8FDB\u884C\u53CD\u51FB\u3002\u6BCF\u6B21\u53CD\u51FB\u65F6\uFF0C\u5BF9\u654C\u4EBA\u5168\u4F53\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/hitBuff/0/hitMultiplying-&%\u7684\u7269\u7406\u4F24\u5BB3\u3002\u6B64\u6548\u679C\u5728\u906D\u53D7&-effect/hitBuff/0/triggerCount-&\u6B21\u653B\u51FB\u540E\u5C06\u6D88\u5931\u3002\u5BF9\u654C\u4EBA\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/multiplying-&%\u7684\u7269\u7406\u4F24\u5BB3\u3002",
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 300,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 100,
              triggerCount: 8
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 380,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 120,
              triggerCount: 8
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 380,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 120,
              triggerCount: 10
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 460,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 140,
              triggerCount: 10
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 540,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 160,
              triggerCount: 10
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 620,
          hitBuff: [
            {
              scope: [],
              target: "enemy",
              hitMultiplying: 180,
              triggerCount: 10
              // 可触发次数
            }
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1
            }
          ]
        }
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 80,
          description: "\u4F24\u5BB3\u589E\u52A080%"
        },
        potentials2: {
          hitBuff: {
            index: 0,
            hitMultiplying: 20
          },
          description: "\u53CD\u51FB\u4F24\u5BB3\u589E\u52A020%"
        },
        potentials3: {
          sp: 1,
          description: "sp\u6D88\u8017\u91CF\u51CF\u5C111"
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2
          // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          // 攻击力
          DEF: 5,
          // 防御
          CDMG: 47.2
          // 爆伤
        }
      }
    },
    youngLady: {
      name: "youngLady",
      cName: "\u5C0F\u516C\u4E3B",
      target: "enemy",
      sp: -5,
      cd: 3,
      chain: 4,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1],
        [-1, 1],
        [1, 1]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: "Blade_2_idle",
      // 图片形象
      qimage: "Blade_2_idle",
      // q版形象
      description: "\u653B\u51FB\u654C\u4EBA&-chain-&\u6B21\uFF0C\u6BCF\u6B21\u653B\u51FB\u65F6\uFF0C\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/multiplying-&%\u7684\u7269\u7406\u4F24\u5BB3\u3002&-effect/deBuff/0/duration-&\u56DE\u5408\u5185\uFF0C\u5BF9\u4E3B\u8981\u76EE\u6807\u654C\u4EBA\u5E94\u7528&-effect/deBuff/0/mainEnemyWeakness-&%\u7684\u7269\u7406\u865A\u5F31\u6548\u679C\u3002",
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 100
            }
          ]
        },
        1: {
          sp: -1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 100
            }
          ]
        },
        2: {
          sp: -1,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 110
            }
          ]
        },
        3: {
          sp: -1,
          cd: 0,
          multiplying: 90,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 120
            }
          ]
        },
        4: {
          sp: -1,
          cd: 0,
          multiplying: 110,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 130
            }
          ]
        },
        5: {
          sp: -1,
          cd: 0,
          multiplying: 130,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: 1 /* fragility */,
              attribute: "atk",
              delay: 1,
              mainEnemyWeakness: 140
            }
          ]
        }
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: "\u6BCF\u6B21\u653B\u51FB\u7684\u6280\u80FD\u4F24\u5BB3\u589E\u52A020%"
        },
        potentials2: {
          deBuff: {
            index: 0,
            mainEnemyWeakness: 10
          },
          description: "\u865A\u5F31\u6548\u679C\u589E\u52A010%"
        },
        potentials3: {
          description: "\u8303\u56F4\u589E\u52A0",
          scope: [
            [0, 2],
            [-1, 2],
            [1, 2]
          ]
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2
          // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PATK: 52,
          // 百分比攻击力
          DMG: 30
        }
      }
    },
    // 服装：温泉剑客 / 技能：皎月流辉
    moonlight: {
      name: "moonlight",
      cName: "\u6E29\u6CC9\u5251\u5BA2",
      target: "enemy",
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1]
      ],
      // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: "Blade_3_idle",
      // 图片形象
      qimage: "Blade_3_idle",
      // q版形象
      description: "\u5BF9\u654C\u4EBA\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B&-effect/multiplying-&%\u7684\u7269\u7406\u4F24\u5BB3\u3002\u6B64\u65F6\uFF0C\u654C\u65B9\u7684\u51CF\u76CA\u6548\u679C\u6570\u91CF\u6BCF\u589E\u52A01\u4E2A\u65F6\uFF0C\u5C06\u989D\u5916\u589E\u52A0\u76F8\u5F53\u4E8E\u653B\u51FB\u529B&-effect/extraMultiplying-&%\u7684\u4F24\u5BB3\u91CF\u3002",
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 350,
          extraMultiplying: 70
        },
        1: {
          sp: -1,
          cd: 0,
          multiplying: 350,
          extraMultiplying: 70
        },
        2: {
          sp: -1,
          cd: 0,
          multiplying: 425,
          extraMultiplying: 70
        },
        3: {
          sp: -1,
          cd: 0,
          multiplying: 425,
          extraMultiplying: 90
        },
        4: {
          sp: -1,
          cd: 0,
          multiplying: 500,
          extraMultiplying: 90
        },
        5: {
          sp: -1,
          cd: 0,
          multiplying: 500,
          extraMultiplying: 110
        }
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: "\u4F24\u5BB3\u500D\u7387+50%"
        },
        potentials2: {
          multiplying: 50,
          description: "\u4F24\u5BB3\u500D\u7387+50%"
        },
        potentials3: {
          extraMultiplying: 10,
          description: "\u989D\u5916\u4F24\u5BB3\u500D\u7387+10%"
        }
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2
          // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PATK: 66.2,
          // 百分比攻击力
          CDMG: 47.2
          // 爆伤
        }
      }
    }
  }
};
var blade_default = blade;

// scripts/tmp-verify-all.ts
var wikiDesc = "4\u56DE\u5408\u5185\uFF0C\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u4E3A\u81EA\u5DF1\u9644\u52A0\u6301\u7EED4\u56DE\u5408\u653B\u51FB\u529B\u589E\u52A015%\u7684\u6548\u679C\u3002\u6B64\u6548\u679C\u53E0\u52A0\u81F31\u3002\u6700\u591A\u53EF\u53E0\u52A0\u81F399\u30022\u56DE\u5408\u5185\uFF0C\u81EA\u8EAB\u53D7\u5230\u653B\u51FB\u65F6\uFF0C\u5F53\u524D\u670D\u88C5\u7684\u51B7\u5374\u65F6\u95F4\u51CF\u5C112\u3002\u653B\u51FB\u654C\u4EBA3\u6B21\uFF0C\u6BCF\u6B21\u653B\u51FB\u65F6\uFF0C\u9020\u6210\u76F8\u5F53\u4E8E\u81EA\u8EAB\u653B\u51FB\u529B200%\u7684\u7269\u7406\u4F24\u5BB3\u3002";
var e = extractSkillEffect(wikiDesc);
console.log("===== 1. ancilla wiki \u63CF\u8FF0\u626B\u63CF =====");
console.log("chain:", e.chain, "multiplying:", e.multiplying);
console.log("buffs:", JSON.stringify(e.buffs));
console.log("hitBuffs:", JSON.stringify(e.hitBuffs));
console.log("notes:", JSON.stringify(e.notes), "uncertain:", JSON.stringify(e.uncertain));
var ancillaSkill = ancilla_default.Skill.skill1;
var pots = setPotentials(["potentials1", "potentials2", "potentials3"], ancillaSkill.skillPotentials);
var bursts = setBursts(["burst1", "burst2", "burst3"], ancillaSkill.burst);
console.log("\n===== 2. ancilla \u6218\u573A\u72C2\u559C\u89E3\u6790 =====");
console.log("+0 \u65E0\u7206\u53D1:", conversionDescription(ancillaSkill, 0, {}));
console.log("+5 \u6EE1\u89C9\u9192\u6EE1\u7206\u53D1:", conversionDescription(ancillaSkill, 5, pots, bursts));
console.log("+5 \u53EA\u9009\u7206\u53D11:", conversionDescription(ancillaSkill, 5, pots, setBursts(["burst1"], ancillaSkill.burst)));
console.log("scope:", JSON.stringify(ancillaSkill.scope));
var venakaSkill = venaka_default.Skill.skill1;
var venakaPots = setPotentials(["potentials3"], venakaSkill.skillPotentials);
console.log("\n===== 3. venaka DJ \u8303\u56F4\u5408\u5E76 =====");
console.log("\u57FA\u7840:", JSON.stringify(conversionScopeCommon(venakaSkill, "scope", 0, {})));
console.log("+\u6F5C\u529B3:", JSON.stringify(conversionScopeCommon(venakaSkill, "scope", 0, venakaPots)));
var bladeSkill = blade_default.Skill.moonlight;
var bladePots = setPotentials(["potentials1", "potentials2", "potentials3"], bladeSkill.skillPotentials);
console.log("\n===== 4. blade \u6E29\u6CC9\u5251\u5BA2 =====");
console.log("+0:", conversionDescription(bladeSkill, 0, {}));
console.log("+5 \u6EE1\u89C9\u9192:", conversionDescription(bladeSkill, 5, bladePots));
console.log("sp/cd +5:", -(5 - 1), "/", 5, "| scope:", JSON.stringify(bladeSkill.scope));

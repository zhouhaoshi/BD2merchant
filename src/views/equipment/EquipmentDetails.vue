<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="data ? `${data.name} - 装备详情` : '装备详情'"
    width="680px"
    top="6vh"
    :before-close="BeforeClose"
  >
    <div v-if="data" class="equipment_details">
      <!-- 头部：立绘 + 基本信息 -->
      <div class="detail_header">
        <el-image
          class="detail_icon"
          :src="equipmentImageUrl(data.icon)"
          fit="contain"
          :preview-src-list="[equipmentImageUrl(data.icon)]"
          preview-teleported
          hide-on-click-modal
        >
          <template #error>
            <div class="img_placeholder"><img :src="placeholderImg" alt="" /></div>
          </template>
        </el-image>
        <div class="detail_info">
          <div class="detail_name">{{ data.name }}</div>
          <div class="detail_role" v-if="data.roleName">
            <el-image class="role_avatar" :src="equipmentImageUrl(data.roleAvatar)" fit="cover">
              <template #error>
                <div class="img_placeholder small"><img :src="placeholderImg" alt="" /></div>
              </template>
            </el-image>
            <span>{{ data.roleName }} 专属</span>
          </div>
          <div class="detail_tags">
            <span class="tag" :style="tagStyle(partMeta[data.part])">
              {{ partMeta[data.part]?.label || data.part }}
            </span>
            <span class="tag" :style="tagStyle(typeMeta[data.type])">
              {{ typeMeta[data.type]?.label || data.type }}
            </span>
          </div>
        </div>
      </div>

      <!-- 主属性 -->
      <div v-if="data.mainAttr" class="detail_section">
        <div class="title">主属性</div>
        <el-descriptions :column="1" border>
          <el-descriptions-item v-if="data.mainAttr.zynl" label="主词条">
            {{ data.mainAttr.zynl }}
          </el-descriptions-item>
          <el-descriptions-item v-if="data.mainAttr.jbnl1" label="基本能力 1">
            {{ data.mainAttr.jbnl1 }}
          </el-descriptions-item>
          <el-descriptions-item v-if="data.mainAttr.jbnl2" label="基本能力 2">
            {{ data.mainAttr.jbnl2 }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 等级属性 -->
      <div v-if="gradeList.length" class="detail_section">
        <div class="title">等级属性</div>
        <div class="grade_grid">
          <div v-for="grade in gradeList" :key="grade.label" class="burst_box">
            <div class="burst_name">{{ grade.label }}</div>
            <div class="burst_rows">
              <div v-if="grade.attr.zynl" class="burst_row">
                <span>主词条</span>{{ grade.attr.zynl }}
              </div>
              <div v-if="grade.attr.jbnl1" class="burst_row">
                <span>基本能力 1</span>{{ grade.attr.jbnl1 }}
              </div>
              <div v-if="grade.attr.jbnl2" class="burst_row">
                <span>基本能力 2</span>{{ grade.attr.jbnl2 }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评分（UR4 传说 / 专武 UR 才展示，评分为基本能力的额外加成） -->
      <div v-if="showScore" class="detail_section">
        <div class="title">
          评分
          <span class="score_badge">{{ score }} / 24</span>
        </div>
        <div class="score_slider">
          <el-slider v-model="score" :min="6" :max="24" :step="1" show-stops />
        </div>
        <div class="score_grid">
          <div class="score_item">
            <span>固定攻击</span><b>{{ scoreAttr.atk }}</b>
          </div>
          <div class="score_item">
            <span>百分比攻击</span><b>{{ scoreAttr.patk }}%</b>
          </div>
          <div class="score_item">
            <span>暴击伤害</span><b>{{ scoreAttr.critical }}%</b>
          </div>
          <div class="score_item">
            <span>物抗</span><b>{{ scoreAttr.def }}</b>
          </div>
          <div class="score_item">
            <span>魔抗</span><b>{{ scoreAttr.mdef }}</b>
          </div>
          <div class="score_item">
            <span>固定生命</span><b>{{ scoreAttr.hp }}</b>
          </div>
          <div class="score_item">
            <span>百分比生命</span><b>{{ scoreAttr.php }}%</b>
          </div>
          <div class="score_item">
            <span>暴击率</span><b>{{ scoreAttr.criticalRate }}%</b>
          </div>
        </div>
        <div class="score_note">评分为装备基本能力的额外加成</div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { equipmentImageUrl } from '@/utils/equipment'
import { setEnhancementValue } from '@/utils/utils'
import placeholderImg from '@/assets/img/icon_resource60005_88.webp'

const props = defineProps(['dialogVisible', 'data'])
const emit = defineEmits(['close'])

const BeforeClose = () => {
  emit('close')
}

/** 部位 / 类型的展示元数据 */
const partMeta: Record<string, { label: string; color: string }> = {
  武器: { label: '武器', color: '#b45309' },
  盔甲: { label: '盔甲', color: '#334155' },
  头盔: { label: '头盔', color: '#0e7490' },
  饰品: { label: '饰品', color: '#c9a45c' },
  手套: { label: '手套', color: '#4d7c0f' },
}
const typeMeta: Record<string, { label: string; color: string }> = {
  制作: { label: '制作', color: 'var(--app-primary)' },
  专用: { label: '专用', color: 'var(--app-gold)' },
  魔兽: { label: '魔兽', color: '#7c3aed' },
}

/** 生成标签色（通过 CSS 变量 --tag-color 传递） */
const tagStyle = (meta?: { label: string; color: string }) =>
  `--tag-color: ${meta?.color || 'var(--app-text-weak)'}`

/** 等级属性的展示顺序与标签 */
const gradeLabels: Record<string, string> = {
  sr: 'SR',
  ur1: '一般',
  ur2: '高级',
  ur3: '顶级',
}
const gradeList = computed(() => {
  const other = (props.data as equipmentDataObj | undefined)?.otherAttr
  if (!other) return []
  return (Object.keys(gradeLabels) as (keyof equipmentOtherAttrObj)[])
    .filter((key) => other[key])
    .map((key) => ({ label: gradeLabels[key], attr: other[key] as equipmentMainAttrObj }))
})

/* ===== 评分（UR4 传说 / 专武 UR 才展示） ===== */
const score = ref(6)
const scoreAttr = computed(() => setEnhancementValue(score.value))
const showScore = computed(() => {
  const type = (props.data as equipmentDataObj | undefined)?.type
  return type === '制作' || type === '专用'
})
watch(
  () => props.dialogVisible,
  (visible) => {
    if (visible) score.value = 6
  },
)
</script>

<style lang="less" scoped>
.equipment_details {
  .detail_header {
    display: flex;
    gap: 20px;
    margin-bottom: 8px;
    .detail_icon {
      flex-shrink: 0;
      width: 140px;
      height: 200px;
      border-radius: var(--app-radius-sm);
      border: 1px solid var(--app-border);
      background: linear-gradient(160deg, var(--el-color-primary-light-9), #f6f8ff);
      overflow: hidden;
    }
    .detail_info {
      flex: 1;
      .detail_name {
        font-size: 20px;
        font-weight: 700;
        color: var(--app-text);
      }
      .detail_role {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--app-navy);
        .role_avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--app-gold);
          overflow: hidden;
          background: #f0f2fa;
        }
      }
      .detail_tags {
        margin-top: 12px;
        display: flex;
        gap: 6px;
      }
    }
  }
  .detail_section {
    margin-top: 20px;
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      padding-left: 10px;
      border-left: 4px solid var(--app-primary);
      color: var(--app-text);
    }
  }
  .grade_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .burst_box {
    padding: 12px 16px;
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-sm);
    background: var(--el-color-primary-light-9);
    .burst_name {
      font-weight: 600;
      margin-bottom: 5px;
      color: var(--app-navy);
    }
    .burst_rows {
      font-size: 13px;
      color: var(--app-text-secondary);
    }
    .burst_row {
      margin-bottom: 4px;
      white-space: pre-wrap;
      word-break: break-all;
      span {
        display: inline-block;
        min-width: 72px;
        color: var(--app-text-weak);
        margin-right: 4px;
      }
    }
  }
  .score_badge {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    background: var(--app-gold);
    padding: 2px 10px;
    border-radius: 999px;
    vertical-align: middle;
  }
  .score_slider {
    padding: 0 8px;
    :deep(.el-slider__runway) {
      margin: 10px 0;
    }
  }
  .score_grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .score_item {
    padding: 10px 14px;
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-sm);
    background: var(--el-color-primary-light-9);
    display: flex;
    flex-direction: column;
    gap: 2px;
    span {
      font-size: 12px;
      color: var(--app-text-weak);
    }
    b {
      font-size: 16px;
      font-weight: 700;
      color: var(--app-navy);
    }
  }
  .score_note {
    margin-top: 10px;
    font-size: 12px;
    color: var(--app-text-weak);
  }
  .tag {
    --tag-color: var(--app-text-weak);
    display: inline-block;
    padding: 3px 10px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 999px;
    color: var(--tag-color);
    background: color-mix(in srgb, var(--tag-color) 12%, transparent);
  }
}
.img_placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--el-color-primary-light-9), #f6f8ff);
  img {
    width: 60px;
    opacity: 0.5;
  }
  &.small img {
    width: 24px;
  }
}
</style>

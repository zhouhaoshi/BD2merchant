<template>
  <el-dialog
    :model-value="dialogVisible"
    title="战斗模拟结果"
    :before-close="beforeClose"
    style="width: 90%"
    append-to-body
  >
    <div v-if="result">
      <div class="summary_bar">
        <el-tag :type="statusTagType" size="large">{{ statusText }}</el-tag>
        <div class="total_damage">
          总伤害：<span>{{ result.totalDamage.toLocaleString() }}</span>
        </div>
      </div>
      <!-- 队伍结果 -->
      <el-table :data="result.teamResults" border class="result_table">
        <el-table-column prop="index" label="队伍" width="80">
          <template #default="scope">队伍{{ scope.row.index + 1 }}</template>
        </el-table-column>
        <el-table-column label="造成伤害" width="180">
          <template #default="scope">{{ scope.row.damage.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-tag :type="teamStatusTagType(scope.row.status)" size="small">
              {{ teamStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 战斗日志 -->
      <div class="section_title">战斗日志</div>
      <el-table :data="result.logs" border height="280" class="result_table">
        <el-table-column prop="turn" label="回合" width="80" />
        <el-table-column label="队伍" width="80">
          <template #default="scope">
            {{ scope.row.teamIndex >= 0 ? `队伍${scope.row.teamIndex + 1}` : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" width="160" />
        <el-table-column prop="content" label="内容" />
        <el-table-column label="类型" width="90">
          <template #default="scope">
            <el-tag :type="logTagType(scope.row.type)" size="small">{{
              logTypeText(scope.row.type)
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 血量历史 -->
      <div class="section_title">血量历史</div>
      <el-table :data="result.hpHistory" border height="280" class="result_table">
        <el-table-column prop="turn" label="回合" width="80" />
        <el-table-column label="boss剩余HP" width="150">
          <template #default="scope">{{ scope.row.bossHp.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column
          v-for="charColumn in charColumns"
          :key="charColumn.key"
          :label="charColumn.label"
          min-width="140"
        >
          <template #default="scope">
            {{ charHpText(scope.row, charColumn) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="beforeClose"> 关闭 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  dialogVisible: boolean
  result: battleSimulationResult | undefined
}>()
const emit = defineEmits(['close'])

const beforeClose = () => {
  emit('close')
}

// 状态展示
const statusText = computed(() => {
  switch (props.result?.status) {
    case 'bossDead':
      return 'boss 被击败'
    case 'allDead':
      return '队伍全灭'
    default:
      return '达到最大回合数'
  }
})
const statusTagType = computed(() => {
  switch (props.result?.status) {
    case 'bossDead':
      return 'success'
    case 'allDead':
      return 'danger'
    default:
      return 'warning'
  }
})

const teamStatusText = (status: simulationTeamResult['status']) => {
  switch (status) {
    case 'bossDead':
      return '击杀boss'
    case 'killed':
      return '全灭'
    default:
      return '未出场/存活'
  }
}
const teamStatusTagType = (status: simulationTeamResult['status']) => {
  switch (status) {
    case 'bossDead':
      return 'success'
    case 'killed':
      return 'danger'
    default:
      return 'info'
  }
}

const logTypeText = (type: simulationLogEntry['type']) => {
  switch (type) {
    case 'skill':
      return '技能'
    case 'dot':
      return 'DOT'
    case 'boss':
      return 'boss'
    case 'kill':
      return '必杀'
    case 'teamSwitch':
      return '换队'
    default:
      return '结束'
  }
}
const logTagType = (type: simulationLogEntry['type']) => {
  switch (type) {
    case 'dot':
      return 'warning'
    case 'boss':
    case 'kill':
      return 'danger'
    case 'teamSwitch':
      return 'info'
    case 'end':
      return 'success'
    default:
      return ''
  }
}

// 血量历史列（取第一条快照中的角色）
const charColumns = computed(() => {
  const first = props.result?.hpHistory[0]
  if (!first) return []
  return first.teamHp.map((item) => ({
    key: `${item.teamIndex}_${item.name}`,
    teamIndex: item.teamIndex,
    name: item.name,
    label: `队伍${item.teamIndex + 1}·${item.name}`,
  }))
})
const charHpText = (
  row: simulationHpHistory,
  column: { key: string; teamIndex: number; name: string; label: string },
) => {
  const charHp = row.teamHp.find(
    (item) => item.teamIndex === column.teamIndex && item.name === column.name,
  )
  return charHp ? `${charHp.hp.toLocaleString()} / ${charHp.maxHp.toLocaleString()}` : '-'
}
</script>

<style lang="less" scoped>
.summary_bar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
  .total_damage {
    font-size: 18px;
    span {
      color: red;
      font-weight: 600;
    }
  }
}
.result_table {
  margin-bottom: 16px;
}
.section_title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>

<template>
  <nav class="navigation_bar">
    <section>
      <router-link to="/" class="brand" @click="changeRouter({ path: '/', name: '跑商' })">
        <img :src="appLogo" alt="BD2merchant logo" class="brand_logo" />
        <span class="brand_name">BD2 跑商助手</span>
      </router-link>
      <div class="nav_links">
        <router-link
          v-for="item in routerList"
          :key="item.path"
          :to="item.path"
          :class="newSelect === item.path ? 'select' : ''"
          @click="changeRouter(item as routerObj)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </section>
  </nav>
</template>
<script lang="ts" setup>
import { isUse } from '@/utils/localService'
import appLogo from '@/assets/img/app-logo.png'
const routerList = ref(useRouter().options.routes)
const Whitelist = ['跑商', '排轴', '角色管理', '装备管理']
if (isUse()) {
  routerList.value = routerList.value.filter(
    (item) => typeof item.name === 'string' && Whitelist.includes(item.name),
  )
}
const newSelect = ref(
  `/${window.location.href.split('/')[window.location.href.split('/').length - 1]}`,
)
interface routerObj {
  path: string
  name?: string
}
const changeRouter = (item: routerObj) => {
  newSelect.value = item.path
  document.title = `BD2-${item.name}`
}
</script>
<style lang="less" scoped>
.navigation_bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(90deg, var(--app-navy) 0%, var(--app-navy-light) 100%);
  box-shadow: 0 2px 12px rgba(30, 42, 90, 0.25);
  section {
    max-width: 1280px;
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    .brand_logo {
      width: 34px;
      height: 34px;
      border-radius: 8px;
    }
    .brand_name {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #fff;
      white-space: nowrap;
    }
  }
  .nav_links {
    display: flex;
    gap: 8px;
    margin-left: auto;
    a {
      position: relative;
      height: 60px;
      line-height: 60px;
      width: auto;
      padding: 0 18px;
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.72);
      transition: var(--app-transition);
      &:hover {
        color: #fff;
      }
      &.select {
        color: var(--app-gold);
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 0;
          height: 3px;
          border-radius: 3px 3px 0 0;
          background: var(--app-gold);
        }
      }
    }
  }
}
</style>

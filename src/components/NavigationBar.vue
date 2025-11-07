<template>
  <nav class="navigation_bar">
    <section>
      <router-link 
        v-for="item in routerList"
        :key="item.path"
        :to="item.path"
        :class="newSelect === item.path ? 'select' : ''"
        @click="changeRouter(item as routerObj)"
      >
        {{ item.name }}
      </router-link>
    </section>
  </nav>
</template>
<script lang="ts" setup>
  const routerList = ref(useRouter().options.routes)
  const newSelect = ref(`/${window.location.href.split('/')[window.location.href.split('/').length - 1]}`)
  interface routerObj {
    path: string,
    name?: string
  }
  const changeRouter = (item : routerObj) => {
    newSelect.value = item.path
    document.title = `BD2-${item.name}`
  }
</script>
<style lang="less" scoped>
  .navigation_bar{
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    section{
      padding: 1rem;
      display: flex;
      gap:20px;
      .select{
        background-color: #cbd5e1;
      }
      a{
        height: 40px;
        line-height: 40px;
        width: 100px;
        text-align: center;
        border-radius: 5px;
        transition: transform 0.2s;
        &:hover {
          transform: translateY(-5px);
          background-color: #cbd5e1;
        }
      }
    }
  }
</style>

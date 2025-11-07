declare module "element-plus"
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component:DefineComponent<>;
  export default component
}
declare module 'sortablejs' {
  interface SortableObj {
    create?: function
  }
  const Sortable: SortableObj
  export = Sortable
}
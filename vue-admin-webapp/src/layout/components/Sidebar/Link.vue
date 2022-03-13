<template>
  <component :is="type" v-bind="tagAttrs(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate"

export default {
 props: {
   to: {
     type: String,
     require: true
   },
 },
 computed: {
   type() {
     if (isExternal(this.to)) {
       return 'a'
     }
     return 'router-link'
   }
 },
 methods: {
   tagAttrs(to) {
     if (isExternal(to)) {
       return {
         href: to,
         target: '_blank',
         ref: 'noopener'
       }
     }
     return {
       to: to
     }
   }
 }
}
</script>

<style>

</style>
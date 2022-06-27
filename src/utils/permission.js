import Vue from "vue";
import router from '@/router.js'
Vue.directive('permission', {
    inserted(el, binding) {
        // console.log(el);
        // console.log(binding);
        let action = binding.value.action   // 待确认的权限
        let effect = binding.value.effect
        // console.log(router.currentRoute);    // 绑定自定义组件的路由 router.currentRoute
        // console.log(router.currentRoute.meta)   // 用户在当前路由的权限
        let meta = router.currentRoute.meta
        if (!meta.includes(action)) {
            // 没有权限，则 移除|禁用(有禁用则禁用) 自定义指令绑定的元素
            if (effect == 'disabled') {
                el.disabled = true
                el.classList.add('is-disabled')
            } else {
                // 无禁用则删除
                el.parentNode.removeChild(el)
            }

        }
    }
})
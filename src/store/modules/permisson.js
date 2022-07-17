import { routes, asyncRoutes } from '../../router/index.js'

// 后台返回信息
// {
//     username: "张三",
//     role: ["admin", "kefu"] //用户的角色
// }

// getAsyncRoutes:获取生成的完整路由
// hasPermission:判断是否有要添加的动态路由
// GenerateRoutes:根据角色和asyncRoutes生成需要添加的路由

/**
 * 通过meta中的roles信息判断用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        // 依据用户角色，找到一个即返回true，所以用some
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 这里 return true 是为了返回404页面，最后一个
        return true
    }
}

/**
 * 根据角色和配置生成当前用户的路由
 * @param {array} routes 配置的路由
 * @param {array} roles 用户角色
 */
let GenerateRoutes = (routes, roles) => {
    let res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                // 递归
                tmp.children = GenerateRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}
const permission = {
    state: {
        roles: [],
        routes: routes // 用于配置页面导航等
    },
    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ROUTES: (state, routes) => {
            state.routes = routes
        }
    },
    actions: {
        /**根据角色获取路由配置 */
        getAsyncRoutes({ commit }, roles) {
            commit('SET_ROLES', roles) // 保存roles信息到store中
            let filterRoutes = GenerateRoutes(asyncRoutes, roles)
            // routes:import进来的常量路由
            let res = routes.concat(filterRoutes)
            commit('SET_ROUTES', res)
            return res  // res：已经整合动态路由的完整路由
        }
    }
}
export default permission

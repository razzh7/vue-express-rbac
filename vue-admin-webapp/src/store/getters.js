const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    asyncRouter: state => state.user.asyncRouter,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    permission_routes: state => state.permission.routes,
    async_permission_routes: state => state.asyncPermission.routes,
    view_tags: state => state.viewtags.tagsList
}

export default getters;
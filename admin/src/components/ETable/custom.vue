<script>
export default {
  name: 'Custom',
  functional: true, // 开启函数式组件
  props: { // Vue 2.3.0+在functional component下可忽略props
    row: Object, // 用于JSX变量渲染
    index: Number, // 可能会用到的索引属性
    render: Function,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h,ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
    }
    if (ctx.props.column) params.column = ctx.props.column
    // 将custom functional component组件传入到column组件中，通过vue render重新渲染column
    return ctx.props.render(h,params)
  }
}
</script>
<template>
  <div id="app">
    <h2>自定义列表</h2>
    <e-table :data="fastData" :columns="columns" border stripe @filter-change="filterChange"></e-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ETable from "@/components/ETable"
export default {
  name: "App",
  data() {
    return {
      dialogVisible: false,
      fastData: [
          {
            name: "razzh-",
            date: "2021",
            habbit: "hard",
            tv: "知否知否应是绿肥红瘦",
            custom: "已完成"
          },
          {
            name: 'ff',
            date: "2021+",
            habbit: "game",
            tv: "士兵突击",
            custom: "未完成"
          },
          {
            name: "bb",
            date: "2022",
            habbit: "coding",
            tv: "琅琊榜",
            custom: "待付款"
          },
          {
            name: "razzh+",
            date: "2023",
            habbit: "al",
            tv: "庆余年",
            custom: "已支付"
          },
        ],
      columns: [
        {
          type: "selection"  // 是否开启多选
        },
        {
          isIndex: { type: "index", width: 80, label: "序号", isPagination: false } // isPagination是否开启分页随页数自增
        },
        {
          attrs: { label: "姓名", prop: "name" },
        },
        {
          customColumn: { label: "自定义列",
            render: (h,params) => {
            return (
              <div>
                <el-tag>{ params.row.custom }</el-tag>
              </div>
              )
            }
          }
        },
        {
          filter: { label: "过滤列", 
                    prop:"tv", 
                    filters:[
                              {text: '士兵突击', value: '士兵突击'},
                              {text: '知否知否应是绿肥红瘦', value: '知否知否应是绿肥红瘦'}, 
                              {text: '琅琊榜', value: '琅琊榜'},
                              {text: '庆余年', value: '庆余年'}],
                    filterMethod: this.filterTags
                  }
        },
        {
          attrs: { label: "时间", prop: "date" },
        },
        {
          attrs: { label: "爱好", prop: "habbit" },
        },
        {
          operation: {
            label: "操作",
            width: 260,
            btnList: [
            {
              name: "查看", // 操作节点名称
              type: "primary", // 按钮类型
              // icon: "el-icon-check",
              handleCb: this.handleCb
            },
            {
              name: "编辑", // 操作节点名称
              type: "danger", // 按钮类型
              icon: "el-icon-edit",
              handleCb: this.handleCb
            },
            {
              name: "导出", // 操作节点名称
              type: "warning", // 按钮类型
              icon: "el-icon-upload",
              handleCb: this.handleCb
            }
          ],
          }
        }
      ],
    };
  },
  methods: {
    handleCb(index, row, name) {
      console.log('index',index);
      console.log('row',row);
      console.log('name',name);
      this.dialogVisible = true; // 开启dialog
    },
    filterTags(value,row){
      return value === row.tv;
    },
    filterChange() {
      console.log('触发表单过滤事件')
    }
  },
  components: {
    ETable,
  },
};
</script>
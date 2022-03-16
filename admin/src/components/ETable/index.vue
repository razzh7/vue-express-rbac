<template>
  <div class="fast-table">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      style="width: 100%"
      >
      <template
       v-for="(column,index) in $attrs.columns">
       <!-- 是否可选 -->
       <el-table-column
          v-if="column.type === 'selection'"
          :key="column.type"
          type="selection"
          align="center">
       </el-table-column>
       <!-- 是否开启序号 -->
       <el-table-column
          v-else-if="column.isIndex"
          :key="column.isIndex['type']"
          v-bind="column.isIndex || {}"
          type="index"
          align="center">
          <!-- 自定义插槽 用于分页自增加页数 -->
          <template slot-scope="scope">
            <!-- (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1 -->
            <!-- column.isPagination:是否存在分页 -->
            <span v-if="column.isIndex['isPagination']">
              {{ ($attrs.curPage - 1) * $attrs.pageSize + scope.$index + 1 }}
            </span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
       </el-table-column>
       <!-- 具体内容 -->
        <el-table-column
          v-else-if="column.attrs || column.filter"
          :key="index"
          v-bind="column.attrs || column.filter"
          align="center">
        </el-table-column>
        <!-- 自定义列 -->
        <el-table-column
          v-else-if="column.customColumn"
          v-bind="column.customColumn"
          align="center">
          <template slot-scope="scope">
            <custom
            v-if="column.customColumn.render"
            :row="scope.row"
            :index="index"
            :render="column.customColumn.render"
            :column="column">
            </custom>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column
            v-else-if="column.operation"
            :key="column.operation.title"
            v-bind="column.operation || {}"
            align="center"
            >
            <template slot-scope="scope">
              <template v-if="column.operation.btnList.length > 0">
                <div class="btn">
                  <div class="btn-item" v-for="(item,index) in column.operation.btnList" :key="index">
                    <el-button v-if="item.icon" 
                        :icon="item.icon" 
                        :type="item.type" 
                        @click.native="item.handleCb(scope.$index, scope.row, item.name)" 
                        size="mini" v-bind="item">
                        {{ item.name }}
                    </el-button>
                    <el-button v-else 
                        :type="item.type" 
                        @click.native="item.handleCb(scope.$index, scope.row, item.name)" 
                        size="mini" v-bind="item">
                        {{ item.name }}
                    </el-button>
                  </div>
                </div>
              </template>
            </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import Custom from "./custom.vue";
export default {
  name: 'FastTable',
  components: {
    Custom
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  .btn-item {
    margin-right: 5px;
  }
}
</style>
<template>
  <div>
    <el-collapse 
      @change="loadWmsLayers"
      accordion>
    <el-collapse-item title="当前已添加图层" name="0">
      <el-table
        :data="this.showLayers"
        :show-header="false"
        ref="showLayers"
        @select="changeVisible">
        <el-table-column
        type="selection"
        width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          min-width="170px">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteLayer(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>    
    <el-collapse-item title="NASA Earth Observations (NEO) WMS" name="1">
      <el-table
        :data="this.layers"
        :show-header="false"
        v-loading="layersLoading"
        @expand-change="expandChange"
        class="expand-table">
        <el-table-column 
          type="expand"
          class="expand-table"
          min-width="200px">    
          <template slot-scope="props" class="expand-table">
            <el-table
              :data="props.row.Layer"
              :show-header="false"
              @row-click="click"
              class="expand-table"
              >
              <el-table-column
                prop="Name"
                min-width="200px"
              >
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="Title">
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      activeNames: "",
      layers: null,
      activeOsm: true,
      showLayers: [],
      layersLoading: true,
    }
  },
  created () {
    this.$bus.$on("getLayers", (layers) => {
      this.layers = layers;
      this.layersLoading = false;
      });
    },
  methods: {
    click(row) {
      this.showLayers.push({'name':row.Name});
      this.$bus.$emit("getLayerName", row.Name);
      this.$refs.showLayers.toggleRowSelection(this.showLayers[this.showLayers.length - 1]);
    },
    expandChange(row, expandedRows) {
      if(expandedRows.length > 1) {
        expandedRows.shift();
      }
    },
    deleteLayer(index, r) {
      this.showLayers.splice(index, 1);
      this.$bus.$emit("deleteLayer", index);
    },
    changeVisible(val, row) {
      this.$bus.$emit("changeVisible", this.showLayers.indexOf(row));
    },
    loadWmsLayers(name) {
      if (name == "1") {
        this.$bus.$emit("getNeoCap");
      }
    }
  }
}
</script>

<style scoped>

.el-collapse-item {
  font-size: 10px;
}

.el-table {
  font-size: 15px;
}

.el-table-column {
  padding: 0px;
}

.expand-table {
  width: 100%;
  padding: 0px 0px;
}
/* .el-table__expand-column .cell { */
</style>

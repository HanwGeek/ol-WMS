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
    <OGCLayerItem ref="ogc" />    
  </el-collapse>
  </div>
</template>

<script>
import OGCLayerItem from '@/components/OGCLayersItem'

export default {
  name: 'SideBar',
  components:{
    OGCLayerItem
  },
  data () {
    return {
      activeNames: "",
      showLayers: [],
      ogcItems: [],
    }
  },
  created () {
      this.$bus.$on("itemClick", row => {
        this.showLayers.push({'name':row.Name});
        this.$bus.$emit("getLayerName", row.Name);
        this.$refs.showLayers.toggleRowSelection(this.showLayers[this.showLayers.length - 1]);
      });
    },
  methods: {
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
    loadWmsLayers() {
      this.$refs.ogc.loadLayersData();
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
.el-table__expanded-cell {
  padding: 0px;
}
</style>

<template>
  <div>
    <el-button type="primary" round @click="getCap">GetCapabilities</el-button>
    <el-collapse accordion>
    <el-collapse-item title="当前添加图层">
      <el-table
        :data="this.showLayers"
        :show-header="false">
      <el-table-column
        prop="name"
        min-width="150px">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleteLayer(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-collapse-item>    
    <el-collapse-item title="Neo" name="1">
<!--       
      <ul>
        <li v-for="layer in this.layers">
          {{layer.Title}}
        </li>
      </ul> -->
      <el-table
        :data="this.layers"
        :show-header="false"
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
          <!-- <template slot-scope="scope">
            <el-collapse-item title="">
            </el-collapse-item>
          </template> -->
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
  </div>
    <!-- <el-collapse-item title="Mrdata" name="2">
    <el-button type="primary" round @click="getMrCap">GetCapabilities</el-button>
    </el-collapse-item> -->
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
    }
  },
  created () {
    this.$bus.$on("getLayers", (layers) => {
      this.layers = layers;
      });
    },
  methods: {
    getCap() {
      this.$bus.$emit("getNeoCap");
    },
    click(row) {
      this.showLayers.push({'name':row.Name});
      this.$bus.$emit("getLayerName", row.Name);
    },
    expandChange(row, expandedRows) {
      if(expandedRows.length > 1) {
        expandedRows.shift();
      }
    },
    deleteLayer(index, r) {
      this.showLayers.splice(index, 1);
      this.$bus.$emit("deleteLayer", index);
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
  padding: 20px 0px;
}

</style>

<template>
    <el-collapse-item :title="title" :name="name">
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
              class="expand-table">
              <el-table-column
                prop="Name"
                min-width="200px">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="Title">
        </el-table-column>
      </el-table>
    </el-collapse-item>
</template>

<script>
export default {
  name: 'OGCLayerItem',
  data () {
    return {
      url: "https://neo.sci.gsfc.nasa.gov/wms/wms",
      title: "Neo",
      name: "1",
      cap: null,
      layers: null,
      layersLoading: true,
    }
  },
  methods: {
    loadLayersData () {
      this.$http.get(this.url, {
        params:{
          service: "WMS",
          request: 'GetCapabilities'
        }
      }).then((res) => {
        this.cap = this.$x2js.xml2js(res.data).WMS_Capabilities;
        this.layers = this.cap.Capability.Layer.Layer;
        this.layersLoading = false;
      })
    },
    expandChange(row, expandedRows) {
      if(expandedRows.length > 1) {
        expandedRows.shift();
      }
    },
    click(row) {
      this.$bus.$emit("itemClick", row);
    }
  }
}
</script>

<style scoped>

</style>



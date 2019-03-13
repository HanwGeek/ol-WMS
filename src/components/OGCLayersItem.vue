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
              :data="props.row.layers"
              :show-header="false"
              @row-click="click"
              class="expand-table">
              <el-table-column
                prop="Title"
                min-width="200px">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="title">
        </el-table-column>
      </el-table>
    </el-collapse-item>
</template>

<script>
export default {
  name: 'OGCLayerItem',
  props: ['title', 'name', 'url'],
  data () {
    return {
      cap: null,
      layers: null,
      layersLoading: true,
      isHasChildren: false,
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
        let layers = this.cap.Capability.Layer.Layer;
        if ('Layer' in layers[0]) {
          this.layers = layers.map(o => ({
            title: o.Title,
            layers: o.Layer
          }));
        }
        else {
          this.layers = layers.map(o =>({
            title: o.Title,
            layers: [{
              Title: o.Title,
              Name: o.Name
            }]
          }));
        }
        this.layersLoading = false;
      })
    },
    expandChange(row, expandedRows) {
      if(expandedRows.length > 1) {
        expandedRows.shift();
      }
    },
    click(row) {
      this.$bus.$emit("itemClick", [this.url, row.Name]);
    }
  }
}
</script>

<style scoped>

</style>



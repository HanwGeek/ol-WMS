<template>
  <div>
    <el-button type="primary" @click="dialShow = true" class="round" round>添加OGC服务</el-button>
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
    <div ref="layers" v-for="(item, index) in ogcItems">
      <OGCLayerItem 
        :title="item.title"  
        :url="item.url"
        :name="index + 1">
      </OGCLayerItem>
    </div>
  </el-collapse>
  <el-dialog
    title="添加新的OGC服务图层"
    :visible.sync="dialShow"
    width="500px">
  <el-form label-width="80px" size="small">
    <el-form-item label="服务名:">
      <el-input v-model="title"></el-input>
    </el-form-item>
    <el-form-item label="URL:">
      <el-input v-model="url"></el-input>
    </el-form-item>
  </el-form>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-button class="round" @click="dialShow = false" round>取消</el-button>
    </el-col>
    <el-col :span="12">
      <el-button class="round" type="primary" @click="addOGCService" round>确定</el-button>
    </el-col>
  </el-row>
  </el-dialog>
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
      dialShow: false,
      url: "",
      title: "",
      showLayers: [],
      ogcItems: [
        {
          title: 'NASA Earth Observations (NEO) WMS',
          url: 'https://neo.sci.gsfc.nasa.gov/wms/wms'
        },
        {
          title: 'National Mineral Resource Assessment 1998',
          url: 'https://mrdata.usgs.gov/services/nmra'
        }
      ],
    }
  },
  created () {
      this.$bus.$on("itemClick", (param) => {
        this.showLayers.push({'name':param[1]});
        this.$bus.$emit("getLayer", param);
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
    loadWmsLayers(name) {
      if (name != "" && name != "0") {
        // console.log(this.$children[1].$children[name].title);
        this.$children[1].$children[name].loadLayersData();
      }
    },
    addOGCService() {
      this.ogcItems.push({
        title: this.title,
        url: this.url
      });
      this.title = "";
      this.url = "";
      this.dialShow = false;
    }
  }
}
</script>

<style scoped>
.round {
  padding: 10px 50px;
}
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

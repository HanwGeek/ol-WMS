<template>
  <div>
    <div id="map"></div>
    <!-- <div ref="popup" class="ol-popup">
        <el-card>
          {{coord}}
        </el-card>
    </div> -->
  </div>
</template>

<script>
import Map from 'ol/Map'
import OpenLayersView from 'ol/View'
import Overlay from 'ol/Overlay'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {Style, Fill, Stroke, RegularShape, Circle as CircleStyle} from 'ol/style'
import {OSM, vector, TileWMS} from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import {toStringHDMS} from 'ol/coordinate'
import {bbox as bboxStrategy} from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector'
import x2js from 'x2js'

export default {
  components: {
    Map,
    TileLayer,
    OSM,
    OpenLayersView
  },

  data () {
    return {
      coord: null,
      map: null,
      cap: null,
      layers: null,
      wmsLayers: null,
      osmLayer: null,
      showLayers: [],
      visible: [],
      layerName: "",
      format: 'image/png',
      crs: "CRS:84"
      //https://mrdata.usgs.gov/services/nmra?request=getmap&service=WMS&version=1.3.0&layers=USNationalMineralAssessment1998&width=4096&height=4096&crs=EPSG:4326&bbox=24,-165,73,-66&format=image/png
      //https://mrdata.usgs.gov/wms.html
      //https://mrdata.usgs.gov/wfs.html
    }
  },
  created () {
    this.$bus.$on("getLayerMap", param => {
      this.layerName = param[2];
      this.draw(param[0]);
    });
    this.$bus.$on("switchOsm", (activeOsm) => {
      this.osmLayer.setVisible(activeOsm);
    });
    this.$bus.$on("deleteLayer", (index) => {
      this.map.removeLayer(this.showLayers[index]);
      this.showLayers.splice(index, 1);
    });
    this.$bus.$on("changeVisible", (index) => {
      this.visible[index] = !this.visible[index];
      this.showLayers[index].setVisible(this.visible[index]);
    });
  },
  methods: {
    init () {
      this.osmLayer = new TileLayer({
        source: new OSM()
      })
      this.map = new Map({
        layers: [this.osmLayer],
        target: 'map',
        view: new OpenLayersView({
          projection: 'CRS:84',
          center: [114, 30],
          zoom: 12
        })
      });
    },
    draw(serviceUrl) {
      var wmsLayer = new TileLayer({
        source: new TileWMS({
          url: serviceUrl,
          params: {
            'LAYERS': this.layerName,
            },
          transition: 0
        })
      });
      this.showLayers.push(wmsLayer);
      this.visible.push(true);
      this.map.addLayer(wmsLayer);
    },
  },
  mounted () {
    this.init();
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
  left: 0;
  z-index: 5;
}

.ol-popup {
  position: absolute;
  /* background-color: white; */
  /* -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2)); */
  /* filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2)); */
  /* padding: 15px; */
  /* border-radius: 10px; */
  /* border: 1px solid #cccccc; */
  bottom: 12px;
  left: -50px;
  min-width: 300px;
}

.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
</style>



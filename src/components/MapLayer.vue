<template>
  <div>
    <div id="map"></div>
    <div ref="popup" class="ol-popup">
        <el-card>
          {{coord}}
        </el-card>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map'
import OpenLayersView from 'ol/View'
import Overlay from 'ol/Overlay'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {Style, Fill, Stroke} from 'ol/style'
import {OSM, vector, TileWMS} from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import {toStringHDMS} from 'ol/coordinate'
import 'ol/control'

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
      neoWMS: 'https://neo.sci.gsfc.nasa.gov/wms/wms'
    }
  },
  methods: {
    drawBaseMap () {
      var overlay = new Overlay({
        element: this.$refs.popup,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      var osmLayer = new TileLayer({
        source: new OSM()
      })
      var map = new Map({

        target: 'map',
        layers: [
          osmLayer,
          new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
            source: new TileWMS({
              url: 'https://ahocevar.com/geoserver/wms',
              params: {'LAYERS': 'topp:states', 'TILED': true},
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0
            })
          })
        ],
        overlays: [overlay],
        view: new OpenLayersView({
          projection: 'EPSG:4326',
          center: [-100, 40],
          zoom: 12,
          // minZoom: 10,
          // maxZoom: 16
        })
      });

      map.on('click', (e) => {
        var coord = e.coordinate;
        var hdms = toStringHDMS(coord);
        this.coord = hdms;
        overlay.setPosition(coord);
      })
      this.map = map;
    },
    draw() {
      var layers = [
        new TileLayer({
          source: new OSM()
        }),
        new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0
          })
        })
      ];
      var map = new Map({
        layers: layers,
        target: 'map',
        view: new OpenLayersView({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });
    }
  },
  mounted () {
    // this.drawBaseMap();
    this.draw();
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 800px;
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



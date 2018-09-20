<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mt-4">
          <div ref="cam-container">

          </div>
        </div>
        <div class="col-lg-4 mt-4">
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
              <a class="nav-link"
                :class="{'active': selectedView === 'control'}"
                @click.prevent="selectView('control')"
                href="#">Control</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                :class="{'active': selectedView === 'cameras'}" 
                @click.prevent="selectView('cameras')"
                href="#">Cameras</a>
            </li>
          </ul>

          <div v-if="selectedView === 'cameras'">
            <div v-if="isLoading" class="alert alert-info">
              Loading...
            </div>
            <nav v-else class="list-group mt-4">
              <a href="#"
                class="list-group-item"
                :class="{'active': isCameraActve(id)}"
                v-for="{id, name, source} in cameras"
                @click="setCameraSource(source)"
                :key="id">
                {{name}}
              </a>
            </nav>
          </div>
          <div class="d-flex justify-content-center align-items-center" v-else>
            <control @move="onMove" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebCam from 'WebCam'
import Control from '@/components/Control'

export default {
  name: 'app',
  data () {
    return {
      isLoading: false,
      cameras: [],
      activeCameraId: 'newyork',
      selectedView: 'cameras'
    }
  },
  mounted () {
    this.isLoading = true
    this.fetchCameras()
      .then(() => { this.isLoading = false })

    this.$refs['cam-container']
      .appendChild(WebCam.getCameraNode())
  },
  methods: {
    fetchCameras () {
      return fetch('http://runningios.com/screamingbox/cameras.json')
        .then(res => res.json())
        .then(cameras => { this.cameras = cameras })
    },
    selectView (view) {
      this.selectedView = view
    },
    setCameraSource (sourceUrl) {
      WebCam.setSource(sourceUrl)
      this.cameras.forEach(({id, source}) => {
        if (source === sourceUrl) {
          this.activeCameraId = id
        }
      })
    },
    isCameraActve (id) {
      return this.activeCameraId === id
    },
    onMove([x, y]) {
      WebCam.move(-x, y)
    }
  },
  components: {
    Control
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app";

.control-circle {
  width: 200px;
  height: 200px;
  margin: 5rem auto;
}

</style>

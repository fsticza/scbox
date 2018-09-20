<template>
  <svg class="control-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
    @mousedown="onMouseDown"
    @touchstart.prevent="onTouchStart"
    @mouseup="finish"
    @touchend.prevent="finish"
    @touchcancel.prevent="onTouchEnd"
    @mousemove="onMouseMove"
    @touchmove.prevent="onTouchMove"
    @mouseleave="finish"
  >
    <circle cx="50" cy="50" r="50"/>
  </svg>
</template>

<script>

export default {
  name: 'Control',
  data () {
    return {
      isPressed: false,
      initCoords: []
    }
  },
  methods: {
    beginWithCoords (coords) {
      this.isPressed = true
      this.initCoords = coords
    },
    finish () {
      this.isPressed = false
    },
    moveTo ([newX, newY]) {
      if (!this.isPressed) {
        return
      }
      const [initX, initY] = this.initCoords
      this.$emit('move', [initX - newX, initY - newY])
    },
    onMouseDown ($event) {
      this.beginWithCoords([$event.clientX, $event.clientY])
    },
    onTouchStart ($event) {
      const touch = $event.touches[0]
      if (touch) {
        this.beginWithCoords([touch.clientX, touch.clientY])
      }
    },
    onMouseMove ($event) {
      this.moveTo([$event.clientX, $event.clientY])
    },
    onTouchMove ($event) {
      const touch = $event.touches[0]
      if (touch) {
        this.moveTo([touch.clientX, touch.clientY])
      }
    }
  }
}
</script>

<style lang="scss">
.control-circle {
  fill: #666;
}
</style>



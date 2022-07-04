<template>
<div class="loading" :style="{width: size+'px', height: size+'px'}">
  <svg class="loading-circle-svg" viewBox="25 25 50 50" width="50" height="50">
    <circle class="loading-circular" fill="transparent" cx="50" cy="50" r="20" stroke-width="5" stroke-dasharray="125.664" stroke-dashoffset="125.66370614359172px"></circle>
  </svg>
</div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    size: { default: 30 }
  }
}
</script>

<style>
.loading{position: relative;display: inline-block;width: 30px;height: 30px;color: #0094d4;}
.loading-circular{stroke: currentColor;z-index: 2;transition: all .6s ease-in-out;
  stroke-dasharray: 80,200;stroke-dashoffset: 0px;
  animation: loading-circular-dash 1.4s ease-in-out infinite;
}
.loading-circle-svg{position: absolute;width: 100%;height: 100%;left: 0;top: 0;vertical-align: middle;
  animation: loading-circular-rotate 1.4s linear infinite;
  }
@keyframes loading-circular-dash{
  0%{stroke-dasharray:1,200;stroke-dashoffset:0px}
  50%{stroke-dasharray:100,200;stroke-dashoffset:-15px}
  to{stroke-dasharray:100,200;stroke-dashoffset:-125px}
}
@keyframes loading-circular-rotate{
  to{transform:rotate(1turn)}
}
</style>

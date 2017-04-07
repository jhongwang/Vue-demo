<template>
  <div :class="className" :style="style" :mType="mType"></div>
</template>

<style scoped>
</style>

<script>
  import ECharts from 'echarts';
  import Debounce from 'lodash.debounce';
  import Resize from 'element-resize-detector';
  import ChartWrapper from '../assets/js/ChartWrapper.js';
  const IEcharts = ChartWrapper(ECharts, Resize, Debounce);
  export default IEcharts;
</script>

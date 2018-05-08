<template>
  <span class="select-box">
     <select :name="name" :id="selectId" @change="change">
        <slot></slot>
     </select>
  </span>
</template>

<script>
export default {
  props: ["name", "selectId", "change"]
};
</script>

<style lang="less" scoped>
span.select-box  {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    right: 8px;
    top: 50%;
    margin-top: -2px;
    height: 0;
    width: 0;
    border-top: 6px solid #000;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    pointer-events: none;
  }
  select {
    -webkit-appearance: none;
    padding: 8px 32px 8px 8px;
    border-radius: 3px;
    background: #fff;
    position: relative;
    font-size: 0.9em;
    &:after {
      content: "";
      position: absolute;
      height: 10px;
      width: 10px;

      transform: rotate(90deg);
    }
  }
}
</style>


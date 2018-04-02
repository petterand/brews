<script>
export default {};
</script>

<template>
<div>
   <h1>Rehydrera jäst</h1>
   <ol>
      <li>Se till att jästen är rumstempererad</li>
      <li>Mät upp 10 gånger jästvikten vatten med en temperatur på 35-40°C (11,5g jäst ger 115g vatten)</li>
      <li>Strö jästen över vattnet</li>
      <li>Låt stå 15 min</li>
      <li>Rör ihop och låt stå tills jästen absorberat delar av vattnet</li>
      <li>Rör till ett skum</li>
      <li>Stå 5min</li>
      <li>Kyl ner till pitchtemp med vatten</li>
      <li>Pitcha jästen i vörten</li> 
   </ol>
</div>
</template>

<style scoped lang="less">
ol {
  list-style-type: none;
  counter-reset: cc;
  padding: 0;
  li {
    padding: 8px 0;
    display: flex;
    align-items: center;
    &:before {
      content: counter(cc);
      counter-increment: cc;
      font-size: 1.5em;
      margin-right: 12px;
    }
  }
}
</style>

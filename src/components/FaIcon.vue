<template>
  <i :class= "`fa fa-${name}`"></i>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'

export default {
  name: 'FaIcon',
  props: {
    name: String
  }
}
</script>

<style>

</style>

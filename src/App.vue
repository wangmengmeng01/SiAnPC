<template>
  <div id="app">
  	<router-view :key="$route.path"/>
  </div>
</template>

<script>
	import { getToken , removeToken} from '@/utils/auth'
export default {
  name: 'App',
  created() {
  }
}
</script>

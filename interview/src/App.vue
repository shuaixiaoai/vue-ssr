<template>
    <div class="text">{{text}}</div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
             text: 'abc'
        }
    }
}
</script>

<style  lang='less' scoped>
.text {
    color: red;
}
</style>
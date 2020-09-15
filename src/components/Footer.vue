<template>
  <footer class="footer" :class="{'fixed': fixed}">
    All Rights Reserved © 2020 Copyright:
    <a class="footer-a" href="#"> Mateusz Bujak SA</a>
  </footer>
</template>

<script>
export default {
    name: 'Footer',
    props:{
        fixed: Boolean
    }
}
</script>

<style lang="scss" scoped>
.fixed{
    position: fixed;
    bottom: 0;
}

.footer{
    
    width: 100%;
    text-align: center;
    padding: 6px 0;
    color: rgb(218, 218, 218);
    background-color: rgb(32, 32, 32);
    font-size: 15px;
    letter-spacing: 1px;

    &-a{
        color: rgb(218, 218, 218);
        text-decoration: none;
        font-size: 15px;

        &:hover{
            color: rgb(121, 121, 121);
        }
    }
}

@media(max-width: 500px){
    .footer{
        font-size: 11px;
        padding: 8px 0;
        &-a{
            font-size: 11px;
        }
    }
}



</style>

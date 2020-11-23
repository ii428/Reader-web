<template>
    <!-- start    Nav -->
    <transition name="slide-down">
        <div class="nav-wrap" v-show="isNavAndMenu">
            <div class="left">
                <span class="icon-back icon" @click="jumpToSelectBook"></span>
            </div>
            <div class="right">
                <div class="icon-wrap">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrap">
                    <span class="icon-person icon"></span>
                </div>
                <div class="icon-wrap">
                    <span class="icon-more icon"></span>
                </div>
            </div>
        </div>
    </transition>
    <!-- end    Nav -->
</template>

<script>
    export default {
        props: {
            isNavAndMenu: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            jumpToSelectBook() {
                this.$parent.jumpToSelectBook();
            }
        }
    }
</script>

<style scoped>
   /* start    nav of style */
    .nav-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 200;
        display: flex;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, .15);
        background-color: #fff;
    }
    .left {
        display: flex;
        align-items: center;
    }
    .right {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
    .right .icon-wrap {
        display: flex;
        align-items: center;
    }
    .icon {
        padding: var(--clearance-size);
    }
    /* end    nav of style */
</style>
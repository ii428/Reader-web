<template>
    <transition name="slide-right">
        <div class="content-wrap">
            <div class="content" v-if="bookAvailable">
                <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
                    <span class="text">{{ item.label }}</span>
                </div>
            </div>
            <div class="empty" v-else>Loadding...</div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        navigation: Object,
        bookAvailable: Boolean,
    },
    methods: {
        jumpTo(href) {
            this.$emit('jumpTo', href);
        },
    }
}
</script>

<style scoped>
    .content-wrap {
        position: absolute;
        top: -100vh;
        left: 0;
        z-index: 500;
        width: 76vw;
        height: 100vh;
        background-color: #fff;
    }
    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-left: .8rem;
        padding-right: .8rem;
        color: var(--font-main-color);
        overflow: auto;
    }
    .content-item {
        font-size: .4rem;
        padding-top: .2rem;
        padding-bottom: .2rem;
        cursor: pointer;
    }
    .empty {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--font-assist-color);
    }
</style>
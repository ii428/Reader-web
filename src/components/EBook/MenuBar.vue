<template>
    <div class="menu_bar-container">
        <!-- start    Menu -->
        <transition name="slide-up">
            <div class="menu-wrap" 
              v-show="isNavAndMenu"
              :class="{'hidden-box-shadow': isSettingShow || !isNavAndMenu}">
                <div class="icon-wrap">
                    <span class="icon-menu icon" @click="showSetting(3)"></span>
                </div>
                <div class="icon-wrap">
                    <span class="icon-progress icon" @click="showSetting(2)"></span>
                </div>
                <div class="icon-wrap">
                    <span class="icon-bright icon" @click="showSetting(1)"></span>
                </div>
                <div class="icon-wrap">
                    <span class="icon-a icon" @click="showSetting(0)">A</span>
                </div>
            </div>
        </transition>
        <!-- end    Menu -->

        <!-- start    Setting -->
        <transition name="slide-up">
            <div class="setting-warp" v-show="isSettingShow">
                <!-- start    font-size -->
                <div class="setting-font-size" v-if="showTag === 0">
                    <div class="preview" :style="firstFontSizeStyle">A</div>

                    <!-- font-size of progress bar -->
                    <div class="select-wrap">
                        <div class="select" 
                          v-for="(item, index) in fontSizeList" 
                          :key="index"
                          @click="selectFontSize(item.fontSize)">
                            <div class="line"></div>
                            <div class="point-wrap">
                                <div class="point" v-show="defaultFontSize === item.fontSize">
                                    <div class="small-point"></div>
                                </div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>

                    <div class="preview" :style="lastFontSizeStyle">A</div>
                </div>
                <!-- end    font-size -->

                <!-- start    themes -->
                <div class="setting-themes" v-else-if="showTag === 1">
                    <div class="themes-item" 
                      v-for="(item, index) in themesList" 
                      :key="index" 
                      @click="selectTheme(index)">
                        <div class="preview" 
                          :style="{
                              backgroundColor: item.style.body.background,
                              border: item.style.body.background == '#fff' ? 'solid 1px #ccc' : 'unset'
                          }"
                        >
                        </div>
                        <div class="text" :class="{active: defaultTheme === index}">{{ item.name }}</div>
                    </div>
                </div>
                <!-- end    themes -->

                <!-- start    progress -->
                <div class="setting-progress" v-else-if="showTag === 2">
                    <div class="progress-wrap">
                        <input class="progress" 
                          type="range" 
                          max="100" 
                          min="0" 
                          step="1" 
                          :value="progress" 
                          :disabled="!bookAvailable"
                          @change="onProgressChange($event.target.value)"
                          @input="onProgressInput($event.target.value)"
                          ref="progress">
                    </div>
                    <div class="text-wrap">
                        <span>{{ bookAvailable ? progress + '%' : 'loadding...' }}</span>
                    </div>
                </div>
                <!-- end    progress -->
            </div>
        </transition>
        <!-- end    Setting -->

        <!-- start    Navigation -->
        <book-navigation 
          v-show="isShowBookNavigation"
          :navigation="navigation"
          :bookAvailable="bookAvailable"
          @jumpTo="jumpTo"
          />
        <transition name="fade">
            <div class="content-mask"
              v-show="isShowBookNavigation"
              @click="hiddenContentMask"></div>
        </transition>
        <!-- end    Navigation -->
    </div>
</template>

<script>
    import BookNavigation from '../MenuBar/BookNavigation'

    export default {
        props: {
            // Toggle 显示Menu
            isNavAndMenu: {
                type: Boolean,
                required: true,
            },
            fontSizeList: Array,    // 字号列表
            defaultFontSize: Number,   // 默认字体大小
            themesList: Array,  // 主题列表
            defaultTheme: Number,   // 默认主题索引
            bookAvailable: Boolean, // 进度条是否可用
            navigation: Object, // 电子书导航对象
        },
        data() {
            return {
                isSettingShow: false,   // Toggle 显示Setting部分
                showTag: 0, // 显示Setting Widget的索引
                progress: 0,    // 进度条的进度
                isShowBookNavigation: false,   // toggle 目录导航
            }
        },
        components: {
            BookNavigation
        },
        computed: {
            // set font-size the widget first DOM style
            firstFontSizeStyle() {
                return {
                    fontSize: this.fontSizeList[0].fontSize + 'px'
                }
            },
            // set font-size the widget last DOM style
            lastFontSizeStyle() {
                return {
                    fontSize: this.fontSizeList[this.fontSizeList.length - 1].fontSize + 'px'
                }
            },

        },
        methods: {
            // 显示 Setting的函数相关处理
            showSetting(tag) {
                this.showTag = tag;

                if(tag === 3) { 
                    this.isShowBookNavigation = true;
                    this.isSettingShow = false;
                } else {
                    this.isSettingShow = true;
                }
            },

            // 隐藏 Setting的函数相关处理
            hiddenSetting() {
                this.isSettingShow = false;
            },

            // 设置字号大小处理函数
            selectFontSize(size) {
                // this.fontSize = size;
                this.$emit('setFontSize', size);
            },

            // 设置主题处理函数
            selectTheme(index) {
                // console.log(index);
                this.$emit('setTheme', index);
            },

            // 设置进度处理函数
            onProgressChange(progress) {
                this.$emit('onProgressChange', progress);
            },

            // 拖动进度条时处理函数
            onProgressInput(progress) {
                this.progress = progress;
                this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
            },

            // 隐藏目录导航的蒙版
            hiddenContentMask() {
                this.isShowBookNavigation = false;
            },

            // // 根据链接跳转到指定的位置
            jumpTo(href) {
                this.$emit('jumpTo', href);
                this.isShowBookNavigation = false;
            }
        },
    }
</script>

<style scoped>
    .menu_bar-container {
        position: relative;
    }
    

    /* start   Setting of style */
    .setting-warp {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        bottom: 1.4rem;
        z-index: 200;
        height: 1.4rem;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, .15);
        background-color: #fff;
    }

    /* start    Navition */
    .content-mask {
        position: absolute;
        top: -100vh;
        left: 0;
        z-index: 400;
        display: flex;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .3);
    }
    /* end    Navition */

    /* start    progress */
    .setting-progress {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .progress-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 1rem;
    }
    .progress {
        width: 100%;
        height: 2px;
        background: linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%;
        appearance: none;
        outline: none;
    }
    .progress::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border: solid 1px #ddd;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
        cursor: pointer;
    }
    .setting-progress .text-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .4rem;
        color: var(--font-main-color);
    }
    /* end    progress */


    /* start    themes */
    .setting-themes {
        display: flex;
        height: 100%;
    }
    .themes-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: .2rem;
        cursor: pointer;
    }
    .themes-item .preview {
        flex: 1;
        box-sizing: border-box;
    }
    .themes-item .text {
        text-align: center;
        font-size: .4rem;
        color: var(--font-assist-color);
    }
    .themes-item .active {
        font-weight: 500;
        color: var(--font-main-color);
    }
    /* end    themes */

    /* start    font-size */
    .setting-font-size {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .preview {
        flex: 0 0 1rem;
        display: flex;
        justify-content: center;
    }
    .select-wrap {
        flex: 1;
        display: flex;
    }
    .select {
        flex: 1;
        display: flex;
        align-items: center;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: pointer;
    }
    .line {
        flex: 1;
        height: 0;
        border-top: solid 1px #ccc;
    }
    .point-wrap {
        position: relative;
        flex: 0 0 0;
        width: 0;
        height: 7px;
        border-left: solid 1px #ccc;
    }
    .point {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 1px #ccc;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .15);
        background-color: #fff;
    }
    .small-point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #999;
    }
    .select:first-child > .line:first-child,
    .select:last-child > .line:last-child {
        border-top: none;
    }
    /* end    font-size */
    /* end   Setting of style */


    /* start    menu of style */
    .menu-wrap {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 300;
        display: flex;
        height: 1.4rem;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, .15);
        background-color: #fff;
    }
    .menu-wrap .icon-wrap {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .icon {
        padding: var(--clearance-size);
    }
    .hidden-box-shadow {
        box-shadow: unset !important;
    }
    /* end    Menu of style */
</style>
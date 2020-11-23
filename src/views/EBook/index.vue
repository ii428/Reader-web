<template>
    <div class="ebook-container">
        <div class="read-wrapper">
            <!-- 电子书渲染区域 -->
            <div id="read"></div>

            <!-- start    Mask -->
            <div class="mask" :style="maskStyle">
                <div class="left" @click="onPrev" :style="maskButtonStyle"></div>
                <div class="center" @click="isNavAndMenu ? hiddenMenuAndNav() : showMenuAndNav()"></div>
                <div class="right" @click="onNext" :style="maskButtonStyle"></div>
            </div>
            <!-- end    Mask -->

            <!-- widget Nav -->
            <nav-bar :isNavAndMenu="isNavAndMenu" />

            <!-- widget Menu -->
            <menu-bar 
              ref="menuBar"
              :isNavAndMenu="isNavAndMenu"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              @setFontSize="setFontSize"
              :themesList="themesList"
              :defaultTheme="defaultTheme"
              @setTheme="setTheme"
              :bookAvailable="bookAvailable"
              @onProgressChange="onProgressChange"
              :navigation="navigation"
              @jumpTo="jumpTo"/>
        </div>
    </div>
</template>

<script>
    import Epub from 'epubjs';

    import NavBar from '@/components/EBook/NavBar'
    import MenuBar from '@/components/EBook/MenuBar'

    // global.ePub = Epub;

    export default {
        name: 'EBook',
        props: {
            // 电子书文件
            book: {
                type: File,
                required: true,
            }
        },
        data() {
            return {
                // 根据Epubjs中获取的对象
                rendition: null,
                themes: null,
                locations: null,
                navigation: null,

                isNavAndMenu: false,   // Toggle 显示Nav和Menu
                defaultFontSize: 16,    // 默认字体大小
                // 字号列表
                fontSizeList: [
                    { fontSize: 12 },
                    { fontSize: 14 },
                    { fontSize: 16 },
                    { fontSize: 18 },
                    { fontSize: 20 },
                    { fontSize: 22 },
                    { fontSize: 24 }
                ],
                defaultTheme: 0,  // 默认主题索引
                // 主题样式
                themesList: [
                    {
                        name: 'default',
                        style: {
                            body: {
                                'color': '#000',
                                'background': '#fff'
                            }
                        }
                    },
                    {
                        name: 'eye',
                        style: {
                            body: {
                                'color': '#000',
                                'background': '#ceeaba'
                            }
                        }
                    },
                    {
                        name: 'night',
                        style: {
                            body: {
                                'color': '#fff',
                                'background': '#000'
                            }
                        }
                    },
                    {
                        name: 'gold',
                        style: {
                            body: {
                                'color': '#000',
                                'background': 'rgb(241, 236, 226)'
                            }
                        }
                    }
                    
                ],
                bookAvailable: false,   // 进度条是否可用
                
            }
        },
        computed: {
            maskStyle() {
                if(this.isNavAndMenu) return 'background-color: rgba(0, 0, 0, .15)'
            },
            // 将perv和next的宽度置于0，由于mask's center样式宽度为flex：1，所以center会享有mask的宽度100%
            maskButtonStyle() {
                if(this.isNavAndMenu) return 'width: 0';           
            }
        },
        components: {
            NavBar,
            MenuBar,
        },
        methods: {
            // 电子书的解析和渲染
            showEpub() {
                // 生成Book对象
                const epub = new Epub();
                const fileread = new FileReader();
                
                fileread.readAsArrayBuffer(this.book);
                fileread.onload = event => {
                    const bookData = event.target.result;
                    epub.open(bookData, "binary");
                };

                // 通过Book.renderTo() 生成Rendition
                this.rendition = epub.renderTo('read', {
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
                // 通过Rendition.display渲染电子书
                this.rendition.display();

                // 获取theme对象
                this.themes = this.rendition.themes;
                // 注册主题
                this.registerTheme();
                // 设置默认字体
                this.setFontSize(this.defaultFontSize);

                // 通过epubjs的钩子函数获取Locations对象
                epub.ready.then(() => {
                    this.navigation = epub.navigation;
                    return epub.locations.generate();
                }).then(result => {
                    console.log('loadding locations...');
                    this.locations = epub.locations;
                    console.log("loaded location.");

                    // locations 加载完成后，progress widget 设为 enabled
                    this.bookAvailable = true;
                });
            },

            // 上一页处理函数
            onPrev() {
                if(this.rendition) this.rendition.prev();
            },

            // 下一页处理函数
            onNext() {
                if(this.rendition) this.rendition.next();
            },

            // 显示 Menu and Nav
            showMenuAndNav() {
                this.isNavAndMenu = true;
            },

            // 隐藏 Menu and Nav
            hiddenMenuAndNav() {
                this.isNavAndMenu = false;
                // 调用子组件MenuBar的hiddenSetting方法隐藏Setting Widget
                this.$refs.menuBar.hiddenSetting();
            },

            // 设置字体大小
            setFontSize(size) {
                this.defaultFontSize = size;
                if(this.themes) this.themes.fontSize(size + 'px');
            },

            // 注册主题
            registerTheme() {
                this.themesList.forEach(item => {
                    this.themes.register(item.name, item.style);
                });
            },

            // 设置主题
            setTheme(index) {
                this.themes.select(this.themesList[index].name);
                this.defaultTheme = index;
            },

            // 进度条点击处理事件
            onProgressChange(progress) {
                const percentage = progress / 100;
                const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
                this.rendition.display(location);
            },

            // 根据链接跳转到指定的位置
            jumpTo(href) {
                this.rendition.display(href);
                this.hiddenMenuAndNav();
            },

            jumpToSelectBook() {
                this.$parent.jumpToSelectBook();
            },
        },
        mounted() {
            // 渲染电子书
            this.showEpub();
        },

    }
</script>

<style scoped>
    .read-wrapper {
        position: relative;
    }

    /*start    mask of style */
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        display: flex;
        width: 100%;
        transition: all .3s;
    }
    .left,
    .right {
        width: 2rem;
    }
    .center {
        flex: 1;
    }
    /* end    mask of style */
</style>
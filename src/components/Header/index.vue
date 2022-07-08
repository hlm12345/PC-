<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <!-- 没有用户名 未登录 -->
            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <routerLink class="register" to="/register">免费注册</routerLink>
            </p>
            <p v-else>
              <a>{{userName}}</a>
              <a href="#" @click.prevent="logOut"> | 退出登录 </a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link to="/home" class="logo" title="尚品汇" target="_blank">
            <img src="./images/logo.png" alt="">
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
            <!-- 使用编程式导航 -->
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 搜索按钮的回调函数 向Search跳转
    goSearch() {
      // params传参 和 query参数
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 模板字符串写法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 对象写法  常用
      //2:如何指定params参数可传可不传?
      //如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，URL会有问题的
      //如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号【params可以传递或者不传递
      // this.$router.push({ name: 'search', query: { k: this.keyword } })

      //面试题3 : params参数可以传递也可以不传递，但是如果传递是空串，如何解决?
      //使用undefined解诀: params参数可以传递、不传递（空的字符串)
      // 两种参数要带全
      if (this.$route.query) {
        let location = { name: 'search', params: { keyword: this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    // 退出登录
    async logOut() {
      //退出登录需要做的事情
      //1:需要发请求,通知服务器退出登录【清除一些数据:token】
      //2:清除项目当中的数据【userInfo、 token】
      try {
        await this.$store.dispatch('logOut')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name
    }
  },
  mounted() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
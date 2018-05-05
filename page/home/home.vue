<template>
  <div class="home">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <Row type="flex" style="height: 100%;">
        <Col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto">
          <div class="layout-logo-left" style="color: #fff;line-height: 30px;text-align: center">
            {{ title }}
          </div>
          <router-link to="/" exact active-class="active">
            <MenuItem name="1">
              <Icon type="ios-navigate" :size="iconSize"></Icon>
              <span class="layout-text">首页</span>
            </MenuItem>
          </router-link>

          <router-link to="user" active-class="active">
            <MenuItem name="2">
              <Icon type="ios-keypad" :size="iconSize"></Icon>
              <span class="layout-text">会员用户信息</span>
            </MenuItem>
          </router-link>

          <router-link to="parkinfo" active-class="active">
            <MenuItem name="3">
              <Icon type="ios-keypad" :size="iconSize"></Icon>
              <span class="layout-text">车位占用情况</span>
            </MenuItem>
          </router-link>

          <router-link to="cate" active-class="active">
            <MenuItem name="4">
              <Icon type="ios-analytics" :size="iconSize"></Icon>
              <span class="layout-text">分类模块</span>
            </MenuItem>
          </router-link>

          <router-link to="upload">
            <MenuItem name="5">
              <Icon type="ios-analytics" :size="iconSize"></Icon>
              <span class="layout-text">上传模块</span>
            </MenuItem>
          </router-link>

          <router-link to="news">
            <MenuItem name="6">
              <Icon type="ios-analytics" :size="iconSize"></Icon>
              <span class="layout-text">新闻模块</span>
            </MenuItem>
          </router-link>

          <router-link to="product">
            <MenuItem name="7">
              <Icon type="ios-analytics" :size="iconSize"></Icon>
              <span class="layout-text">产品模块</span>
            </MenuItem>
          </router-link>
        </Menu>
        </Col>
        <Col :span="spanRight">
        <div class="layout-header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
          <Button @click="logout">退出管理界面</Button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="#">首页</BreadcrumbItem>
            <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
            <BreadcrumbItem>某应用</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <router-view>

          </router-view>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
        </Col>
      </Row>
    </div>
    <Modal
      v-model="comfirm"
      title="系统提示"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>是否退出登录，并离开管理界面</p>
    </Modal>
  </div>
</template>

<script>
  import { clearCookie } from 'framework/vue/util';

  export default {
    name: 'home',
    data() {
      return {
        spanLeft: 5,
        spanRight: 19,
        title: '智能车库后台管理系统',
        comfirm: false
      };
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 5) {
          this.title = '管理系统';
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.title = '智能车库后台管理系统';
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      },
      logout() {
        this.comfirm = true;
      },
      ok () {
        clearCookie('name');
        window.location.href = '../login/login.html'
      },
      cancel () {
        this.$Message.info('取消');
      }
    }
  };
</script>

<style lang="less">
  html,body{
    min-height: 100%;
  }
  .home {
    height: 100%;
    .layout {
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      height: 100%;
    }

    .layout-breadcrumb {
      padding: 10px 15px 0;
    }

    .layout-content {
      min-height: 200px;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }

    .layout-content-main {
      padding: 10px;
    }

    .layout-copy {
      text-align: center;
      width: 100%;
      padding: 10px 0 20px;
      color: #9ea7b4;
      position: absolute;
      bottom: 0;
    }

    .layout-menu-left {
      background: #464c5b;
      min-height: 700px;
    }

    .layout-header {
      height: 60px;
      background: #fff;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .layout-logo-left {
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }

    .layout-ceiling-main a {
      color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
      display: none;
    }

    .ivu-col {
      transition: width 0.4s ease-in-out;
    }
  }
</style>

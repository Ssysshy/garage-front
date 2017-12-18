<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
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
  padding: 10px 0 20px;
  color: #9ea7b4;
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
  transition: width 0.2s ease-in-out;
}
</style>

<template>
    <div>
        <div v-if="login">
            <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
                <Row type="flex">
                    <Col :span="spanLeft" class="layout-menu-left">
                    <Menu active-name="1" theme="dark" width="auto">
                        <div class="layout-logo-left" style="color: #fff;line-height: 30px;text-align: center">
                            智能车库后台管理系统
                        </div>
                        <MenuItem name="1">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="/" exact active-class="active">
                                首页
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="user" active-class="active">
                                会员用户信息
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="parkinfo" active-class="active">
                                车位占用进度
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="cate" active-class="active">
                                分类模块
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="5">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="upload">
                                上传模块
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="6">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="news">
                                新闻模块
                            </router-link>
                        </span>
                        </MenuItem>
                        <MenuItem name="7">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                            <router-link to="product">
                                产品模块
                            </router-link>
                        </span>
                        </MenuItem>
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
        </div>
        <div v-else>
            <div style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%) translateY(-100%);border: 1px solid #ccc;border-radius: 10px;padding: 40px">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.name" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <br>
                    <FormItem style="position: absolute;left: 50%;transform: translateX(-60%)">
                        <Button type="success" long @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      spanLeft: 5,
      spanRight: 19,
      formInline: {
        name: "",
        password: ""
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24;
    },
    ...mapGetters(["login"])
  },
  methods: {
    logout() {
      this.checkLogin(false);
      delete localStorage.login;
    },
    toggleClick() {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    },
    ...mapActions(["checkLogin"]),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            name: this.formInline.name,
            password: this.formInline.password
          };
          this.$http
            .post("http://localhost:3000/users/data/checklogin", data)
            .then(res => {
              if (res.data[0].name != "") {
                this.checkLogin(true);
                localStorage.login = true;
                this.$Message.success("登录成功!");
              } else {
                this.$Message.success("用户名或密码错误!");
              }
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    }
  },
  created() {
    this.checkLogin(localStorage.login);
  }
};
</script>
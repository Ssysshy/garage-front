<template>
  <div class="login">
    <div
      style="position: absolute;left: 50%;top: 50%;transform: translateX(-50%) translateY(-100%);border: 1px solid #ccc;border-radius: 10px;padding: 40px">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <h1>管理系统登陆</h1>
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
    <Modal
      v-model="comfirm"
      title="系统提示"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>系统检测到您已登录，是否跳转到管理界面</p>
    </Modal>
  </div>
</template>

<script>
  import { setCookie, getCookie } from 'framework/vue/util';

  export default {
    name: 'login',
    data() {
      return {
        comfirm: false,
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
    methods: {
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
                console.log(res);
                if (res.data[0].name !== "") {
                  this.$Message.success("登录成功!");
                  setCookie('name', data.name, 10);
                  setTimeout(function() {
                    window.location.href = '../home/home.html'
                  }, 200)
                } else {
                  this.$Message.success("用户名或密码错误!");
                }
              });
            console.log(data);
          } else {
            this.$Message.error("表单验证失败!");
          }
        });
      },
      checkCookie(key) {
        const username = getCookie(key);
        if (username !== null && username !== '') {
          this.comfirm = true;
        }
      },
      ok () {
        window.location.href = '../home/home.html'
      },
      cancel () {
        this.$Message.info('取消');
      }
    },
    created() {
      this.checkCookie('name');
    }
  };
</script>

<style lang="less">
  .login {
    h1{
      text-align: center;
      position: relative;
      left: -6px;
      top: -10px;
    }
  }
</style>

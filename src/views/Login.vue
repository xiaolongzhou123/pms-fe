<script setup lang="ts">

// import { GetMenu } from '@/utils/request/menu'
// import { GetNav } from '@/utils/request/user'
import { GetNav, GetMenu, Login } from '@/utils/request'
import type { ILogin, ILoginData, Menu, Nav } from '@/typeing'
import { createLoginData } from '@/typeing'
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next';
import { useNav, useMenu, useLogin } from '@/stores'
import { reactive, ref, toRef } from 'vue'
import router from '@/router';



// const INITIAL_DATA = {
//   phone: '',
//   account: 'admin',
//   password: 'admin',
//   verifyCode: '',
//   checked: false,
// };
const formData = reactive({
  phone: '',
  account: 'jiuweihu',
  password: '12345678',
  verifyCode: '',
  checked: false,
});
const type = ref('password');
const showPsw = ref(false);
const form = ref<FormInstanceFunctions>();

const FORM_RULES: Record<string, FormRule[]> = {
  phone: [{ required: true, message: '手机号必填', type: 'error' }],
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};


const navstore = useNav() // uses the testing pinia!
const menustore = useMenu() // uses the testing pinia!
const loginstore = useLogin()

//git clone https://github.com/xiaolongzhou123/vue3-api
//{"code":200,"message":"ok","data":[{"id":1,"name":"aa"},{"id":2,"name":"bb"}]}
//后端的数组结构，必须按，code,message,data来做处理
//后端必须直接返回数据结构
// GetNav().then((list: Nav[]) => {
//   navstore.UpdateNav(list)
// });


GetMenu().then((list: Menu[]) => {
  console.log("==list:", list)
  const parents = list.filter(routeInfo => routeInfo.pid === 0),
    children = list.filter(routeInfo => routeInfo.pid !== 0)

  console.log(parents, children)
  dataToTree(parents, children)
  menustore.UpdateMenu(parents)
});

function dataToTree(parents: Menu[], children: Menu[]) {
  parents.map(parent => {
    children.map((child, index) => {
      if (child.pid === parent.id) {
        let _children: Menu[] = JSON.parse(JSON.stringify(children))
        _children.splice(index, 1);
        dataToTree([child], _children)
        if (parent.children) {
          parent.children.push(child);
        } else {
          parent.children = [child]
        }
      }
    })
  })
}


const onSubmit = (param: any) => {
  if (param.validateResult === true) {
    const data = createLoginData(formData.account, formData.password)
    Login(data).then((res: ILogin) => {

      console.log("try res==", res.access_token, res.refresh_token)
      loginstore.UpdateLogin(res)

      // router.push()
    }).catch(error => {
      MessagePlugin.error("登陆失败：" + error);
      console.log(error)
    });
  }
};


</script>

<template>
  <div class="login-box">
    <t-form ref="form" :class="['item-container', `login-${type}`]" :data="formData" label-width="0" :rules="FORM_RULES"
      @submit="onSubmit">
      <template v-if="type == 'password'">
        <t-form-item name="account">
          <t-input v-model="formData.account" size="large" placeholder="请输入账号：admin">
            <template #prefix-icon>
              <t-icon name="user" />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input v-model="formData.password" size="large" :type="showPsw ? 'text' : 'password'" clearable
            placeholder="请输入登录密码：admin">
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
            <template #suffix-icon>
              <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
            </template>
          </t-input>
        </t-form-item>

        <!-- <div class="check-container remember-pwd">
                                                                                                                                                                                                                          <t-checkbox>记住账号</t-checkbox>
                                                                                                                                                                                                                          <span class="tip">忘记账号？</span>
                                                                                                                                                                                                                        </div> -->
      </template>

      <t-form-item v-if="type !== 'qrcode'" class="btn-container">
        <t-button block size="large" type="submit"> 登录 </t-button>
      </t-form-item>


    </t-form>
  </div>
</template>


<style lang="less">
.login-box {
  max-width: 320px;
  margin: 100px auto;
}
</style>

<template>
    <div>
        <div style="padding: 5px">
            <Button type="primary" @click="openAdd">添加节点</Button>
            <Button type="primary">删除节点</Button>
            <Button type="primary">上传分类</Button>
            <Button type="primary">新闻分类</Button>
            <Button type="primary">产品分类</Button>
            <Button type="primary">其他分类</Button>
        </div>
        <Tree :data="data"></Tree>
        <Modal
                v-model="modal"
                title="对话框标题"
                :loading="loading"
                @on-ok="asyncOK">
            <Input v-model="value" placeholder="请输入..." style="width: 480px;margin: 10px"></Input>
            <Button type="primary" style="margin-left: 140px">
                <Icon type="chevron-left"></Icon>
                添加根节点
            </Button>
            <Button type="primary">
                添加子节点
                <Icon type="chevron-right"></Icon>
            </Button>
        </Modal>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                data: [],
                modal: false,
                loading: true,
                value: ''
            }
        },
        created(){
            this.$http.get('http://localhost:3000/cate/list')
                .then(res=>{
//                    console.log(res);
                    this.data = res.data;
                })
        },
        methods: {
            asyncOK () {
                setTimeout(() => {
                    this.modal = false;
                }, 2000);
            },
            openAdd(){
                this.modal = true;
            }
        }
    }
</script>
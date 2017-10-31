<template>
    <div>
        <div style="padding: 5px">
            <Button type="primary" @click="openAdd">添加节点</Button>
            <Button type="primary" @click="confirm">删除节点</Button>
            <Button @click="totalDivice" style="margin-left: 25px">
                <Icon type="merge" size=15></Icon>
                总分类
            </Button>
            <Button type="ghost" icon="" shape="circle" @click="deviceTree(1)" >
                <Icon type="network" size=15></Icon>
                上传分类
            </Button>
            <Button type="ghost" shape="circle" @click="deviceTree(2)">
                <Icon type="ios-lightbulb" size=15></Icon>
                新闻分类
                </Button>
            <Button type="ghost" shape="circle" @click="deviceTree(3)">
                <Icon type="bug" size=15></Icon>
                产品分类
            </Button>
            <Button type="ghost" shape="circle" @click="deviceTree(4)">
                <Icon type="code-working" size=15></Icon>
                其他分类
            </Button>
        </div>
        <Tree :data="data" @on-select-change="selectionNode"></Tree>
        <Modal
                v-model="modal"
                title="节点操作">
            <Input v-model="title" placeholder="请输入节点名..." style="width: 480px;margin: 10px"></Input>
            <input v-model="parentId" style="margin-left: 85px;width: 200px;display: none">
            <Button type="primary" style="margin-left: 140px" @click="addRootNode">
                <Icon type="chevron-left"></Icon>
                添加根节点
            </Button>
            <Button type="primary" @click="addChildNode">
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
                title: '',
                parentId: '',
                Id:'',
                typeValue:0,
            }
        },
        created(){
            this.$http.get('http://localhost:3000/cate/list')
                .then(res => {
//                    console.log(res);
                    this.data = res.data;
                })
        },
        methods: {
            totalDivice(){
                this.typeValue=0,
                this.$http.get('http://localhost:3000/cate/list')
                    .then(res => {
//                    console.log(res);
                        this.data = res.data;
                    })
            },
            deviceTree(Num){
                this.typeValue = Num;
                var data = {typeValue : this.typeValue};
//
                this.$http.post('http://localhost:3000/cate/device',data)
                    .then(res => {
                        this.data = res.data;
                    })
            },
            confirm () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            reGetData(){
                var data = {typeValue : this.typeValue}
                this.$http.post('http://localhost:3000/cate/device',data)
                    .then(res => {
                        this.data = res.data;
                    })
            },
            openAdd(){
                if (this.typeValue>0) {
                    this.modal = true;
                }else{
                    this.$Notice.error({
                        title: '通知',
                        desc: '请选择分类'
                    });
                };
            },
            removeit(){
                this.$http.delete('http://localhost:3000/cate/data/'+this.Id)
                    .then(res=>{
                        this.reGetData();
                        this.modal = false;
                        this.$Notice.success({
                            title: '通知',
                            desc: '删除成功'
                        });
                    })
            },
            selectionNode(node){
                this.parentId = node[0]._id;
                this.Id = node[0]._id;
                console.log(node);
            },
            addRootNode(){
                var data = {title: this.title,typeValue:this.typeValue};
                this.$http.post('http://localhost:3000/cate/data',data)
                    .then(res=>{
                        this.reGetData();
                        this.modal = false;
                        this.$Notice.success({
                            title: '通知',
                            desc: '增加根节点成功'
                        });
                    })
            },
            addChildNode(){
                if (this.parentId && this.parentId.length>0) {
                    var data = {title: this.title,parentId:this.parentId,typeValue:this.typeValue};
                    this.$http.post('http://localhost:3000/cate/data',data)
                        .then(res=>{
                            this.reGetData();
                            this.modal = false;
                            this.$Notice.success({
                                title: '通知',
                                desc: '增加子节点成功'
                            });
                        })
                }else{
                    this.$Message.info('请选择父节点');
                };
            },
            confirm () {
                if (this.Id && this.Id.length>0) {
                    this.$Modal.confirm({
                        title: '节点操作对话框',
                        content: '<p>删除节点将不可恢复</p>',
                        onOk: () => {
                            this.removeit()
                        },
                        onCancel: () => {
                            this.$Message.info('取消操作');
                        }
                    });
                };

            },
        }
    }
</script>
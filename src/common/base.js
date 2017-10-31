export default {
    data () {
        return {
            ids: [],
            filter: {
                list: [],
                total: 0,
                page: 1,
                rows: 10,  //每页限制条数
                name: '',
                id: ''
            },
            modal: false,
        }
    },

    methods: {
        onAdd(){
            this.$refs['formValidate'].resetFields();
            delete this.formValidate._id;
            this.modal = true;
        },
        show (params) {
            console.log(params);
            this.modal = true;
            Object.assign(this.$data.formValidate,params.row)
        },
        getData(){
            this.$http.post(`http://localhost:3000/${this.module}/list`, this.filter)
                .then(res => {
                    this.filter.list = res.data.rows;
                    this.filter.page = res.data.page;
                    this.filter.total = res.data.total;
                })
        },
        remove (index, id) {

            this.$Modal.confirm({
                title: '确认删除该条数据',
                content: '<p>删除将无法恢复</p>',
                onOk: () => {
                    this.filter.list.splice(index, 1);
//                console.log(id);
                    this.filter.id = id;
                    this.$http.delete(`http://localhost:3000/${this.module}/data/` + this.filter.id)
                        .then(res => {
                            this.$Message.info('删除成功');
                        })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });

        },
        onChangePage(page){
            console.log(page);
            this.filter.page = page;
            this.getData();
        },
        onChangePageSize(size){

            this.filter.rows = size;
            this.getData();
        },
        onSearch(){
            this.getData();
        },
        onDeletes(){
            if (this.ids && this.ids.length > 0) {
                this.$Modal.confirm({
                    title: '确认删除该条数据',
                    content: '<p>删除将无法恢复</p>',
                    onOk: () => {
                        this.$http.post(`http://localhost:3000/${this.module}/deletes`, {ids: this.ids.toString()})
                            .then(res => {
                                this.$Message.info('删除成功');
                                this.getData();
                            })
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            }
            ;
        },
        onSelectionChange(selection){
            if (selection && selection.length > 0) {
                var ids = [];
                var leng = selection.length;
                for (var i = 0; i < leng; i++) {
                    ids.push(selection[i]._id);
                }
                ;
                this.ids = ids;
            }
            ;
        },
        ok () {
            this.$Message.info('确定');
        },
        cancel () {
            this.$Message.info('取消');
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                    if (this.formValidate._id && this.formValidate._id.length>0) {
                        this.$http.put(`http://localhost:3000/${this.module}/data/`+this.formValidate._id,this.formValidate)
                            .then(res=>{
                                this.getData();
                                this.$Message.success('修改成功!');
                                this.modal = false;
                            })
                    }else{
                        this.$http.post(`http://localhost:3000/${this.module}/data`,this.formValidate)
                            .then(res=>{
                                this.getData();
                                this.$Message.success('提交成功!');
                                this.modal = false;
                            })
                    };
                    console.log(this.formValidate);
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    },
    created(){
        this.getData();
    }
}
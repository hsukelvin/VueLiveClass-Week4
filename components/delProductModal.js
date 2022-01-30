export default {
    data() {
        return {
            //text: '刪除modal',
            url: 'https://vue3-course-api.hexschool.io/v2',
            api_Path: 'skps0102',
        }
    },
    props: ['tempItem'],
    methods: {
        removeProduct() { //刪除產品
            const { id } = this.tempItem;
            axios.delete(`${this.url}/api/${this.api_Path}/admin/product/${id}`)
                .then(res => {
                    alert(res.data.message);
                    //更新頁面
                    this.$emit('update-page');
                    //關閉modal
                    this.$emit('close-modal', 'remove', 'close');
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
    },
    updated() {
        //console.log('updated!', this.tempItem); //取得到
    },
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
            aria-labelledby="delProductModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 id="delProductModalLabel" class="modal-title">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        是否刪除
                        <strong class="text-danger">{{ tempItem.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click="removeProduct">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>`
}
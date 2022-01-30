export default {
    data() {
        return {
            //text: '產品modal',
            url: 'https://vue3-course-api.hexschool.io/v2',
            api_Path: 'skps0102',
        }
    },
    props: ['tempItem','type'],
    methods: {
        addProduct() { //新增產品
            const product = {
                data: this.tempItem
            };
            axios.post(`${this.url}/api/${this.api_Path}/admin/product`, product)
                .then(res => {
                    alert(res.data.message);
                    //更新頁面
                    this.$emit('update-page');
                    //關閉modal
                    this.$emit('close-modal', 'add', 'close');
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        modifyProduct() { //修改產品
            const { id } = this.tempItem;
            const product = {
                data: this.tempItem
            };
            axios.put(`${this.url}/api/${this.api_Path}/admin/product/${id}`, product)
                .then(res => {
                    alert(res.data.message);
                    //更新頁面
                    this.$emit('update-page');
                    //關閉modal
                    this.$emit('close-modal','modify','close');
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        addImg() {
            if (this.tempItem.imagesUrl === undefined) {
                this.tempItem.imagesUrl = [];
                this.tempItem.imagesUrl.push('');
            } else {
                this.tempItem.imagesUrl.push('');
            }
        },
        removeImg() {
            this.tempItem.imagesUrl.pop();
        }
    },
    template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 id="productModalLabel" class="modal-title">
                            <span>{{ type }}</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="mb-2">
                                    <div class="mb-3">
                                        <label for="imageUrl" class="form-label">主要圖片</label>
                                        <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempItem.imageUrl">
                                    </div>
                                    <img class="img-fluid" :src="tempItem.imageUrl" alt="">
                                </div>
                                <div class="h3">多圖新增</div>
                                <div class="mb-2" v-if="tempItem.imagesUrl !== undefined && tempItem.imagesUrl.length !== 0">
                                    <template v-for="(imgUrl, i) in tempItem.imagesUrl" :key="i">
                                        <div class="mb-3">
                                            <label for="imageUrl" class="form-label">圖片網址</label>
                                            <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempItem.imagesUrl[i]">
                                        </div>
                                        <img class="img-fluid" :src="imgUrl">
                                    </template>
                                    <div v-if="!tempItem.imagesUrl.length || tempItem.imagesUrl[tempItem.imagesUrl.length - 1]">
                                        <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImg">
                                            新增圖片
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-outline-danger btn-sm d-block w-100" @click="removeImg">
                                            刪除圖片
                                        </button>
                                    </div>
                                </div>
                                <div v-else>
                                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImg">
                                        新增圖片
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="mb-3">
                                    <label for="title" class="form-label">標題</label>
                                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempItem.title">
                                </div>
    
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="category" class="form-label">分類</label>
                                        <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempItem.category">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="price" class="form-label">單位</label>
                                        <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempItem.unit">
                                    </div>
                                </div>
    
                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <input id="origin_price" type="number" min="0" class="form-control"
                                            placeholder="請輸入原價" v-model.number="tempItem.origin_price">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="price" class="form-label">售價</label>
                                        <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempItem.price">
                                    </div>
                                </div>
                                <hr>
    
                                <div class="mb-3">
                                    <label for="description" class="form-label">產品描述</label>
                                    <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempItem.description">
                        </textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="content" class="form-label">說明內容</label>
                                    <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempItem.content">
                        </textarea>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input id="is_enabled" class="form-check-input" type="checkbox" v-model.number="tempItem.is_enabled" :true-value="1"
                                            :false-value="0">
                                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="type !== '編輯產品'? addProduct(): modifyProduct()">
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>`
}
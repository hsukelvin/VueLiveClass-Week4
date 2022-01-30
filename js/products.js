import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js";
import componentDeleteModal from "../components/delProductModal.js";
import componentProductModal from "../components/productModal.js";
import componentPagination from "../components/pagination.js";

let productModal = {};
let delProductModal = {};

const app = createApp({
    //區域註冊元件由 ESM module 外部匯入
    components: {
        'delete-modal': componentDeleteModal,
        'product-modal': componentProductModal,
        'pagination': componentPagination
    },
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            api_Path: 'skps0102',
            Type: '',
            products: [], //存放api回傳的產品資料
            pagiData: {}, //存放api回傳的分頁資料
            tempItem: {
                // title: '',
                // category: '',
                // origin_price: parseInt(''),
                // price: parseInt(''),
                // unit: '',
                // description: '',
                // content: '',
                // is_enabled: parseInt(''),
                // imageUrl: '',
                //imagesUrl: []
            }
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    // 登入成功取得產品資料
                    this.getProducts();
                })
                .catch(err => {
                    alert(err.data.message);
                });
        },
        clearTempItem() {
            this.tempItem = {};
        },
        editData(item) {
            this.tempItem = JSON.parse(JSON.stringify(item));
        },
        toggleModal(request, action) {
            //console.log('執行Modal Action', request, action);
            if (request === 'add' || request === 'modify') {
                if (action === 'open') {
                    productModal.show();
                } else {
                    productModal.hide();
                }
                return;
            }

            if (request === 'remove') {
                if (action === 'open') {
                    delProductModal.show();
                } else {
                    delProductModal.hide();
                }
                return;
            }
        },
        getProducts(page = 1) {
            //console.log('getProducts() page', page);
            axios.get(`${this.url}/api/${this.api_Path}/admin/products?page=${page}`)
                .then((res) => {
                    const { products, pagination } = res.data;
                    this.products = products;
                    this.pagiData = pagination;
                }).catch((err) => {
                    alert(err.data.message);
                    window.location = 'login.html';
                })
        }
    },
    mounted() {
        // 自訂操作Modal
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        // 取出存放在cookie內的token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 將token設定在http request header內
        axios.defaults.headers.common['Authorization'] = token;
        // 確認是否登入
        this.checkLogin();
    }
})

app.mount('#app');
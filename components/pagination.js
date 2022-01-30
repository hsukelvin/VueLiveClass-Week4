export default {
    data() {
        return {
            //text: '分頁'
        }
    },
    props: ['pagidata'],
    methods: {
        emitPages(page) {
            this.$emit('update-page',page);
        }
    },
    mounted() {
        //console.log('mounted',this.pagidata); //取不到
    },
    updated() {
        //console.log('updated!', this.pagidata); //取得到
    },
    template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{'disabled': pagidata.current_page === 1}"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="emitPages(pagidata.current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="(item, index) in pagidata.total_pages"
            :key="index"
            class="page-item"
            :class="{'active': item === pagidata.current_page}"
          >
            <span
              class="page-link"
              v-if="item === pagidata.current_page"
            >{{ item }}</span>
            <a
              class="page-link"
              href="#"
              v-else
              @click.prevent="emitPages(item)"
            >{{ item }}</a>
          </li>
          <li
            class="page-item"
            :class="{'disabled': pagidata.current_page === pagidata.total_pages}"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="emitPages(pagidata.current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>`
}
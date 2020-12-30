  
<template>
  <a-button class="o_btn" type="primary" @click="showAddModal"> 新增回访记录 </a-button>
  <a-modal
    v-model:visible="addModel.visible"
    title="新增回访记录"
    @ok="handleAddOk"
  >
    <template #footer>
      <a-button key="back" @click="handleAddCancel"> 取消 </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="addModel.loading"
        @click="handleAddOk($event)"
      >
        新增
      </a-button>
    </template>

    <div>
      <label for="region">
        <span>服务区域：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="project">
        <span>服务项目：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="seller">
        <span>销售平台：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="maintainer">
        <span>维护商名：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="acceptance">
        <span>受理单号：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="sales">
        <span>销售单ID：</span>
        <a-input class="o_width" type="text" />
      </label>
      <label for="telephone">
        <span>客户电话：</span>
        <a-input class="o_width" type="text" />
      </label>
    </div>
  </a-modal>
  <a-input-search
    placeholder="请输入要查询得受理单号"
    style="width: 200px"
    @search="Search"
    class="o_search"
  />
  <a-table class="o_table" :columns="columns" :data-source="data">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #action="">
      <span>
        <a-button type="dashed" @click="showUpdateModal"> 修改 </a-button>
        <!-- 修改记录 -->
        <a-modal
          v-model:visible="updateModel.visible"
          title="修改回访记录"
          @ok="handleUpdateOk"
        >
          <template #footer>
            <!-- <a-button key="back" @click="handleUpdateCancel"> 取消 </a-button> -->
            <a-button
              key="submit"
              type="primary"
              :loading="updateModel.loading"
              @click="handleUpdateOk($event)"
            >
              确认保存
            </a-button>
          </template>

          <div>
            <label for="region">
              <span>服务区域：{{ data[0].key }}</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].region"
              />
            </label>
            <label for="project">
              <span>服务项目：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].project"
              />
            </label>
            <label for="seller">
              <span>销售平台：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].seller"
              />
            </label>
            <label for="maintainer">
              <span>维护商名：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].maintainer"
              />
            </label>
            <label for="acceptance">
              <span>受理单号：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].acceptance"
              />
            </label>
            <label for="sales">
              <span>销售单ID：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].sales"
              />
            </label>
            <label for="telephone">
              <span>客户电话：</span>
              <a-input
                class="o_width"
                type="text"
                v-model:value="data[new_key - 1].telephone"
              />
            </label>
          </div>
        </a-modal>
        <!-- <a-divider type="vertical" /> -->

        <a-button type="danger" @click="showDelModal"> 删除 </a-button>
        <a-modal
          title="确认删除"
          v-model:visible="delModel.visible"
          :confirm-loading="confirmLoading"
          @ok="handleDelOk"
        >
          <p>{{ delModel.ModalText }}</p>
        </a-modal>
      </span>
    </template>
  </a-table>
</template>
<script>
import { computed, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

export default {
  setup() {
    const addModel = reactive({
      visible: false,
      loading: false,
    });
    const delModel = reactive({
      ModalText: "确认删除该条记录么？",
      visible: false,
      loading: false,
    });
    const updateModel = reactive({
      visible: false,
      loading: false,
    });
    const seller_options = reactive([
      {
        value: "天猫",
        label: "天猫",
        children: [
          {
            value: "沁园旗舰店",
            label: "沁园旗舰店",
          },
          {
            value: "沁园净水旗舰",
            label: "沁园净水旗舰",
          },
        ],
      },
      {
        value: "京东",
        label: "京东",
        children: [
          {
            value: "沁园京东自营旗舰店",
            label: "沁园京东自营旗舰店",
          },
        ],
      },
      {
        value: "苏宁易购官方旗舰店（天猫）",
        label: "苏宁易购官方旗舰店（天猫）",
      },
    ]);
    let key = 6;

    const store = useStore();
    const columns = computed(() => store.state.columns);
    const data = computed(() => store.state.data);
    const new_key = computed(() => store.state.new_key);
    const del_key = computed(() => store.state.del_key);

    const { ctx } = getCurrentInstance();
    console.log(ctx);

    // 添加记录
    const showAddModal = () => {
      addModel.visible = true;
    };
    const handleAddOk = (e) => {
      const dataArr = [
        "key",
        "region",
        "project",
        "seller",
        "maintainer",
        "acceptance",
        "sales",
        "telephone",
      ];
      let addArr = e.path[2].children[2].children[0].children;
      let addOrderObj = {};
      key++;

      addArr.forEach((item, index) => {
        addOrderObj[dataArr[0]] = key;
        addOrderObj[dataArr[index + 1]] = item.children[1].value;
      });

      store.state.data.push(addOrderObj);
      addModel.visible = false;
      message.info("添加成功！");
    };
    const handleAddCancel = () => {
      addModel.visible = false;
    };

    // 删除记录
    const showDelModal = (e) => {
      delModel.visible = true;
      // 对应订单的id
      store.state.del_key = e.target.parentNode.parentNode.parentNode.getAttribute(
        "data-row-key"
      );

      console.log("shanchu ", store.state.del_key);
    };
    const handleDelOk = () => {
      delModel.confirmLoading = true;
      setTimeout(() => {
        del();
        delModel.visible = false;
        delModel.confirmLoading = false;
        message.info("删除成功！");
      }, 500);
    };
    const del = () => {
      let del_index = store.state.data.findIndex((item) => {
        if (item.key == store.state.del_key) {
          return true;
        }
      });
      store.state.data.splice(del_index, 1);
    };

    // 修改记录
    const showUpdateModal = (e) => {
      updateModel.visible = true;
      console.log(e);
      // 对应订单的id
      store.state.new_key = e.target.parentNode.parentNode.parentNode.getAttribute(
        "data-row-key"
      );
      console.log("修改记录", store.state.new_key);
    };
    const handleUpdateOk = () => {
      updateModel.visible = false;
      message.info("修改成功！");
    };
    const handleUpdateCancel = () => {
      updateModel.visible = false;
    };

    const dataList = store.state.data;
    // 查询
    const Search = (value) => {
      let newList = [];
      dataList.forEach((item ) => {
        if(value === item.acceptance) {
          newList.push(item);
        }
        store.state.data = newList;
        console.log(newList);
      })
    };

    return {
      new_key,
      del_key,
      columns,
      data,
      addModel,
      delModel,
      updateModel,
      showAddModal,
      handleAddOk,
      handleAddCancel,
      seller_options,
      del,
      handleDelOk,
      showDelModal,
      showUpdateModal,
      handleUpdateOk,
      handleUpdateCancel,
      Search,
    };
  },
};
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
  height: 50px;
}
label span {
  width: 100px;
}
.o_width {
  width: 300px;
}
.o_btn{
  margin-right: 50px;
}
</style>
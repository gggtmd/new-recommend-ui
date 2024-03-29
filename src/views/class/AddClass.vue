<script>
import {classesSaveServer} from '@/api/classes.js'
import {questionBankListServer} from '@/api/question-bank.js'
import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()
export default {
  data() {
    const validateClassName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('课程名不能为空'));
      } else {
        callback();
      }
    };
    const validateDescription = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('课堂简介不能为空'));
      } else {
        callback();
      }
    };
    const validateCategoryId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('课堂类别不能为空'));
      } else {
        callback();
      }
    };
    const validateClassPicture = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('课堂图片不能为空'));
      } else {
        callback();
      }
    };
    return {
      classes: {
        className: "",
        classPicture: "",
        description: "",
        categoryId: '',
        createUserId: 0,
        classHours: '',
        classCredit: '',
      },
      pictureFile: [],
      formData: new FormData(),
      dialogFormVisible: false,
      isLoading: false,
      rules: {
        className: [
          { validator: validateClassName, trigger: 'blur' }
        ],
        description: [
          { validator: validateDescription, trigger: 'blur' }
        ],
        categoryId: [
          { validator: validateCategoryId, trigger: 'change' }
        ],
        classPicture: [
          { validator: validateClassPicture, trigger: 'change' }
        ],
      },
      //选择器选项
      classCategoryOptions: [],
    };
  },
  created() {
    questionBankListServer()
      .then((res) => {
        this.classCategoryOptions.push(...res.map((item) => {
          return {
            label: item.bankName,
            value: item.bankId,
          }
        }))
      })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          this.classes.createUserId = userInfoStore.userInfo.userId;
          let res = await classesSaveServer(this.classes, this.formData)
          if(res.code === 200) {
            this.dialogVisible()
            this.$emit("afterAdd");
            let routeData = this.$router.resolve({
              path: '/classKnowledge',
              param: {
                classId: res.data.classId,
                categoryId: res.data.categoryId
              }
            })
            window.open(routeData.href, '_blank');
          } else {
            this.$message.error(res.msg);
          }
          this.isLoading = false;
        }
      });
    },
    handleChange(file){
      this.formData.append("file",file.raw);
    },
    dialogVisible(){
      this.dialogFormVisible = !this.dialogFormVisible;
    },
  }
}
</script>

<template>
  <el-dialog
    class="dialog"
    title="新增课程"
    v-model="dialogFormVisible"
    width="500px"
    :destroy-on-close="true"
    :modal-append-to-body="false"
  >
    <el-form :model="classes" :rules="rules" ref="classes" label-width="80px">
      <el-form-item label="课堂名:" prop="className">
        <el-input v-model="classes.className"></el-input>
      </el-form-item>
      <el-form-item label="课堂学分:" prop="classCredit">
        <el-input v-model="classes.classCredit"></el-input>
      </el-form-item>
      <el-form-item label="课堂学时:" prop="classHours">
        <el-input v-model="classes.classHours"></el-input>
      </el-form-item>
      <el-form-item label="课堂类别:" prop="categoryId">
        <el-select v-model="classes.categoryId" placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in classCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课堂图片:" prop="pictureFile">
        <el-upload
            class="upload-demo"
            action="#"
            :on-change="handleChange"
            :auto-upload="false"
            :limit="1"
            :file-list="pictureFile">
          <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="课堂简介:" prop="description">
        <el-input
            v-model="classes.description"
            type="textarea"
            maxlength="500"
            :show-word-limit="true"
            rows="6"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible">取 消</el-button>
      <el-button type="primary" @click="submitForm('classes')" :loading = isLoading>添 加</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>
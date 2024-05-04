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
      this.classes.classPicture = file.name
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
    v-model="dialogFormVisible"
    width="500px"
    :destroy-on-close="true"
    :modal-append-to-body="false"
    style="border-radius: 20px; padding: 20px 25px 15px"
  >
    <template #header>
      <div class="title">新增课堂</div>
    </template>
    <el-form :model="classes" :rules="rules" ref="classes">
      <el-form-item prop="className">
        <el-input v-model="classes.className" placeholder="课堂名"></el-input>
      </el-form-item>
      <el-form-item prop="classCredit">
        <el-input v-model="classes.classCredit" placeholder="课堂学分"></el-input>
      </el-form-item>
      <el-form-item prop="classHours">
        <el-input v-model="classes.classHours" placeholder="课堂学时"></el-input>
      </el-form-item>
      <el-form-item prop="categoryId">
        <el-select v-model="classes.categoryId" placeholder="课堂类别" style="width: 100%;">
          <el-option v-for="item in classCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="pictureFile" class="image-form-item">
        <el-input class="image-input" v-model="classes.classPicture" placeholder="课堂图片" disabled>
        </el-input>
        <el-upload
          class="upload"
          action="#"
          :on-change="handleChange"
          :auto-upload="false"
          :limit="1"
          :file-list="pictureFile">
          选择
        </el-upload>
      </el-form-item>
      <el-form-item prop="description">
        <el-input
          v-model="classes.description"
          placeholder="课堂简介"
          type="textarea"
          maxlength="500"
          :show-word-limit="true"
          rows="3"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible">取 消</el-button>
      <el-button type="primary" @click="submitForm('classes')" :loading = isLoading>添 加</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.title {
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 10px;
}
.el-form-item {
  height: 45px;
  margin: 0 10px 20px;
}
.el-form-item:last-child {
  height: auto;
}
.el-input,
.el-select{
  height: 100%;
}
.image-form-item {
  position: relative;
}
.upload {
  position: absolute;
  top: 6px;
  bottom: 6px;
  right: 8px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--el-border-color);
  color: #4293fd;
  font-weight: bold;
  letter-spacing: 1px;
  text-indent: 1px;
}
::v-deep(.el-upload) {
  height: 100%;
  width: 100%;
}
.upload::v-deep(.el-upload-list) {
  margin: 0;
  display: none;
}
.el-input::v-deep(.el-input__wrapper),
.el-select::v-deep(.el-select__wrapper),
.el-input::v-deep(.el-input-group__append),
.el-textarea::v-deep(.el-textarea__inner){
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
  font-size: 1rem;
}
.el-textarea::v-deep(.el-textarea__inner) {
  font-size: 0.9rem;
  padding: 8px 12px;
}
.el-textarea::v-deep(.el-input__count) {
  background-color: transparent;
}
</style>
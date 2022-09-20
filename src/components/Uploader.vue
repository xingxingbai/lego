<template>
  <button @click="triggerUpload">
    点击上传
  </button>
  <input type="file" @change="handleFileChange" style="display: none" ref="fileInput">
  <ul :class="`upload-list upload-list-${listType}`">
    <li :class="`uploaded-file upload-${file.status}`"
      v-for="file in filesList" 
      :key="file.uid">
      <img
        v-if="file.url && listType === 'picture'"
        class="upload-list-thumbnail"
        :src="file.url"
        :alt="file.name"
      >
      <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined/></span>
      <span v-else class="file-icon"><FileOutlined/></span>
      <span class="filename">{{file.name}}</span>
      <span class="delete-icon" @click="removeFile(file.uid)"><DeleteOutlined/></span>
    </li>
  </ul>
</template>


<script lang="ts">

import { ref, reactive, defineComponent, PropType } from 'vue';
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
import { v4 as uuidv4 } from 'uuid'
type UploadStaus = 'ready' | 'loading' | 'success' | 'error'
type FileListType = 'picture' | 'text'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStaus;
  raw: File;
  resp?: any;
  url?: string;
}
export default defineComponent({
  name: "Uploader",
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined
  },
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function
    },
    listType: {
      type: String as PropType<FileListType>,
      default: 'text'
    }
  },
  // Uploader组件
  // 生命周期：beforeUpload
  setup() {
    // fileInput Dom元素
    const fileInput = ref<HTMLInputElement | null>(null)
    // 上传的文件列表
    const filesList = ref<UploadFile[]>([])   
    const triggerUpload = () => {
      fileInput.value?.click()
    }
    const addFileToList = (uploadedFIle: File) => {
      const fileObj = reactive<UploadFile>({
        uid: "uuidv4()",
        size: uploadedFIle.size,
        name: uploadedFIle.name,
        status: 'ready',
        raw: uploadedFIle
      })
      filesList.value.push(fileObj)

    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      const formData = new FormData()
      if (files) {
        formData.append(files[0].name, files[0])
        addFileToList(files[0])
      }
    }
    const removeFile = (uid: string) => {
      filesList.value = filesList.value.filter(file => file.uid !== uid)
    }
    return {
      triggerUpload,
      handleFileChange,
      fileInput,
      filesList,
      removeFile
    }
  }
})
</script>

<style lang="scss">
  .upload-list {
    margin: 0;
    padding: 0;
    list-style-type: none;  
  }
  .upload-list li {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    font-size: 14px;
    line-height: 1.8;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    min-width: 200px;
    position: relative;
    &:first-child {
      margin-top: 10px;
    }
    .upload-list-thumbnail {
      vertical-align: middle;
      display: inline-block;
      width: 70px;
      height: 70px;
      position: relative;
      z-index: 1;
      background-color: #fff;
      object-fit: cover;
    }
    .file-icon {
      svg {
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .filename {
      margin-left: 5px;
      margin-right: 40px;
    }
    &.upload-error {
      color: #f5222d;
      svg {
        color: #f5222d;
      }
    }
    .file-status {
      display: block;
      position: absolute;
      right: 5px;
      top: 0;
      line-height: inherit;
    }
    .delete-icon {
      display: none;
      position: absolute;
      right: 7px;
      top: 0;
      line-height: inherit;
      cursor: pointer;
    }
    &:hover {
      background-color: #efefef;
      .file-status {
        display: none;
      }
      .delete-icon {
        display: block;
      }
    }
  }
  </style>
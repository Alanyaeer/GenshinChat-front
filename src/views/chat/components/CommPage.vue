<script setup>
import { ref} from 'vue'
import { QuillEditor } from '@vueup/vue-quill'

</script>

<template>
    <div class="editor">
        <QuillEditor 
            ref="editorRef"
            theme="snow"
            content-type="html"
            v-model:content="formModel.content"
        >
        </QuillEditor>
    </div>
</template>
<style>
.editor {
    width: 100%;
    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
<template>
    <div>
        <h1>{{ $t('CommentBoard') }}</h1>
        <h5>{{ $t('CommentBoardInfo') }}</h5>
        <h5>{{ $t('CommentBoardInfo2') }}</h5>
        <h5>{{ $t('CommentBoardInfo3') }}</h5>
        <h5>{{ $t('CommentBoardInfo4') }}</h5>
        
        <div style="padding-bottom: 100px;">
            <CommentItem v-for="comment in comments" :key="comment._id.$oid" v-bind="comment" @comment-clicked="commentClick" />
        </div>
        <div style="width: 100%;">
            <div class="chatFooter">
                <!-- todo: Four buttoms functionality -->
                <!-- <div style="height: 30px; background-color: gray; width: 100%;"></div> -->
                <div
                    style="display: flex; background-color: rgb(222, 222, 222); height: 30px; align-items: center; position: relative;">
                    <div style="display: flex;  width: 500px; overflow: hidden; height: 100%; align-items: center;"
                        @click="cleanReplyHint">
                        {{ replyHint }}
                    </div>
                    <div class="uploadField">
                        {{ $t('ReplyAs') }}
                        <input style="width: 150px;" v-model="this.uploadForm.author" />
                        <el-button style="height: 30px;" type="primary" @click="uploadComment"
                            :disabled="this.buttonDisable">{{ this.buttonText }}</el-button>
                    </div>
                </div>
                <textarea class="inputTextArea" @keydown="userTextAreaInput" v-model="this.chatInput"></textarea>
            </div>
        </div>
    </div>
</template>
  
<script>
import CommentItem from './CommentItem.vue';

export default {
    name: 'CommentGroup',
    components: {
        CommentItem,
    },
    data() {
        return {
            chatInput: '',
            replyHint: this.$t('ClickToReply'),
            commentTarget: null,
            uploadForm: {
                id: '',
                author: '',
                body: '',
                timestamp: '',
            },
            comments: [],
            buttonDisable: false,
            buttonText: this.$t('Comment'),
        };
    },
    mounted() {
        this.loadAllComment();
        window.commentTimer = setInterval(() => {
            this.loadAllComment();
        }, 10000);
    },
    beforeUnmount() {
        clearInterval(window.commentTimer);
    },
    methods: {
        async loadAllComment() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };

            this.buttonDisable = true
            await fetch(this.$api + "/comment/getAllComment", requestOptions).then(response => response.json()).then(result => {
                this.comments = result
                this.buttonDisable = false
                this.comments = this.comments.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                })
            })
        },
        userTextAreaInput(event) {
            if (event.which === 13) {
                if (event.shiftKey) {
                    this.chatInput += '\n';
                } else {
                    event.preventDefault();
                    this.uploadComment();
                }
            }
        },
        commentClick(list, content) {
            this.replyHint = this.$t('ReplyTo') + content.author;
            this.commentTarget = list;
            this.buttonText = this.$t('Reply')
        },
        async uploadComment() {

            if (this.buttonDisable) {
                return;
            }

            if (this.chatInput == '') {
                this.$message({
                    message: this.$t('EnterSomething'),
                    type: 'error'
                })
                return;
            }

            if (this.uploadForm.author == '') {
                this.$message({
                    message: this.$t('EnterName'),
                    type: 'error'
                })
                return;
            }

            this.uploadForm.body = this.chatInput;
            this.chatInput = ""
            this.uploadForm.id = Math.floor(Math.random() * 1000).toString();
            this.uploadForm.timestamp = new Date().toISOString();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", this.$store.getters.getUserToken)

            var data = {
                targetList: this.commentTarget,
                comment: this.uploadForm,
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };


            this.buttonDisable = true
            this.buttonText = this.$t('Uploading')
            await fetch(this.$api + `/comment/AddComment`, requestOptions).then(response => response.json()).then(result => {

                this.buttonDisable = false
                this.buttonText = this.$t('Reply')

                if (this.commentTarget == null) {
                    this.comments = [{
                        _id: result.insert_id,
                        author: result.author,
                        body: this.uploadForm.body,
                        timestamp: this.uploadForm.timestamp,
                        badges: result.badges,
                        replies: [],
                    }, ...this.comments];
                } else {
                    let findComment = this.comments
                    let target = null

                    for (let i = this.commentTarget.length - 1; i >= 0; i--) {
                        target = findComment.find(comment => comment._id.$oid == this.commentTarget[i])
                        findComment = target.replies
                    }

                    target.replies = [...target.replies, {
                        _id: result.insert_id,
                        author: result.author,
                        body: this.uploadForm.body,
                        timestamp: this.uploadForm.timestamp,
                        badges: result.badges,
                        replies: [],
                    }];
                }
            })

            this.cleanUploadForm();
            this.cleanReplyHint();
        },
        cleanUploadForm() {
            this.uploadForm.id = '';
            this.uploadForm.author = '';
            this.uploadForm.body = '';
            this.uploadForm.timestamp = '';
        },
        cleanReplyHint() {
            this.replyHint = this.$t('ClickToReply');
            this.commentTarget = null;
            this.buttonText = this.$t('Comment')
        },
    },
};
</script>
  
<style scoped>
.chatFooter {
    position: relative;
    height: 150px;
    max-width: 1124px;
    width: 100%;
    bottom: 0;
    background-color: rgb(244, 244, 244);
    position: fixed;

}

.inputTextArea {
    height: 120px;
    width: 100%;
    border: none;
    background-color: rgb(244, 244, 244);
    resize: none;
}

.uploadField {
    position: absolute;
    right: 0;
}

.uploadField>* {
    margin: 0 5px;
}
</style>
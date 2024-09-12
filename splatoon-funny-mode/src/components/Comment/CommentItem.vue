<template>
    <div>
        <div class="comment" :class="{ reply: type === 'reply' }" @click="commentClicked()">
            <header>
                <h3>{{ this.displayUserName }}</h3>
                <div>
                    <div style="display: flex; flex-direction: row;" v-if="this.badges != null && this.badges.length != 0">
                        <div v-for="(img_src, index) in this.badges"
                            :key="index">
                            <img :src="img_src" />
                        </div>
                    </div>

                </div>
            </header>
            <div style="line-break: anywhere; ">{{ this.body }}</div>
            <p class="timestamp">{{ formattedDate }}</p>
        </div>
        <div v-if="replies.length" class="comment-replies">
            <CommentItem v-for="reply in replies" :key="reply.id" v-bind="reply" type="reply"
                @comment-clicked="commentClicked" />
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'CommentItem',
    props: {
        _id: { type: Object, required: true },
        author: { type: String, required: true },
        body: { type: String, required: true },
        timestamp: { type: String, required: true },
        replies: { type: Array, required: true },
        badges: { type: Array, required: false},
        type: { type: String, required: false, default: 'comment' },

    },
    data() {
        return {
            displayUserName: this.author,
        };
    },
    mounted() {
    },
    computed: {
        formattedDate() {
            const fmt = new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
            });
            return fmt.format(Date.parse(this.timestamp));
        },
        icon() {
            const commentIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`;
            const replyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>`;

            return this.type === 'reply' ? replyIcon : commentIcon;
        },
    },
    methods: {
        commentClicked(idList, content) {
            if (idList == null) {
                this.$emit('comment-clicked', [this._id.$oid], { author: this.displayUserName, body: this.body });
            } else {
                this.$emit('comment-clicked', [...idList, this._id.$oid], content);
            }
        },
    },
};
</script>
  
<style lang="css" scoped>
.comment {
    border: 1px solid DodgerBlue;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    padding: 1.5rem;
}

.comment.reply {
    position: relative;
}

.comment.reply:before {
    background-color: Silver;
    content: '';
    height: 1px;
    left: -2.5rem;
    position: absolute;
    top: 50%;
    width: 0.75rem;
}

h3,
p {
    margin: 0;
}

header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}

svg {
    fill: SlateGray;
}

.comment-body {
    margin-bottom: 0.375rem;
}

.timestamp {
    color: DimGray;
    font-size: 0.8rem;
}

.comment-replies {
    padding-left: 3.5rem;
    position: relative;
}

.comment-replies:before {
    background-color: SlateGray;
    content: '';
    height: calc(100% + 1rem);
    left: 1rem;
    position: absolute;
    top: 0;
    width: 1px;
}

.comment-replies:last-child:before {
    height: calc(100% - 1rem);
}
</style>
  
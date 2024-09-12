<template>
    <div>
        <CommentGroup></CommentGroup>
    </div>
</template>

<script>
import CommentGroup from '@/components/Comment/CommentGroup.vue';
export default {
    name: 'CommentView',
    components: {
        CommentGroup
    },
}
</script>
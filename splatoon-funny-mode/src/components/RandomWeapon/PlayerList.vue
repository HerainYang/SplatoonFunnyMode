<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="player in this.player_list" :key="player.token">
            <PlayerItem :playerID="player.name" :token="player.token" />
        </li>
    </ul>
</template>
<script>
import PlayerItem from './PlayerItem.vue'

export default {

    name: 'PlayerList',
    components: {
        PlayerItem
    },
    props: {
        player_list: {
            type: Array,
            required: true
        }
    },
}
</script>
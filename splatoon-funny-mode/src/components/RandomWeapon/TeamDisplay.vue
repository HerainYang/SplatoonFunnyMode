<template>
    <ul class="list-group">
        <li v-for="id in this.teamWeaponIDs" :key="id.playerID"
            :class="'list-group-item ' + (id.token == this.$store.getters.getUserToken ? 'list-group-item-danger' : teamID == -1 ? 'list-group-item-secondary' : (teamID == 0 ? ' list-group-item-info' : 'list-group-item-warning'))">
            <WeaponDisplay :weaponID="id.weaponID" :playerID="id.playerID.toString()"/>
        </li>
    </ul>
</template>

<script>
import WeaponDisplay from './WeaponDisplay.vue';
export default {
    name: 'TeamDisplay',
    components: {
        WeaponDisplay,
    },
    props: {
        teamWeaponIDs: {
            type: Array,
            required: true
        },
        teamID: {
            type: Number,
            required: true
        }
    }
}
</script>
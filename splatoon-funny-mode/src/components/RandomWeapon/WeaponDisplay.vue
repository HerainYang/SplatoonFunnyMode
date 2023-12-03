<template>
    <div style="display: flex; position: relative; height: 60px;">
        <img v-if="weaponID!=null" class="icon" :src="$mainWeapon[this.weaponID].img_url"/>
        <img v-if="weaponID!=null" class="icon" :src="$subWeapon[$mainWeapon[this.weaponID].sub_id].img_url"/>
        <img v-if="weaponID!=null" class="icon" :src="$specialWeapon[$mainWeapon[this.weaponID].spe_id].img_url"/>

        <div v-if="weaponID!=null" class="title">{{ $mainWeapon[this.weaponID].title }}</div>

        <div class="playerID">{{this.playerID}}</div>
    </div>
    

</template>

<script>
export default {
    name: 'WeaponDisplay',
    props: {
        weaponID: {
            type: Number,
            required: true
        },
        playerID: {
            type: String,
            required: true
        },
    },
}
</script>

<style scoped>
.icon {
    width: 60px;
    height: 60px;
}

.title{
    line-height: 60px;
    vertical-align: middle;
}

.playerID{
    line-height: 60px;
    vertical-align: middle;
    position: absolute;
    right: 0;
}
</style>
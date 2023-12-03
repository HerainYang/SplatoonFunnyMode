<template>
    <div style="display: flex; position: relative; align-items: center;">
        <div>{{ this.playerID }}</div>
        <el-icon v-if="this.$store.state.user.is_admin == true && this.token != this.$store.state.user.token" class="deleteButton" @click="deletePlayer"><Close /></el-icon>
    </div>
</template>

<script>
export default {
    name: 'PlayerItem',
    props: {
        playerID: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        deletePlayer() {
            console.log('delete')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", this.$store.state.user.token)

            var data = {
                'roomNumber': this.$store.state.user.roomID,
                'targetMemberToken': this.token
            }

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            fetch(this.$api + '/deleteMember', requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    },
    
}
</script>

<style scoped>
.deleteButton{
    position: absolute;
    right: 0;
}
</style>
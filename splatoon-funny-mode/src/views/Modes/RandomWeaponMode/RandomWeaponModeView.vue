<template>
  <div>
    <div>{{ $t('RoomID') }}: {{ this.$store.getters.getUserRoomID }}</div>
    <el-checkbox v-if="this.$store.getters.getUserAdminStatus" v-model="this.unbalancedTeam" :label="this.$t('UnbalancedTeam')"
      size="large" />
    <div class="modeStage">
      <div v-if="this.teamInfo.stage_id != -1" style="height: 200px;">
        <img :src="$stageinfo[this.teamInfo.stage_id].img_url" class="image" />
        <div style="padding: 14px">
          <span>{{ $stageinfo[this.teamInfo.stage_id].title }}</span>
        </div>
      </div>
      <div v-if="this.teamInfo.mode_id != -1" style="height: 200px; align-items: center;">
        <img :src="$modeinfo[this.teamInfo.mode_id].img_url" class="image" />
        <div style="padding: 14px">
          <span>{{ $modeinfo[this.teamInfo.mode_id].title }}</span>
        </div>
      </div>
    </div>

    <div v-if="this.teamInfo.team1.length != 0">{{ $t('Team1') }}</div>
    <TeamDisplay :teamWeaponIDs="this.teamInfo.team1" :teamID="0"></TeamDisplay>
    <div v-if="this.teamInfo.team2.length != 0">{{ $t('Team2') }}</div>
    <TeamDisplay :teamWeaponIDs="this.teamInfo.team2" :teamID="1"></TeamDisplay>
    <div v-if="this.teamInfo.sub_team.length != 0">{{ $t('SubTeam') }}</div>
    <TeamDisplay :teamWeaponIDs="this.teamInfo.sub_team" :teamID="-1"></TeamDisplay>

    <div class="buttonGroup">
      <button v-if="this.$store.getters.getUserAdminStatus" class="btn btn-primary" type="submit" @click="updateWeapon">{{
        $t('UpdateWeapon') }}</button>
      <button class="btn btn-primary" type="submit" @click="exitRoom">{{ $t('ExitRoom') }}</button>
    </div>

    <PlayerList :player_list="this.player_list"></PlayerList>


  </div>
</template>
  
<script>
// @ is an alias to /src
import TeamDisplay from '@/components/RandomWeapon/TeamDisplay.vue';
import PlayerList from '@/components/RandomWeapon/PlayerList.vue';
import { ElMessageBox } from 'element-plus'

export default {
  name: 'RandomWeaponModeView',
  components: {
    TeamDisplay,
    PlayerList
  },
  data() {
    return {
      teamInfo: {
        team1: [],
        team2: [],
        sub_team: [],
        stage_id: -1,
        mode_id: -1
      },
      player_list: [],
      unbalancedTeam: false
    }
  },
  async mounted() {
    await this.updateWeapon()
    this.updateRoomInfo()
    window.timer = setInterval(() => {
      setTimeout(() => {
        this.updateRoomInfo()
      }, 800)
    }, 1000)
  },
  methods: {
    async updateWeapon() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", this.$store.getters.getUserToken)

      var data = {
        roomNumber: this.$store.getters.getUserRoomID,
        unbalancedTeam: this.unbalancedTeam
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      fetch(this.$api + `/getRandomWeapon`, requestOptions)
        .then(response => {
          console.log(response)
          return response.json()
        })
        .then(data => {
          console.log(data)
          this.teamInfo = data
        })
    },
    updateRoomInfo() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", this.$store.getters.getUserToken)

      var data = {
        roomNumber: this.$store.getters.getUserRoomID
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };

      fetch(this.$api + `/getRoomInfo`, requestOptions)
        .then(response => {
          if (response.status == 404) {
            clearInterval(window.timer)
            ElMessageBox.alert(this.$t('CannotAccessRoomInfo'), this.$t('AccessError'), {
              // if you want to disable its autofocus
              // autofocus: false,
              confirmButtonText: 'OK',
              callback: () => {

                this.$router.push('/')
              },
            })
          }
          return response.json()
        })
        .then(data => {
          this.player_list = data.player_list
          console.log(data)
          this.teamInfo = JSON.parse(data.mode_args)
        })
    },
    exitRoom() {
      console.log('delete')
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", this.$store.getters.getUserToken)

      var data = {
        'roomNumber': this.$store.getters.getUserRoomID,
        'targetMemberToken': this.$store.getters.getUserToken
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
  beforeUnmount() {

    clearInterval(window.timer)
    this.exitRoom()
  }

}
</script>
  

<style scoped>
.buttonGroup {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 10px;
}

.buttonGroup>* {
  margin: 0 10px;
}

.modeStage{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

}

.modeStage >*{
  margin: 0 10px;
}
</style>
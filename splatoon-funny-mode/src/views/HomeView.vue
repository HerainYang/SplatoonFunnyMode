<template>
  <div style="align-items: center; display: flex; flex-direction: column; position:relative; height: 100%;">

    <h1>{{ $t('SplatoonFunnyPrivateMode') }}</h1>

    <div>{{ $t('JoinGame') }}</div>

    <el-form ref="joinForm" :model="joinForm" :rules="joinRules" label-position="top" label-width="100px"
      style="max-width: 460px">
      <el-form-item :label="$t('Mode')" prop="mode">
        <el-cascader v-model="this.joinForm.mode" :options="this.modeOption" clearable />
      </el-form-item>
      <el-form-item :label="$t('UserName')" prop="name">
        <el-input v-model="this.joinForm.name" />
      </el-form-item>
      <el-form-item :label="$t('RoomNumber')" prop="roomNumber">
        <el-input v-model="this.joinForm.roomNumber" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onJoin()">Join</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <div>{{ $t('CreateGame') }}</div>

    <el-form ref="createForm" :model="createForm" :rules="createRules" label-position="top" label-width="100px"
      style="max-width: 460px">
      <el-form-item :label="$t('Mode')" prop="mode">
        <el-cascader v-model="this.createForm.mode" :options="this.modeOption" clearable />
      </el-form-item>
      <el-form-item :label="$t('UserName')" prop="name">
        <el-input v-model="this.createForm.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCreate()">Create</el-button>
      </el-form-item>
    </el-form>

    <router-link to="/about" style="position: absolute; bottom: 0;">{{ $t('AboutThisPage') }}</router-link>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      modeOption: [
        {
          value: 'randomWeapon',
          label: this.$t('RandomWeaponMode')
        }
      ],
      joinForm: {
        name: '',
        roomNumber: '',
        mode: ''
      },
      createForm: {
        name: '',
        mode: ''
      },
      joinRules: {
        name: [
          { required: true, message: this.$t('PleaseInputUserName'), trigger: 'blur' },
          { min: 3, max: 20, message: this.$t('LengthOfUserName'), trigger: 'blur' }
        ],
        roomNumber: [
          { required: true, message: this.$t('PleaseInputRoomNumber'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('LengthOfRoomNumber'), trigger: 'blur' }
        ],
        mode: [
          { required: true, message: this.$t('PleaseSelectMode'), trigger: 'blur' }
        ]
      },
      createRules: {
        name: [
          { required: true, message: this.$t('PleaseInputUserName'), trigger: 'blur' },
          { min: 3, message: this.$t('LengthOfUserName'), trigger: 'blur' }
        ],
        mode: [
          { required: true, message: this.$t('PleaseSelectMode'), trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    async onJoin() {
      await this.$refs.joinForm.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          console.log('submit!');
          console.log(this.joinForm);

          var myheader = new Headers();
          myheader.append("Content-Type", "application/json");

          var requestOptions = {
            method: 'POST',
            headers: myheader,
            body: JSON.stringify(this.joinForm),
            redirect: 'follow'
          };

          fetch(this.$api + "/joinRoom", requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if(data.room_id == -1){
                this.$message({
                  message: this.$t('RoomFull'),
                  type: 'error'
                })
                return
              }
              this.$store.commit('updatePersonalInfo', {
                'id': this.joinForm.name,
                'roomID': data.room_id
              })
              this.$store.commit('updateToken', data.player_token)
              this.$router.push('/randomweaponmode')
            })
        }
      })
      console.log('submit!');
      console.log(this.joinForm);
    },
    async onCreate() {
      await this.$refs.createForm.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          console.log('submit!');
          console.log(this.createForm);

          var myheader = new Headers();
          myheader.append("Content-Type", "application/json");

          var requestOptions = {
            method: 'POST',
            headers: myheader,
            body: JSON.stringify(this.createForm),
            redirect: 'follow'
          };

          fetch(this.$api + "/createRoom", requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              this.$store.commit('updatePersonalInfo', {
                'id': this.createForm.name,
                'roomID': data.room_id
              })
              this.$store.commit('updateToken', data.player_token)
              this.$store.commit('updateAdminStatus', data.is_admin)
              this.$router.push('/randomweaponmode')
            })
        }
      })
    }
  },
}
</script>

<style>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
  width: 720px;
}
</style>
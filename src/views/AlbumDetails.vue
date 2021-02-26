<template>
  <div class="container">
    <div
      class="background-blur"
      :style="{ background: 'url(' + this.Album.album.blurPicUrl + ')' }"
    ></div>
    <div class="AlbumTop">
      <div class="TopImg">
        <img :src="Album.album.blurPicUrl" alt="" />
        <div class="TopImgbj">
          <img src="../assets/album.png" alt="" />
        </div>
      </div>
      <div class="descbox">
        <h1 class="desctitle">{{ this.Album.album.name }}</h1>
        <div class="user">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <span class="username">{{ this.Album.album.artist.name }}</span>
        </div>
        <div class="creattime">
          <span>发行时间：{{ this.Album.album.publishTime }}</span>
          <span>发行公司：{{ this.Album.album.company }}</span>
        </div>
        <div class="description">
          简介：<span>{{ this.Album.album.description }}</span>
        </div>
        <div class="buttonground">
          <div class="button" @click="allpaly">
            <span class="iconfont">&#xe630;</span>全部播放
          </div>
          <div
            class="button"
            @click="subAlbum(1)"
            v-if="!this.AlbumCount.isSub"
          >
            <span class="iconfont">&#xe607;</span>收藏
          </div>
          <div
            class="button"
            @click="subAlbum(2)"
            v-else
            style="background: #9c9c9c"
          >
            <span class="iconfont">&#xe62f;</span>已收藏
          </div>
          <div class="button"><span class="iconfont">&#xe785;</span>分享</div>
          <div class="button"><span class="iconfont">&#xe63f;</span>更多</div>
        </div>
      </div>
    </div>
    <!-- 专辑歌单 -->
    <div class="AlbumCenter">
      <el-table
        ref="multipleTable"
        :data="this.Album.songs"
        @row-click="rowclick"
        @selection-change="selection"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="55"> </el-table-column>
        <el-table-column label="歌曲" prop="name"> </el-table-column>
        <el-table-column label="歌手" prop="ar[0].name"> </el-table-column>
        <el-table-column label="时长" prop="dt"> </el-table-column>
      </el-table>
      <div class="quanxuan">
        <el-checkbox v-model="checked">全选</el-checkbox>
        <div @click="selplay" class="button">
          <span class="iconfont">&#xe630;</span>播放选择的歌曲
        </div>
        <div @click="seladd" class="button">
          <span class="iconfont">&#xe63f;</span>添加到
        </div>
      </div>
    </div>
    <!-- 专辑歌单end-->
    <!-- 评论 -->
    <div class="pinlunhe">
      <pinglun
        class="pinlun"
        :type="3"
        :hotcomment="hotcomment"
        :newcomment="comment"
        :id="this.Album.album.id"
      >
        <div slot="pingtitle">用戶评论</div>
      </pinglun>
    </div>
    <!-- 评论end-->

    <!-- 添加到歌单 -->
    <el-dialog
      title="添加到歌单"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
      center
      :modal="false"
      top="25vh"
    >
      <div class="submusicbox">
        <div class="adddj" @click="addnewplay">
          <span class="el-icon-circle-plus-outline addicon"></span>
          <span>新歌单</span>
        </div>
        <div class="palylist">
          <div
            class="palyitem"
            @click="addpaly(item.id)"
            v-for="(item, index) in this.playlist"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt="" />
            <div class="listname">
              <div class="">{{ item.name }}</div>
              <div class="">{{ item.trackCount }}首</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="新建歌单"
      :visible.sync="dialogVisible2"
      width="25%"
      :before-close="handleClose"
      center
      :modal="false"
      top="25vh"
    >
      <div class="newpaly">
        <div class="newplayname">
          <span>歌单名：</span>
          <input placeholder="输入歌单名" v-model="input1" />
        </div>
        <span class="newdesc">可通过“收藏”将音乐添加到新歌单中</span>
        <div class="buttongroud">
          <div class="newcreat" @click="creatplay">新建</div>
          <div class="newdel" @click="handleClose">取消</div>
        </div>
      </div>
    </el-dialog>
    <!-- 添加到歌单end -->
  </div>
</template>

<script>
import {
  GetAlbum,
  SubAlbum,
  GetDontAlbum,
  AlbumComment,
} from "../components/Dj/Dj";
import { GetMusic, Subcount } from "../components/home/home";
import { CreatePlay, ChangePlay } from "../components/MusicDetails/details";
import pinglun from "../components/MusicDetails/pinlun.vue";

export default {
  name: "DatailAlbum",
  data() {
    return {
      Album: {},
      AlbumCount: {},
      checked: false,
      hotcomment: [],
      comment: [],
      redis: [],
      playlist: [],
      input1: "",
      dialogVisible: false,
      dialogVisible2: false,
    };
  },
  components: {
    pinglun,
  },
  watch: {
    checked: function (newv, old) {
      this.toggleSelection(newv);
    },
  },
  methods: {
    // 获取专辑内容
    async getAlbum(id) {
      const { data: data } = await GetAlbum(id);
      var n = data.album.publishTime;
      var time = new Date(n);
      var Y = time.getFullYear() + "-";
      var M =
        (time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1) + "-";
      var D = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
      data.album.publishTime = Y + M + D;
      data.songs.forEach((item) => {
        GetMusic(item.id).then((res) => {
          item.url = res.data.data[0].url;
        });
        item.dt = this.$musictime(item.dt);
      });
      this.Album = data;
    },
    // 获取专辑的数字信息
    async getDongAlbum(id) {
      const { data: data } = await GetDontAlbum(id);
      this.AlbumCount = data;
    },
    //播放点击音乐
    rowclick(row) {
      if (row.url == null) {
        this.$message.error("该音乐无法播放");
        return;
      }
      this.sendmusic(row.id);
    },
    //选择播放的音乐
    selplay() {
      console.log("请先选择需要播放的音乐");
      if (this.redis.length == 0) {
        this.$message.warning("请先选择需要播放的音乐");
        console.log("请先选择需要播放的音乐");
        return;
      }
      var ids = [];
      this.redis.forEach((item) => {
        ids.push(item.id);
      });
      this.sendmusic(ids.join(","));
    },
    //选择添加到歌单
    seladd() {
      console.log("收藏歌曲");
      let login = JSON.parse(sessionStorage.getItem("loginchange")) || null;
      if (login == null) {
        this.$message.warning("请先登录");
        return;
      } else {
        this.UserDj(login.userId);
      }
      this.dialogVisible = true;
    },
    //全部播放
    allpaly() {
      var ids = [];
      this.Album.songs.filter((item) => {
        ids.push(item.id);
      });
      this.sendmusic(ids.join(","));
    },
    //切换全选
    toggleSelection(newv) {
      if (newv) {
        this.Album.songs.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, newv);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 监听选择状态
    selection(selection) {
      this.redis = selection;
      // if(selection.length==this.Album.songs.length){
      // 	console.log("子全选")
      // 	this.toggleSelection(this.checked)
      // }else{
      // 	console.log("不是全选状态")
      // }
    },
    //获取用户的歌单
    async UserDj(id) {
      const { data: data } = await Subcount(id);
      console.log("用户歌单", data);
      this.playlist = data.playlist;
      this.$set(this, "playlist", data.playlist);
    },
    //收藏/取消
    async subAlbum(t) {
		console.log(this.$route.params.id )
		SubAlbum(this.$route.params.id, t).then(data=>{
			console.log(data )

		})
      this.$message.success("操作成功");
    //   if (data.code == 200) {
    //     this.getDongAlbum(this.$route.params.id);
    //   } else {
    //     this.$message.warning(data.code);
    //   }
    },
    //打开新建歌单
    addnewplay() {
      this.dialogVisible = false;
      this.dialogVisible2 = true;
    },
    //创建歌单
    async creatplay() {
      if (this.input1 == "") {
        this.$message.error("请输入歌单名称");
        return;
      } else {
        const { data: data } = await CreatePlay(this.input1);
        console.log("创建歌单", data);
        if (data.code == 200) {
          this.$message.success("创建歌单成功");
          this.addpaly(data.id);
          this.handleClose();
        }
      }
    },
    //添加歌曲到歌单
    async addpaly(id) {
      try {
        const { data: data } = await ChangePlay("add", id, this.music.musicid);
        console.log("添加音乐", data);
        if (data.status == 200) {
          if (data.body.code == 502) {
            this.$toast("歌单内歌曲重复", "warning");
            this.dialogVisible = false;
          }
          if (data.body.code == 200) {
            this.$toast("添加歌单成功", "success");
            this.dialogVisible = false;
          }
        }
      } catch (Exception) {
        this.$toast("添加歌曲报错", "danger");
        this.dialogVisible = false;
        console.log(Exception);
      }
    },
    //专辑评论
    getAlbumComment() {
      AlbumComment(this.$route.params.id).then((data) => {
        console.log(data.data.hotComments);
        data.data.comments.forEach((item) => {
          item.time = this.$time(item.time);
        });
        data.data.hotComments.forEach((item) => {
          item.time = this.$time(item.time);
        });
        this.comment = data.data.comments;
        this.hotcomment = data.data.hotComments;
      });
    },
    //关闭弹出
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },
  },
  created() {
    Promise.all(
      [
        this.getAlbum(this.$route.params.id),
        this.getDongAlbum(this.$route.params.id),
      ],
      this.getAlbumComment()
    );
  },
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont"; /* project id 2223549 */
  src: url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.eot");
  src: url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.woff") format("woff"),
    url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2223549_scjf8rkuy7l.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

>>> .el-table-column--selection .cell {
  padding-left: 14px;
  padding-right: 14px;
}
.container {
  width: 1200px;
  margin: 0 auto;
  height: 1200px;
  position: relative;
  z-index: 1;
}
.background-blur {
  width: 1200px;
  height: 1200px;
  filter: blur(100px);
  position: fixed;
  z-index: -1;
}
.AlbumTop {
  width: 100%;
  z-index: 2;
  display: flex;
  z-index: 2;
  padding: 45px 0;
  text-align: left;
}
.TopImg {
  position: relative;
}
.TopImg img {
  width: 280px;
  height: 280px;
}
.TopImgbj {
  position: absolute;
  width: 280px;
  height: 280px;
  top: 0;
  left: 32px;
}
.description {
  display: flex;
  line-height: 20px;
  padding-bottom: 20px;
}
.description span {
  width: 700px;
  font-size: 13px;
  color: #dcdcdc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.descbox {
  margin-left: 60px;
}
.user {
  display: flex;
  font-size: 15px;
  margin-bottom: 28px;
}
.username {
  place-self: center;
  margin-left: 20px;
}
.el-avatar {
  font-size: 15px;
  width: 25px;
  height: 25px;
  align-items: center;
  line-height: 25px;
}
.creattime {
  display: flex;
  margin-bottom: 10px;
}
.creattime span {
  margin-right: 40px;
  font-size: 13px;
  line-height: 26px;
}
.buttonground {
  display: flex;
  width: 100%;
}
.button {
  min-width: 50px;
  height: 36px;
  border-radius: 20px;
  border: 1px solid #666;
  line-height: 36px;
  padding: 0 20px;
  margin-right: 30px;
  font-size: 15px;
  color: #666;
  place-self: center;
  opacity: 1;
}
.button:nth-child(1) {
  background: #e91e63;
  border: #e91e63;
  color: #fff;
}
.AlbumCenter {
  width: 100%;
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}
.quanxuan {
  display: flex;
  margin-left: 14px;
  padding: 20px 0;
}
.el-checkbox {
  line-height: 36px;
}
.quanxuan .button {
  margin-left: 30px;
  margin-right: 0;
}
.pinlunhe {
  background: #fff;
  margin-top: -100px;
}
.pinlun {
  width: 90%;
  margin: 0 auto;
}
.adddj {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 12px;
  padding-left: 30px;
  box-sizing: border-box;
  display: flex;
  background: #e6e6e6;
  box-shadow: 1px 2px 5px #ccc;
}
.addicon {
  font-size: 35px;
  place-self: center;
}
.palylist {
  padding-bottom: 70px;
}
.palyitem {
  display: flex;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 8px 0 8px 30px;
}
.listname {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.palyitem img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.newpaly {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.newplayname {
  width: 80%;
  height: 30px;
  display: flex;
}
.newplayname input {
  height: 25px;
  width: 210px;
  outline: none;
}
.newplayname span {
  font-size: 14px;
  width: 60px;
  line-height: 40px;
}
.newdesc {
  margin: 25px 0 20px 59px;
}
</style>
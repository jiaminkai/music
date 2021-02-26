<template>
  <div class="content">
    <div class="mainc">
      <div class="userbox">
        <div class="img">
          <img :src="this.data.blurCoverUrl" alt="" />
        </div>
        <div class="userdesc">
          <div class="DtTitle">
            <span>电台节目</span>
            <span>{{ this.data.name }}</span>
          </div>
          <div class="cary">
            <span class="iconfont">&#xe605;</span
            ><span>{{ this.data.description }}</span>
            <span class="el-icon-star-off dingyue"
              ><span></span>订阅({{ this.data.auditStatus }})</span
            >
          </div>
        </div>
      </div>
      <div class="buttonbox">
        <span class="iconfont">&#xe768;<span></span>播放</span>
        <span class="iconfont"
          >&#xe604;<span></span>({{ this.data.pubStatus }})</span
        >
        <span class="iconfont"
          >&#xe669;<span></span>({{ this.data.bdAuditStatus }})</span
        >
        <span class="iconfont">&#xe785;<span></span>分享</span>
        <span class="iconfont">&#xe687;<span></span>下载</span>
        <span class="el-icon-headset"><span></span>生成外链播放器</span>
      </div>
      <div class="creartime">
        <span class="tab">{{ this.data.categoryName }}</span>
        <span class="dtname">{{ this.data.description }}</span>
        <span>{{ this.data.createTime }} 创建</span>
        <span>播放({{ this.data.listenerCount }})次</span>
      </div>
      <div class="desc">
        <span>介绍：幕辞情感电台</span>
      </div>

      <div class="pinglun">
        <div class="pingluntitle">
          <span>评论</span>
          <span> 共{{ this.data.commentCount }}条评论</span>
        </div>
        <div class="pingluntext">
          <div class="pinglunicon">
            <img :src="this.loginuser.avatarUrl" alt="" />
          </div>
          <div class="pingluniconInput">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="textarea2"
              maxlength="140"
              show-word-limit
            >
            </el-input>
            <div class="button">评论</div>
          </div>
        </div>
        <div class="newcomment">
          <div class="newcommentname">
            最新评论({{ this.data.commentCount }})
          </div>
          <div class="newcommentbox">
            <div
              class="commenitem"
              v-for="item in this.comments.comments"
              :key="item.commentId"
            >
              <div class="commentIcon">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="commentcontnt">
                <div>
                  <span class="nickname">{{ item.user.nickname }} : </span
                  ><span>{{ item.content }}</span>
                </div>
                <div>
                  <span class="creartime">{{ item.creatTime }}</span
                  ><span class="dian"
                    ><span class="iconfont">&#xe604;</span
                    ><span> | 回复</span></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { Dtprogram, DtComment } from "../components/Dt/dt";
import { GetMusic } from "../components/home/home";
export default {
  name: "daitaiitem",
  data() {
    return {
      textarea2: "",
      data: {},
      loginuser: {},
      comments: {},
    };
  },
  methods: {
    //节目详情信息
    async getDtprogram(id) {
      const { data: data } = await Dtprogram(id);
      var time = data.program.createTime;
      var creartime = new Date(time);
      var y = creartime.getFullYear();
      var M = creartime.getMonth() + 1;
      var d = creartime.getDate();
      data.program.createTime = y + "-" + M + "-" + d;
      this.data = data.program;
      var ids = "";
      console.log(this.data.songs);
      var idarr = [];
      this.data.songs.filter((item) => {
        GetMusic(item.id).then((res) => {
          console.log("resasdf", res);
          item.url = res.data.data[0].url;
        });
      });
    },
    //评论
    async getDtComment(id) {
      const { data: data } = await DtComment(id);
      console.log(data);
      this.comments.total = data.total;
      this.comments.comments = data.comments;
      this.comments.hotComments = data.hotComments;
      this.comments.topComments = data.topComments;
      this.comments.userId = data.userId;
      this.comments.comments.forEach((item) => {
        var time = item.time;
        var creartime = new Date(time);
        var y = creartime.getFullYear();
        var M = creartime.getMonth() + 1;
        var d = creartime.getDate();
        var hh =
          (creartime.getHours() < 10
            ? "0" + creartime.getHours()
            : creartime.getHours()) + ":";
        var mm =
          (creartime.getMinutes() < 10
            ? "0" + creartime.getMinutes()
            : creartime.getMinutes()) + ":";
        item.creatTime =
          y + "年" + M + "月" + d + "   " + hh + "时" + mm + "分";
      });
    },
  },
  created() {
    Promise.all([
      this.getDtprogram(this.$route.params.id),
      this.getDtComment(this.$route.params.id),
    ]);
    this.loginuser = JSON.parse(sessionStorage.getItem("loginchange")) || [];
  },
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont"; /* project id 2223549 */
  src: url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.eot");
  src: url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.woff") format("woff"),
    url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2223549_l9r7k5bguie.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
}
.mainc,
.right {
  display: flex;
  flex-direction: column;
}
.mainc {
  width: 65%;
  box-shadow: 2px 2px 10px #ccc;
  padding: 40px 30px;
  box-sizing: border-box;
}
.right {
  width: 34%;
}

.userbox {
  display: flex;
  flex-direction: row;
  /* text-align: center; */
}
.DtTitle {
  text-align: center;
  min-width: 60px;
  line-height: 30px;
  padding: 30px 0;
  text-align: left;
}
.cary {
  text-align: left;
}
.dingyue {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  margin-left: 20px;
  border-radius: 5px;
}
.buttonbox {
  text-align: left;
  margin: 20px 0;
}
.buttonbox > span {
  min-width: 60px;
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 5px;
  padding: 5px 15px;
  margin-right: 15px;
}
.buttonbox span:nth-child(6) {
  border: none;
  color: #0c73c2;
  background: #fff;
}
.buttonbox span:nth-child(1) {
  background: #0c73c2;
  color: #fff;
}
.DtTitle span:nth-child(1) {
  padding: 3px 5px;
  background: red;
  font-size: 16px;
  color: #eeeeee;
  position: relative;
}
.creartime {
  text-align: left;
  font-size: 12px;
  margin-top: 15px;
}
.creartime span {
  margin-right: 15px;
}
.DtTitle span:nth-child(2) {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
}
.DtTitle span:nth-child(1)::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid red;
  border-right: 10px solid transparent;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  position: absolute;
  top: 0;
  right: -20px;
}
.tab {
  border: 1px solid red;
  color: red;
  padding: 1px 3px;
  margin-right: 15px;
}
.dtname {
  font-weight: 600;
}
.userdesc {
  display: flex;
  flex-direction: column;
}
.desc {
  text-align: left;
  margin: 15px 0;
  font-size: 12px;
  color: #666;
}
.img {
  width: 145px;
  height: 145px;
  padding: 3px;
  border: solid 1px #ccc;
  box-shadow: 1px 1px 5px #eee;
  margin-right: 30px;
}
.img img {
  width: 100%;
  height: 100%;
}
.pinglun {
  text-align: left;
}
.pingluntext {
  display: flex;
  padding: 20px 0;
}
.pingluntitle {
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 5px;
}
.pinglunicon img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.pingluniconInput {
  width: 100%;
}
.pingluntitle span:nth-child(1) {
  font-size: 20px;
  margin-right: 15px;
}
.pingluntitle span:nth-child(2) {
  font-size: 15px;
  margin-right: 15px;
}
.button {
  margin-left: auto;
  width: 60px;
  padding: 3px 0;
  background: #0c73c2;
  border: 1px solid #0c73c2;
  color: #fff;
  margin-top: 10px;
  text-align: center;
  border-radius: 5px;
}
.commenitem {
  display: flex;
}
.newcommentname {
  padding-bottom: 3px;
  border-bottom: 1px solid #ccc;
}
.commentIcon {
  width: 50px;
  height: 50px;
}
.newcommentbox {
  margin-top: 8px;
}
.commenitem {
  padding: 8px 0;
  border-top: 1px solid #ccc;
}
.commenitem :nth-child(1) {
  padding: 8px 0;
  border-top: none;
}
.commentIcon {
  margin-right: 10px;
}
.commentcontnt {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
}
.nickname {
  color: #0c73c2;
}
.creartime {
  color: #ccc;
  font-size: 13px;
}
.dian {
  display: inline-block;
  margin-left: auto;
}
</style>
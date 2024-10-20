<template>
      <div class="main">
        <el-card><h1>
            在线客服
        </h1></el-card>

          <div id="content" class="content">
            <div v-for="(item,index) in info" :key="index">
              <div class="info_bot" v-if="item.type == 'botinfo'">
                <div class="con_bot">
                  <div>{{item.content}}</div>
                  <div v-for="(item2,index) in item.question" :key="index">
                    <div class="con_que" @click="clickRobot(item2.content,item2.id)">
                      <div>
                        {{item2.index}}
                        {{item2.content}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time_bot">{{item.time}}</div>
              </div>
   
              <div class="info_user" v-if="item.type == 'userinfo'">
                <div class="con_user">
                  <span class="con_user">{{item.content}}</span>
                </div>
                <div class="time_user">{{item.time}}</div>
              </div>
            </div>
          </div>
   
          <div class="send">
            <textarea
            class = "send-text"
              placeholder="请输入您的问题..."
              style="height: 68px;width: 100%;resize:none;padding-right:80px;outline: none;border-radius:5px;"
              id="text"
              v-model="customerText"
            ></textarea>
            <button @click="sentMsg()" class="send-btn">
              <span>发 送</span>
            </button>
          </div>
        </div>
  </template>
  <script>
    export default {
      data() {
        return {
          customerText: "",
          info: [
            {
              type: "botinfo",
              time: this.getTodayTime(),
              name: "robot",
              content:
                "您好，欢迎使用在线客服",
              question: [],
            },
          ],
          timer: null,
          robotQuestion: [
          ],
          robotAnswer: [
          ],
        };
      },
      created() {
        this.showTimer();
      },
      methods: {
        // 用户发送消息
        sentMsg() {
          clearTimeout(this.timer);
          this.showTimer();
          let text = this.customerText.trim();
          if (text != "") {
            var obj = {
              type: "userinfo",
              time: this.getTodayTime(),
              content: text,
            };
            this.info.push(obj);
            this.appendRobotMsg(this.customerText);
            this.customerText = "";
            this.$nextTick(() => {
              var contentHeight = document.getElementById("content");
              contentHeight.scrollTop = contentHeight.scrollHeight;
            });
          }
        },

        appendRobotMsg(text) {
          clearTimeout(this.timer);
          this.showTimer();
          text = text.trim();
          let answerText = "This is a Test Answer";

            let obj = {
                type: "botinfo",
                time: this.getTodayTime(),
                name: "robot",
                content: answerText,
                question: [],
            };
            this.info.push(obj);

          this.$nextTick(() => {
            var contentHeight = document.getElementById("content");
            contentHeight.scrollTop = contentHeight.scrollHeight;
          });
        },

        sentMsgById(val, id) {
          clearTimeout(this.timer);
          this.showTimer();
   
          let robotById = this.robotAnswer.filter((item) => {
            return item.id == id;
          });
          let obj_l = {
            type: "leftinfo",
            time: this.getTodayTime(),
            name: "robot",
            content: robotById[0].content,
            question: [],
          };
          let obj_r = {
            type: "rightinfo",
            time: this.getTodayTime(),
            name: "robot",
            content: val,
            question: [],
          };
          this.info.push(obj_r);
          this.info.push(obj_l);
          this.$nextTick(() => {
            var contentHeight = document.getElementById("content");
            contentHeight.scrollTop = contentHeight.scrollHeight;
          });
        },

        showTimer() {
          this.timer = setTimeout(this.endMsg, 1000*60);
        },
        getTodayTime() {
          // 获取当前时间
          var day = new Date();
          let seconds = day.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          } 
          let minutes = day.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          let time =
            day.getFullYear() +
            "-" +
            (day.getMonth() + 1) +
            "-" +
            day.getDate() +
            " " +
            day.getHours() +
            ":" +
            minutes +
            ":" +
            seconds;
          return time;
        },
      },
    };
  </script>



  <style>
    .main {
      width: 300px;
      height: 500px;
    }  
    #content {
        height: 265px;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: 12px;
        width: 300px;
    }


    .con_bot {
        display: inline-block;
        width: fit-content;
        height: fit-content;
        background-color: #e2e2e2;
        border-radius: 6px;
        padding: 10px;
        margin-left: 10px;
    }
    .time_bot {
        margin-left: 20px;
        color: black;
        font-size: 12px;
    }      
    
    .time_user {
        margin-right: 20px;
        font-size: 12px;
        margin-top: 5px;
        color: black;
    }

    .info_user {
        text-align: right;
        margin-top: 10px;
    }


    .con_user {
        display: inline-block;
        width: fit-content;
        height: fit-content;
        text-align: left;
        color: black;
        margin-right: 5px;
    }
    .send {
      width: 100%;
      height: 68px;
      background-color: #ffffff;
      position: relative;
      margin-top: 3.75rem;
      
    }
    .send-text {
      padding: 10px;
      box-sizing: border-box;
    }
    .send-btn {
      width: 5.875rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #3163C5;
      opacity: 1;
      border-radius: 4px;
      font-size: 10px;
      color: #ffffff;
      position: absolute;
      right: 5%;
      top: 30%;
      cursor: pointer;
      border: none;
    }
   
  </style>
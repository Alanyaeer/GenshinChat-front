// const Mock = new URL("mockjs", import.meta.url).href;

import Mock from 'mockjs'

Mock.mock(/friend\/friendList/, 'post', (id) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let ids = JSON.parse(id.body)
    if(ids.id == "1002"){
    console.log('here');

        return friendList
    }
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body)
    if (params.frinedId == "1002")
        return chatMsg1002
    if (params.frinedId == "1003")
        return chatMsg1003
    if (params.frinedId == "1004")
        return chatMsg1004
})

Mock.mock(/api\/login/, 'post', (objs)=>{
    let obj = JSON.parse(objs.body)
    if(obj.id === "1002" && obj.password === "123456"){
        return apiuser1
    }
    if(obj.id === "1003" && obj.password === "12345af6"){
        return apiuser2
    }
    if(obj.id === "1004" && obj.password === "1234afa56"){
        return apiuser3
    }
})
Mock.mock(/api\/register/, 'post', (objs)=>{
    let obj = JSON.parse(objs.body)
    if(obj.id === "1002" ){
        return apiregisteruser1
    }
    if(obj.id === "1003" ){
        return apiregisteruser2
    }
    if(obj.id === "1004" ){
        return apiregisteruser3
    }
})
let apiregisteruser1 = Mock.mock(
    {
        code: "1"
    }
)
let apiregisteruser2 = Mock.mock(
    {
        code: "1"
    }
)
let apiregisteruser3 = Mock.mock(
    {
        code: "0"
    }
)
Mock.mock(/api\/getuserInfo/, 'post', (objs) => {
    let obj = JSON.parse(objs.body)
    if(obj.id === '1002'){
        return apiuserInfo1
    }
    if(obj.id === '1003'){
        return apiuserInfo2
    }
    if(obj.id === '1004'){
        return apiuserInfo3
    }
})
let apiuserInfo1 = Mock.mock(
    {
        // data: {
        userid: '1002',
        username: '大毛',
        userimmg: '',
        userimg: new URL("@/assets/img/head_portrait4.jpg", import.meta.url).href,
        userdetail: '我是大毛'
        
        // }
    }
)
let apiuserInfo2 = Mock.mock(
    {
        // data: {
        userid: '1003',
        username: '小毛',
        userimmg: '',
        userimg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
        userdetail: '我是小毛'

        // }
    }
)
let apiuserInfo3 = Mock.mock(
    {
        // data: {
            userid: '1003',
            username: '小王',
            userimmg: '',
            userimg: new URL("@/assets/img/head_portrait6.jpg", import.meta.url).href,
            userdetail: '我是小王'

        // }
    }
)
let apiuser1 = Mock.mock(
    "1"
)
let apiuser2 = Mock.mock(
    "1"
)
let apiuser3 = Mock.mock(
    "0"
)
let friendList = Mock.mock(
    [
        {
            img: "",
            name: "大毛",
            detail: "我是大毛",
            lastMsg: "to do",
            id: "1002",
            headImg: new URL("@/assets/img/head_portrait4.jpg", import.meta.url).href,

        },
        {
            img: "",
            name: "小毛",
            detail: "我是小毛",
            lastMsg: "dada dw ertgthy juy",
            id: "1003",
            headImg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,

        },
        {
            img: "",
            name: "小王",
            detail: "我是小王",
            lastMsg: "大萨达萨达所大大萨达",
            id: "1004",
            headImg: new URL("@/assets/img/head_portrait6.jpg", import.meta.url).href,

        },
        {
            img: "",
            name: "赵六",
            detail: "我是赵六",
            lastMsg: "哇哈哈哈哈哈哈",
            id: "1005",
            headImg: new URL("@/assets/img/head_portrait7.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "张三",
            detail: "我是张三",
            lastMsg: "阿巴斯的后果的",
            id: "1006",
            headImg: new URL("@/assets/img/head_portrait8.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "王文举",
            detail: "我是王文举",
            lastMsg: "啊递归传播得",
            id: "1007",
            headImg: new URL("@/assets/img/head_portrait9.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "苏吹",
            detail: "我是苏吹",
            lastMsg: "上次护照吕大巴搜集",
            id: "1008",
            headImg: new URL("@/assets/img/head_portrait10.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "阿萨",
            detail: "我是阿萨",
            lastMsg: "出租租个牛的",
            id: "1009",
            headImg: new URL("@/assets/img/head_portrait11.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "战锤",
            detail: "我是战锤",
            lastMsg: "安科技公司仓库吧",
            id: "1010",
            headImg: new URL("@/assets/img/head_portrait12.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "安东尼",
            detail: "我是安东尼发",
            lastMsg: "看见这次就随便",
            id: "1011",
            headImg: new URL("@/assets/img/head_portrait13.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "安沙",
            detail: "我是安沙",
            lastMsg: "成都你哦在",
            id: "1012",
            headImg: new URL("@/assets/img/head_portrait14.jpg", import.meta.url).href,
        },
        {
            img: "",
            name: "安雅",
            detail: "我是安雅",
            lastMsg: "看哎是非常比",
            id: "1013",
            headImg: new URL("@/assets/img/head_portrait15.jpg", import.meta.url).href,
        },
    ]
)

let chatMsg1002 = Mock.mock(
    [
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " 在吗？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },

        {
            headImg: new URL("@/assets/img/head_portrait4.jpg", import.meta.url).href,
            name: "大毛",
            time: "09：12 AM",
            msg: " 怎么了？",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "问你个问题",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait4.jpg", import.meta.url).href,
            name: "大毛",
            time: "09：12 AM",
            msg: "别问",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: new URL("@/assets/img/emoji/slightly-smiling-face.png", import.meta.url).href,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "在干嘛呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: new URL("@/assets/img/emoji/slightly-smiling-face.png", import.meta.url).href,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
            name: "小毛",
            time: "09：12 AM",
            msg: "吃饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "吃的什么饭",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
            name: "小毛",
            time: "09：12 AM",
            msg: "蛋炒饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "加蛋了吗？",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
            name: "小毛",
            time: "09：12 AM",
            msg: "你说呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
            name: "小毛",
            time: "09：12 AM",
            msg: new URL("@/assets/img/emoji/slightly-smiling-face.png", import.meta.url).href,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1002", //uid
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: new URL("@/assets/img/emoji/slightly-smiling-face.png", import.meta.url).href,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait6.jpg", import.meta.url).href,
            name: "小王",
            time: "09：12 AM",
            msg: " 21312大萨达萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "111212",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: new URL("@/assets/img/head_portrait6.jpg", import.meta.url).href,
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)
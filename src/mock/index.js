// const Mock = new URL("mockjs", import.meta.url).href;
import Mock from 'mockjs'

Mock.mock(/friend\/friendList/, 'post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return friendList
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


let friendList = Mock.mock(
    [
        {
            img: "",
            name: "大毛",
            detail: "我是大毛",
            lastMsg: "to do",
            id: "1002",
            headImg: new URL("@/assets/head_portrait1.jpg", import.meta.url).href,

        },
        {
            img: "",
            name: "小毛",
            detail: "我是小毛",
            lastMsg: "dada dw ertgthy juy",
            id: "1003",
            headImg: new URL("@/assets/head_portrait2.jpg", import.meta.url).href,

        },
        {
            img: "",
            name: "小王",
            detail: "我是小王",
            lastMsg: "大萨达萨达所大大萨达",
            id: "1004",
            headImg: new URL("@/assets/head_portrait3.jpg", import.meta.url).href,

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
            headImg: new URL("@/assets/img/head_portrait1.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait1.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait2.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait2.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait2.jpg", import.meta.url).href,
            name: "小毛",
            time: "09：12 AM",
            msg: "你说呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: new URL("@/assets/img/head_portrait2.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait3.jpg", import.meta.url).href,
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
            headImg: new URL("@/assets/img/head_portrait3.jpg", import.meta.url).href,
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)
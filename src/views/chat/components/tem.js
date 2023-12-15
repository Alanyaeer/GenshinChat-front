 let curobj = await mycontent();
  if(!valueUploadList.value) valueUploadList.value = []
  valueUploadList.value.push(0.0)
  if(!stopupload.value) stopupload.value = []
      stopupload.value.push(true)
  if(!recordfile.value) recordfile.value = []
  const index = valueUploadList.value.length - 1
  recordfile[index] = e

  // if(!recordfile.value)  recordfile.value = []
  // if(recordfile.value[])
  // recordfile[stopupload.value.length - 1] = e;
  let chatFile = {
    msg: "",
    chatType: 2, //信息类型，0文字，1图片, 2文件

      fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)

    ...curobj,
    size: "",
    fileName: "",
    myId: userstore.userid,
    friendId: props.friendInfo.id
  };
  let files = e.target.files[0]; //图片文件名
  if(files.size>1024*1024*500){
    ElNotification({
        type: 'warning',
        title: '文件过大🎢',
        message: '选择上传该文件的压缩包✨'
    })
    return ;
  }
  const formData = new FormData()
  formData.append('e', files)
  
  // 策略2 分片上传
  const filesizes = files.size
  if(files.size >  1024 * 1024){
    const uploadslice = async()=>{
    if(!files)return 
    const chunks = createChunks(files,1024 * 1024)
    let uploadvalue = 0
    const result = await hash(chunks)
    let ispassfile = false
    let reuploadobj = {
      result: result
    }
    let reuploadcnt = await reUpload(reuploadobj)
    // 现在上传了 reuploadcnt  个文件对吧
    // reuploadcnt * 1024
    if(reuploadcnt !== chunks.length)
      valueUploadList.value[index] += (reuploadcnt * 1024 * 1024 * 100) / filesizes
    else 
      valueUploadList.value[index] = 100.0
    for(let i = reuploadcnt; i < chunks.length; ++i){
      if(stopupload.value[index] === false) return
      // let file = chunks[i]
      let chunkcnt = i
      let md5 = result
      const formData = new FormData()
      const blob = chunks[i]
    
      formData.append('file', blob)
      formData.append('hash', result)
      formData.append('chunkcnt', i)
      formData.append('filename', files.name)
      formData.append('totalCnt', chunks.length - 1)  
      await axios.post('/api/uploadslice', (formData),{
          onUploadProgress: function(progressEvent){
            function sendHeartbeat() {  
              setTimeout(function() {  
                if (socket.readyState === WebSocket.OPEN) {  
                  socket.send(''); // 发送空的心跳包给服务器  
                  sendHeartbeat(); // 递归调用发送心跳包函数，以保持连接活跃  
                } else {  
                  console.log('WebSocket连接已关闭');  
                }  
              }, 5000); // 每30秒发送一次心跳包给服务器  
            }
              
      // 在控制台打印上传百分比
              // console.log("{}: {}",progressEvent.loaded * 100 );
            
              valueUploadList.value[index] +=( (progressEvent.loaded * 100) / filesizes)
              console.log('上传进度：' + valueUploadList.value[index] + '%');
            } 
        })
    }
    let merge = {
      hash:  result,
      filename: files.name,
      totalCnt: chunks.length - 1
    }
    const finish = await fileMerge(merge)
    if(finish === 1){
      valueUploadList.value[index] = 100
    }
    sendSocket(chatFile)
    ElNotification({
      type: 'success',
      title: '上传了一个文件🎉',
      message: '上传成功🥳'
    })
  }
  
  // if(stopupload.value[index] === false) break
    function createChunks(files, chunkSize) {
      const results = []
      for(let i = 0; i < files.size; i += chunkSize){
        results.push(files.slice(i, i + chunkSize))
      }
      return results
    }
    // 增量算法
    function hash(chunks){
      const spark = new SparkMD5
      return new Promise(resovle=>{
          function _read(i){
          if(i >= chunks.length){
            //输出一个哈希
            resovle(spark.end());
            return ;
          }
          const blob = chunks[i]
          const reader = new FileReader
          reader.onload = e=>{
            const bytes = e.target.result
            spark.append(bytes)
            _read(i + 1)
          } 
          reader.readAsArrayBuffer(blob)
        }
        _read(0)
      })
    }
    uploadslice()
  }
const express = require('express')

const app = express()

//静态页面
app.use( express.static('public/'))

app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(3000,()=>console.log('正在running'+__dirname))
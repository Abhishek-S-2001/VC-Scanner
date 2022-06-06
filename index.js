const express = require('express')
const { path } = require('express/lib/application')
const req = require('express/lib/request')
const multer = require('multer')
const ejs = require('ejs')
const Path = require('path')

const app = express()
app.use(express.json())

const PORT = process.env.PORT | 3000

app.set("view engine","ejs");

app.get('/', (req, res)=> {
    res.render('uploadpage')
})

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/');
    },
    filename: (req,file, callback) => {
        console.log(file)
        callback(null, Date.now().toString().trim().replace(/:/g, '-') + (Math.floor(Math.random() * 1000)).toString());
    }
});

var upload = multer({
    storage: Storage
})

app.get('/upload', (req, res)=> {
    res.render('upload')
})


app.post('/upload', upload.single('image'), (req,res) => {
    res.send('Image Uploaded..')
})

app.listen(PORT, () => {
    console.log('Started Listening on Port 3000');
} )

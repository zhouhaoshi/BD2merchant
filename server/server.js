import { createRequire } from 'module';
const require = createRequire(import.meta.url);
export const fs = require('fs');

const express = require('express'); // 线程
const app = express(); // 创建进程
const cors = require('cors') // 跨域处理
const bodyParser = require('body-parser') // body数据处理
import { router } from './router.js';

//配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()) // 配置跨域
app.use(express.json());
app.use(router);

// 读取文件
export const readFile = async (url) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(url, 'utf8',(err, data) => {
      if (err) { reject(err) }
      resolve({ code: 200, message: 'success', data: JSON.parse(data) })
    });
  })
}

// 写入文件
export const writeFile = async (url, writeData) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(url, writeData, 'utf8', (err) => {
      if (err) { reject(err) }
      resolve({ code: 200, message: 'success', data: '完成修改,保存成功！' })
    });
  })
}

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});

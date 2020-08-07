import fs from 'fs-extra'
import path from 'path'
import lowdb from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import { app, remote } from 'electron'

const App = process.type === 'renderer' ? remote.app : app

const USER_DATA_DIR = App.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(USER_DATA_DIR)) {
    // 如果不存在路径
    fs.mkdirpSync(USER_DATA_DIR) // 就创建
  }
}

const adapter = new FileSync(path.join(USER_DATA_DIR, 'data.json'))

const db = lowdb(adapter)
db._.mixin(LodashId)

// 初始化 db 内容
if (!db.has('author').value()) {
  db.set('author', 'SsrCoder').write()
}

export default db

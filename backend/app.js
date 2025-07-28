const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./utils/db'); // 💡 DB 연결 파일 import

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('guildAdmin 서버 실행 중!');
});

// ✅ MySQL 연결 확인 후 서버 시작
async function startServer() {
  try {
    const [rows] = await db.query('SELECT 1'); // 연결 테스트 쿼리
    console.log('✅ MySQL 데이터베이스 연결 성공');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MySQL 연결 실패:', err.message);
    process.exit(1); // 서버 종료
  }
}

startServer();

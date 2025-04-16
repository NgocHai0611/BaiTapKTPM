const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;


// 👮‍♂️ Tạo limiter
const apiLimiter = rateLimit({
    windowMs: 10000, // 5 giây
    max: 2, // Tối đa 2 request
    message: { error: '🚫 Too many requests – please slow down!' }, // Message trả về nếu vượt quá giới hạn
});

// 🧪 Test endpoint có rate limit
app.get('/test', apiLimiter, (req, res) => {
    res.json({ message: '✅ Request accepted!' });
});

app.get('/data', async(req, res) => {
    const delay = parseInt(req.query.delay) || 1000;
    console.log(`⏳ Simulating response delay: ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
    res.json({ message: `✅ Responded after ${delay}ms` });
});




app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
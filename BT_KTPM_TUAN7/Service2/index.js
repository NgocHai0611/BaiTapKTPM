const express = require('express');
const axios = require('axios');
let pRetry;
(async() => {
    const module = await
    import ('p-retry');
    pRetry = module.default;
})();

const rateLimit = require('express-rate-limit');
const CircuitBreaker = require('opossum');


// 👮‍♂️ Tạo limiter
const apiLimiter = rateLimit({
    windowMs: 10000, // 3 giây
    max: 2, // Tối đa 2 request
    message: { error: '🚫 Too many requests – please slow down!' },
});

const app = express();
const PORT = 3001;

// 🧠 API bạn muốn gọi
const callServiceApi = async() => {
    const res = await axios.get('http://localhost:3000/test'); // đổi link nếu cần
    return res.data;
};

// ⏱ Promise timeout helper
const timeout = (ms) => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('⏰ Sever Dead ')), ms)
);

// 📦 Kết hợp retry và timeout
const resilientApiCall = async() => {
    return Promise.race([
        pRetry(callServiceApi, {
            retries: 10, // tối đa số lần thử lại (sẽ bị giới hạn bởi timeout 5s)
            minTimeout: 500, // thời gian chờ giữa mỗi lần thử (0.5s)
            onFailedAttempt: err => {
                console.log(`❗ Retry #${err.attemptNumber}: ${err.message}`);
            },
        }),
        timeout(10000)
    ]);
};


//Set up Circuit Breaker
const createBreaker = (delay) => {
    const callApi = () => axios.get(`http://localhost:3000/data?delay=${delay}`);

    const breaker = new CircuitBreaker(callApi, {
        timeout: 3000, // nếu >3s thì timeout
        errorThresholdPercentage: 50,
        resetTimeout: 1000, // chờ 1s rồi thử lại
    });

    breaker.on('open', () => console.log('🔴 Circuit OPEN'));
    breaker.on('close', () => console.log('🟢 Circuit CLOSED'));

    return breaker;
};


app.get('/breaker-test', async(req, res) => {
    const delay = parseInt(req.query.delay) || 1000;
    const breaker = createBreaker(delay);

    try {
        const result = await breaker.fire();
        res.json({ success: true, data: result.data });
    } catch (err) {
        res.status(500).json({ error: '❌ He Thong Dang Qua Tai', message: err.message });
    }
});



// 🧪 Route test retry logic
app.get('/retry-test', apiLimiter, async(req, res) => {
    try {
        const data = await resilientApiCall();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Retry Service running at http://localhost:${PORT}`);
});
# 🚀 Hướng dẫn setup Gemini AI (FREE)

Gemini AI của Google có **free tier** với 15 requests/minute - hoàn toàn đủ để test chatbot!

## Bước 1: Lấy Gemini API Key (MIỄN PHÍ)

1. Vào https://makersuite.google.com/app/apikey
2. Đăng nhập với Google account
3. Click **"Create API Key"**
4. Chọn project hoặc tạo project mới
5. Copy API key vừa tạo

## Bước 2: Cấu hình API Key

Mở file `.env` và thêm Gemini API key:

```bash
# Gemini AI Configuration (Free tier - 15 requests/minute)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Bước 3: Test chatbot

1. Restart dev server: `npm run dev`
2. Mở http://localhost:5175
3. Click icon chat và thử hỏi về NFT!

## ✅ Ưu điểm Gemini vs OpenAI:

- **MIỄN PHÍ** - không cần thanh toán
- **15 requests/phút** - đủ cho test và demo
- **Không cần credit card**
- **Trả lời tiếng Việt tốt**
- **Hiểu context NFT/crypto**

## 🎯 Ví dụ câu hỏi test:

- "Thị trường NFT hôm nay thế nào?"
- "Tôi có 2 ETH nên mua NFT gì?"
- "BAYC và Azuki collection nào tốt hơn?"
- "Tư vấn newbie mua NFT lần đầu"

Enjoy your FREE NFT AI assistant! 🤖✨
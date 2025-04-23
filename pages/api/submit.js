// Đảm bảo API có thể parse JSON
export default async function handler(req, res) {
  // Thiết lập CORS cho mọi yêu cầu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Nếu là yêu cầu "preflight" (OPTIONS), trả về 200 OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Xử lý POST
  if (req.method === 'POST') {
    try {
      // Đảm bảo rằng body đã được parse đúng
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Thiếu username hoặc password' });
      }

      console.log('Dữ liệu nhận được:', { username, password });

      // Gửi phản hồi OK
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Lỗi xử lý:', error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  }

  // Nếu không phải POST hoặc OPTIONS
  return res.status(405).json({ message: 'Method Not Allowed' });
}

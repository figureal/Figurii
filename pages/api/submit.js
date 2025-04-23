// Đảm bảo API có thể parse JSON
export default async function handler(req, res) {
  // Thiết lập CORS cho mọi yêu cầu
  res.setHeader('Access-Control-Allow-Origin', '*'); // Chấp nhận yêu cầu từ tất cả các nguồn
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Chấp nhận các phương thức POST và OPTIONS
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cho phép header Content-Type

  // Nếu là yêu cầu "preflight" (OPTIONS), trả về 200 OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Trả về mã trạng thái 200 cho yêu cầu OPTIONS
  }

  // Xử lý POST
  if (req.method === 'POST') {
    try {
      // Đảm bảo rằng body đã được parse đúng
      const { username, password } = req.body;

      // Kiểm tra xem dữ liệu có đầy đủ không
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu username hoặc password'
        }); // Trả về lỗi 400 nếu thiếu dữ liệu
      }

      console.log('Dữ liệu nhận được:', { username, password });

      // Gửi phản hồi OK nếu mọi thứ ổn
      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công'
      });
    } catch (error) {
      // Nếu có lỗi trong quá trình xử lý
      console.error('Lỗi xử lý:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server'
      }); // Trả về lỗi 500 nếu có lỗi xử lý
    }
  }

  // Nếu phương thức không phải POST hoặc OPTIONS, trả về lỗi Method Not Allowed
  return res.status(405).json({
    success: false,
    message: 'Sai roi nhe con lon'
  });
}

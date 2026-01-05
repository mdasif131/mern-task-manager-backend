export const getOTPEmailTemplate = (otp, userName = 'User') => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          .message {
            font-size: 15px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .otp-container {
            text-align: center;
            margin: 35px 0;
          }
          .otp-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 3px dashed #667eea;
            border-radius: 12px;
            padding: 25px 20px;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
          }
          .otp-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .otp-code {
            font-size: 42px;
            font-weight: 700;
            letter-spacing: 10px;
            color: #667eea;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
          }
          .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 16px 20px;
            margin: 30px 0;
            border-radius: 6px;
          }
          .warning-box strong {
            color: #856404;
            display: block;
            margin-bottom: 5px;
          }
          .warning-box p {
            margin: 5px 0;
            color: #856404;
            font-size: 14px;
          }
          .info-box {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 16px 20px;
            margin: 20px 0;
            border-radius: 6px;
          }
          .info-box p {
            margin: 5px 0;
            color: #0c5460;
            font-size: 14px;
          }
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #dee2e6;
          }
          .footer-text {
            font-size: 13px;
            color: #6c757d;
            margin: 8px 0;
          }
          .footer-link {
            color: #667eea;
            text-decoration: none;
          }
          .footer-link:hover {
            text-decoration: underline;
          }
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #dee2e6, transparent);
            margin: 25px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🔐 Verification Code</h1>
            <p>Task Manager - Password Recovery</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello ${userName}! 👋
            </div>
            
            <div class="message">
              We received a request to reset your password. Use the verification code below to proceed with resetting your password.
            </div>
            
            <div class="otp-container">
              <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
              </div>
            </div>
            
            <div class="warning-box">
              <strong>⏰ Important Notice:</strong>
              <p>This verification code will expire in <strong>10 minutes</strong></p>
              <p>For security reasons, do not share this code with anyone.</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-box">
              <p>💡 <strong>Didn't request this?</strong></p>
              <p>If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
            </div>
          </div>
          
          <div class="footer">
            <p class="footer-text">
              This is an automated message from <strong>Task Manager</strong>
            </p>
            <p class="footer-text">
              Please do not reply to this email
            </p>
            <div class="divider"></div>
            <p class="footer-text">
              Need help? <a href="mailto:support@taskmanager.com" class="footer-link">Contact Support</a>
            </p>
            <p class="footer-text">
              &copy; 2024 Task Manager. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

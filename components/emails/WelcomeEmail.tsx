import { Html } from '@react-email/html';

const SendingWelcomeMail = ({ name }:{name:string}) => {
  return (
    <Html>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          height:"auto",
          backgroundColor:"aliceblue",
          border:"1px solid blue",
        }}
      >
        <header
          style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#3490dc',
            color: '#ffffff',
            fontSize: '24px',
          }}
        >
          CRMPRO
        </header>
        <div style={{ padding: '20px' }}>
          <h1 style={{ fontSize: '24px', color: '#333333' }}>Welcome, {name}!</h1>
          <p style={{ fontSize: '16px', color: '#6c757d' }}>
            We&apos;re excited to have you on board at CRMPRO. Your one-stop solution for managing your customers effectively.
          </p>
        </div>
        <footer
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            borderTop: '1px solid #dddddd',
            fontSize: '12px',
            color: '#999999',
          }}
        >
          <p>CRMPRO</p>
          <p>Auto-generated mail. Please do not reply.</p>
        </footer>
      </div>
    </Html>
  );
};

export default SendingWelcomeMail;

import { Html } from '@react-email/html';
const ResetPassEmail = ({name,resetlink}:{name:string,resetlink:string}) => {
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
          RESET Password
        </header>
        <div style={{ padding: '20px' }}>
          <h1 style={{ fontSize: '24px', color: '#333333' }}>Reset Passowrd Link, {name}!</h1>
          <p style={{ fontSize: '16px', color: '#6c757d' }}>
            Click on Reset Password Button.
            <a href={`${resetlink}`}>
                <button style={{padding:"2px",backgroundColor:"wheat",color:"black"}}>RESET Password</button>
            </a>
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
  )
}

export default ResetPassEmail

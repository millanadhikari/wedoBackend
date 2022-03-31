const nodemailer = require('nodemailer');




const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "wedocleaning99@gmail.com",
                    pass: "yprkdbxnjgtatkyg"
                }
            })


            let result = await transporter.sendMail(info);

            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            resolve(result);
        } catch (error) {
            console.log(error);
        }
    });
};

const bookingEmailProcessor = ({ bookingObj }) => {
    // let info = "";
    // info = {
    //     from: 'WEDO CLEANING SERVICES" <wedocleaning99@gmail.com>', // sender address
    //     to: bookingObj.email, // list of receivers
    //     subject: "Booking Confirmation", // Subject line
    //     text:
    //         "I am pleased to contact you for booking confirmation End of Lease Cleaning service, below are the details you’ve provided.", // plain text body
    //     html: `<b>GDay, <h3> ${bookingObj.name} </h3> </b>
    //     Thanks for booking a cleaning services with us. Your Booking Details are:
    //     <h3>Selected Service: ${bookingObj.selectedService} </h3>
    //     <p>Bedrooms: ${bookingObj.bedrooms}  </p>
    //     <p>Bathrooms: ${bookingObj.toilets} </p>
    //   <p style={{fontWeight:"semibold"}}>Full Name: ${bookingObj.name}</p> 
    //   <p>Email: ${bookingObj.email}</p>
    //   <p>Phone: ${bookingObj.phone}</p>
    //   <p>Address:${bookingObj.address} </p>
    //   <p>As information provided for the property with  bedroom & required will cost you ${bookingObj.totalPrice}, 
    //   this is a rough estimate as we have not inspected the property yet. </p>
    //   <p>Please note: This quote price (${bookingObj.totalPrice}) may only vary if the property condition is not met.</p>
    //   <p>Our cleaning team will inform the final price for approval, if massive changes need to be done before starting the job.
    //   Our Team will notify you an hour before arrival to property. If any thing changes on your end please let us know.  
    //   </p>      
    //   Kind Regards,
      
    //   <h2>WEDO CLEANING SERVICES </h2>
    //   <a>www.wedocleaning.com.au</a>
    //   <p>wedocleaning99@gmail.com</p>
    //   <p>Phone:0415976451</p>
    //   <p>ABN: 92 299 193 092 </p>
    //   `, // html body
    // };

     info = {
        from: 'WEDO CLEANING SERVICES" <wedocleaning99@gmail.com>', // sender address
        to: bookingObj.email, // list of receivers
        subject: "Booking Confirmation", // Subject line
        text:
            "I am pleased to contact you for booking confirmation End of Lease Cleaning service, below are the details you’ve provided.", // plain text body
        html: ` <div
        style={{
          backgroundColor: '#f6f7f9',
          height: '100vh',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: 'auto',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://ci3.googleusercontent.com/proxy/Tn5wZfpMann6OG0CJW7E255Bv6Fn6C6TYHUMLiSAbF3mmuyE3S9pLYJONA5FDgAXsO_54GXmqXrD7clExuxe93eha48hvtk=s0-d-e1-ft#https://images.kiwi.com/whitelabels/0x80/kiwicom.png"
                alt="logo"
                height="60px"
                width="100px"
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10px',
                  marginLeft: '20px',
                  borderLeft: '1px solid gray',
                  height: '40px',
                }}
              >
                Making Clean Better
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ color: '#3e4058' }}>
                For more info, open{' '}
                <span style={{ textDecoration: 'underline' }}>Help</span>
              </p>
              <button
                style={{
                  marginLeft: '15px',
                  padding: '10px 15px 10px 15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'white',
                  border: 'none',
                  backgroundColor: '#00aa91',
                }}
              >
                {' '}
                Manage My Booking{' '}
              </button>
            </div>
          </div>
          <div>
            <div
              style={{
                border: '1px solid gray',
                width: '170px',
                borderRadius: '1rem',
                display: 'flex',
                backgroundColor: '#5f738d',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30px',
                fontSize: '14px',
                fontWeight: 'bold',
                margin: '20px 10px 10px 5px',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: '28px', display: 'flex', color: '#5f738d' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <title>Information Circle</title>
                  <path
                    d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                    fill="white"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-width="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M220 220h32v116"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="32"
                    d="M208 340h88"
                  />
                  <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z" />
                </svg>
              </div>
              <p style={{ marginLeft: '3px', letterSpacing: '1px' }}>
                Cleaning Services{' '}
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              marginTop: '30px',
              padding: '20px 50px 20px 50px',
            }}
          >
            <h3>End of Lease Cleaning Service</h3>
            <h2>We have booked everything for you cleaning service.</h2>
            <div
              style={{
                display: 'flex',
                width: '400px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#3e4058',
                    letterSpacing: '0.8px',
                    fontSize: '13px',
                  }}
                >
                  BOOKING NUMBER
                </p>
                <div
                  style={{
                    fontSize: '17px',
                    letterSpacing: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  989 898 989{' '}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#3e4058',
                    letterSpacing: '0.8px',
                    fontSize: '12px',
                  }}
                >
                  STATUS
                </p>
                <div
                  style={{
                    border: '1px solid gray',
                    width: '102px',
                    borderRadius: '1rem',
                    display: 'flex',
                    backgroundColor: '#28a138',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{ width: '16px', display: 'flex', color: '#5f738d' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="white"
                    >
                      <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                    </svg>
                  </div>
                  <p style={{ marginLeft: '3px', letterSpacing: '1px' }}>
                    Confirmed{' '}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: '16px',
                width: '80%',
                marginTop: '30px',
                fontFamily: 'Arial, sans-sarif',
              }}
            >
              <p>We're happy to confirm that your booking is complete. </p>
              <p style={{ lineSpace: '2px' }}>
                Now you can manage your booking, choose additional services and
                start preparing for end of lease cleaning day.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  backgroundColor: '##e8edf1',
                  width: '43%',
                  margin: 'auto',
                  marginTop: '25px',
                }}
              >
                <p style={{ marginRight: '8px' }}> Download e-invoice</p>
                <div style={{ width: '28px', display: 'flex', color: '#5f738d' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `, // html body
    };
    send(info);
}

module.exports = { bookingEmailProcessor}
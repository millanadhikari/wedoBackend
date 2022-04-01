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
        html: `<p>Hello</p>`,
        amp: `
        <!doctype html>
        <html>
  <head>
    <meta charset="UTF-8">
    <script src="script.js"></script>
    <style>
      .container {
          font-size: 16px;
          font-family: Arial;
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: #f6f7f9;
          height: 100vh;
          
          
      }
      .nav {
          font-size: 13px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
          padding: 20px,
      }
      .subnav {
        display: flex;
        justify-content: space-between;
      }
      .header {
         display: flex;
         align-items: center
      }
      .sublogo { 
        display: flex;
        align-items: center;
                padding-left: 10px;
                margin-left: 20px;
                border-left: 1px solid gray;
                height: 40px;
      }
      .rightnavbar {
        display: flex;
        align-items: center
      }
      .rightnavbar > p {
        color: #3e4058;
        font-size:12px
      }
      .rightbutton {
        margin-left: 15px;
        padding: 10px 15px 10px 15px;
        font-weight: bold;
        cursor: pointer;
        font-size:12px;
        color: white;
        border: none;
        background-color: #00aa91
      }
      .hatti { 
              border: 1px solid gray;
              width: 120px;
              border-radius: 1rem;
              display: flex;
              background-color: #5f738d;
              color: white;
              align-items: center;
              justify-content: center;
              height: 22px;
              font-size: 10px;
              font-weight: bold;
              margin: 20px 10px 10px 5px;
              cursor: pointer;
      }
      .hatti_support { 
        width: 20px;
        display: flex;
        color: #5f738d
      }
      .cleaning_services { 
        margin-left: 1px ;
             }
      .banner {
        background-color: white;
            margin-top: 30px;
            padding: 20px 50px 20px 50px
      }
      .banner_sub { 
        display: flex;
              width: 400px;
              align-items: center;
              justify-content: space-between;
      }
      .booking_number { 
        font-weight: bold;
        color: #3e4058;
        letter-spacing: 0.8px;
        font-size: 12px;
      }

      .booking_num { 
        font-size: 15px;
        letter-spacing: 4px;
        font-weight: bold;
      }

      .status { 
        font-weight: bold;
        color: #3e4058;
        letter-spacing: 0.8px;
        font-size: 12px;
      }

      .confirmed { 
        border: 1px solid white;
        width: 93px;
        border-radius: 1rem;
        display: flex;
        background-color: #28a138;
        color: white;
        align-items: center;
        justify-content: center;
        height: 20px;
        font-size: 11px;
        font-weight: bold;
        
        cursor: 'pointer'
      }

      .confirmed_icon { 
        width: 13px;
        margin-right:7px;
        display: flex; 
        color: #5f738d;
        
      }
      .paragraph { 
        font-size: 16px;
              width: 95%;
              margin-top: 30px;
              font-family: Arial,
      }
      .invoice_button { 
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-color: ##e8edf1;
        width: 43%;
        margin: auto;
        margin-top: 25px;
      }
      .invoice_icon { 
        width: 16px;
        display: flex;
        color: #5f738d;
        margin-left:6px
      }
    </style>
    <link rel="stylesheet" type="text/css" href="styles.css">
  </head>
  <body>
  <div class="container" >
      <div class="nav">
        <div class = "subnav">
          <div class="header">
            <img
              src="https://ci3.googleusercontent.com/proxy/Tn5wZfpMann6OG0CJW7E255Bv6Fn6C6TYHUMLiSAbF3mmuyE3S9pLYJONA5FDgAXsO_54GXmqXrD7clExuxe93eha48hvtk=s0-d-e1-ft#https://images.kiwi.com/whitelabels/0x80/kiwicom.png"
              alt="logo"
              height="60px"
              width="100px"
            />
            <div class="sublogo">
              Making Clean Better
            </div>
          </div>
          <div class="rightnavbar"  >
            <p>
              For more info, open
              <span>Help</span>
            </p>
            <button
             class = "rightbutton"
            >
              
              Manage My Booking
            </button>
          </div>
        </div>
        <div>
          <div class="hatti">
            <div class="hatti_support">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
            <p class = "cleaning_services">
              Cleaning Services
            </p>
          </div>
        </div>
        <div class="banner" >
          <h3>End of Lease Cleaning Service</h3>
          <h2>We have booked everything for you cleaning service.</h2>
          <div class = "banner_sub">
            <div>
              <p class = "booking_number">
                BOOKING NUMBER
              </p>
              <div
               class= "booking_num"
              >
                989 898 989
              </div>
            </div>
            <div>
              <p class="status"> STATUS
              </p>
              <div
              class="confirmed"
              >
                <div class="confirmed_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="white"
                  >
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                  </svg>
                </div>
                <p>
                  Confirmed
                </p>
              </div>
            </div>
          </div>
          <div class="paragraph">
            <p>We're happy to confirm that your booking is complete. </p>
            <p>
              Now you can manage your booking, choose additional services and
              start preparing for end of lease cleaning day.
            </p>
            <div
              class="invoice_button"
            >
              <p> Download e-invoice</p>
              <div class="invoice_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`
    };
    send(info);
}

module.exports = { bookingEmailProcessor}
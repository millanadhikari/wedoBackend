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
    let info = "";
    info = {
        from: 'WEDO CLEANING SERVICES" <wedocleaning99@gmail.com>', // sender address
        to: bookingObj.email, // list of receivers
        subject: "Booking Confirmation", // Subject line
        text:
            "I am pleased to contact you for booking confirmation End of Lease Cleaning service, below are the details you’ve provided.", // plain text body
        html: `<b>GDay, <h3> ${bookingObj.name} </h3> </b>
        Thanks for booking a cleaning services with us. Your Booking Details are:
        <h3>Selected Service: ${bookingObj.selectedService} </h3>
        <p>Bedrooms: ${bookingObj.bedrooms}  </p>
        <p>Bathrooms: ${bookingObj.toilets} </p>
        <p>Addons Selected:${bookingObj.products.map((item) => item.title)}</p>
      <p style={{fontWeight:"semibold"}}>Full Name: ${bookingObj.name}</p> 
      <p>Email: ${bookingObj.email}</p>
      <p>Phone: ${bookingObj.phone}</p>
      <p>Address: ${bookingObj.address}</p>
      <p>As information provided for the property with ${bookingObj.bedrooms} bedroom & ${bookingObj.toilets} required will cost you ${booking.totalPrice}, this is a rough estimate as we have not inspected the property yet. </p>
      <p>Please note: This quote price (${bookingObj.totalPrice}) may only vary if the property condition is not met.</p>
      <p>Our cleaning team will inform the final price for approval, if massive changes need to be done before starting the job.
      Our Team will notify you an hour before arrival to property. If any thing changes on your end please let us know.  
      </p>      
      Kind Regards,
      
      <h2>WEDO CLEANING SERVICES </h2>
      <a>www.wedocleaning.com.au</a>
      <p>wedocleaning99@gmail.com</p>
      <p>Phone:0415976451</p>
      <p>ABN: 92 299 193 092 </p>
      `, // html body
    };

    send(info);
}

module.exports = { bookingEmailProcessor}
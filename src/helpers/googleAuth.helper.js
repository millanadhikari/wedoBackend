
const redirectURI = "auth/google";

// function getGoogleAuthURL() {
//     const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
//     const options = {
//       redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       access_type: "offline",
//       response_type: "code",
//       prompt: "consent",
//       scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//       ].join(" "),
//     };
  
//     return `${rootUrl}?${new URLSearchParams.toString(options)}`;
//   }
  
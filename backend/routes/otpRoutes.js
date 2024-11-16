import express from 'express'
const router = express.Router();
import twilio from 'twilio'

const accountSid = "AC163baf6f85629adc6cfca4718c9d76c4"; // Your Twilio Account SID
const authToken = "740484949ac0d402e8ce12d7c1fe5863"; // Your Twilio Auth Token
const verifySid = "VAfbfc941e07f9c2e8125aee73ba15a3a3"; // Your Twilio Verify SID
const client = twilio(accountSid, authToken);

// Route to send OTP
router.post("/api/sendOtp", async (req, res) => {
    console.log("otp came...");
    
  //const { phoneNumber } = req.body;
  console.log(req.body);
  const phoneNumber = "+91" + req.body.ownerContact;
  

  // Make sure phoneNumber is passed in the body
  if (!phoneNumber) {
    console.log("inside phone no.");
    
    return res.status(400).json({ error: "Phone number is required" });
  }

  client.verify.v2
    .services(verifySid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      res.status(200).json({ status: 'success', message: "OTP sent successfully" });
    })
    .catch((err) => {
      console.error("Error sending OTP:", err);
      res.status(500).json({ error: "Error sending OTP" });
    });
});

// Route to verify OTP
router.post("/api/verifyOtp", async (req, res) => {
  const { ownerContact : phoneNumber, otp } = req.body;
  console.log(req.body);
  

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: "+91"+phoneNumber, code: otp })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        res.status(200).json({ status: verification_check.status, message: "OTP verified successfully" });
      } else {
        res.status(400).json({ status: verification_check.status, error: "Invalid OTP" });
      }
    })
    .catch((err) => {
      console.error("Error verifying OTP:", err);
      res.status(500).json({ error: "Error verifying OTP" });
    });
});

export {router};

import express from 'express';
import { pendingReq } from '../models/pendingReq.models.js';
//import { acceptedRestos } from '../models/acceptedRestos.models.js'; // Assuming you have an acceptedRestos model
import { Restorent } from '../models/Restorent.models.js';

const router = express.Router();

router.get('/api/registerResto', async (req, res) => {
  console.log("check cookie", req.body);
  const data = await pendingReq.find({});
  console.log(data);
  res.json(data);
});

// Handling POST request
router.post('/api/registerResto', async (req, res) => {
  console.log("req", req.body);

  const { restoName, restoAddress, restoOwner, ownerContact, restoPassword } = req.body;

  // Check if mobile number already exists in either the 'pendingReq' or 'acceptedRestos' collection
  const existingPendingRequest = await pendingReq.findOne({ OwnerContact: ownerContact });
  const existingAcceptedResto = await Restorent.findOne({ OwnerContact: ownerContact });

  if (existingPendingRequest) {
    return res.status(400).json({ message: "This mobile number is already in use for a pending restaurant registration." });
  }

  if (existingAcceptedResto) {
    return res.status(400).json({ message: "This mobile number is already registered with an accepted restaurant." });
  }

  // If mobile number doesn't exist in either collection, proceed to register
  const newPendingReq = new pendingReq({
    RestoName: restoName,
    RestoAddress: restoAddress,
    RestoOwner: restoOwner,
    OwnerContact: ownerContact,
    RestoPassword: restoPassword
  });

  try {
    const savedData = await newPendingReq.save();
    console.log(savedData);
    console.log("saved into db");
    res.send("Restaurant registration is successful. We'll review your request soon.");
  } catch (err) {
    console.log("Error while saving into db", err);
    res.status(500).json({ message: "Error while registering restaurant." });
  }
});

export { router };

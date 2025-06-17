const Contact = require("../models/contactModel");

const inquiry = async (req, res, next) => {
  const { inquiry, name, studio, message } = req.body;
  try {
    if (!inquiry || !studio || !message) {
      throw new Error("Missing required fields, please review.");
    }

    const newInquiry = new Contact({
      inquiry,
      name,
      studio,
      message,
    });

    await newInquiry.save();

    res.status(201).json({
      success: { message: "A new inquiry has been received." },
      data: { newInquiry },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Contact.find({ status: "Received" });

    res.status(200).json({
      success: { message: "Successfully retrieved inquiries." },
      data: { inquiries },
    });
  } catch (error) {
    return next(error);
  }
};

const updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await Contact.findByIdAndUpdate(
      id,
      { status: "Completed" },
      { new: true }
    );

    res.status(201).json({
        success: { message: "Inquiry updated successfully."},
        data: {inquiry},
        statusCode: 201
    })
  } catch (error) {
    console.log(error)
  }
};

module.exports = { inquiry, getInquiries, updateInquiry };

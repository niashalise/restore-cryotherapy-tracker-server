const Contact = require("../models/contactModel")

const inquiry = async (req, res, next) => {
    const { inquiry, name, studio, message } = req.body;
    try {
        if (!inquiry || !studio || !message) {
            throw new Error("Missing required fields, please review.")
        }

        const newInquiry = new Contact({
            inquiry,
            name, 
            studio,
            message
        });

        await newInquiry.save();

        res.status(201).json({
            success: {
                message: "A new inquiry has been received.",
                data: { newInquiry },
                statusCode: 201
            }
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = { inquiry };
import Subscriber from "../models/Subscriber.js";

export const subscriberNewsletter = async (req, res) => {
    try{
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({success: false, message: "Please provide an email"});
        }

        const existing = await Subscriber.findOne({email});
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "You are already subscribed with this email",
            });
        }
        const subscriber = await Subscriber.create({email});

        res.status(201).json({
            success: true,
            message: "Subscribed successfully! Welcome to the loop.",
            data: subscriber,
        });    
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};
const agent = require('../models/agent.model');

exports.createAgent = async (requestAnimationFrame, res) => {
    try {
        if (Array.isArray(requestAnimationFrame.body)) {
            const agents = await agent.insertMany(requestAnimationFrame.body);
            return res.status(201).json(agents);
        } else {
            const newAgent = new agent(requestAnimationFrame.body);
            await newAgent.save();
            return res.status(201).json(newAgent);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await agent.find();
        res.status(200).json(agents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
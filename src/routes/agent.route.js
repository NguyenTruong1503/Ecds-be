const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');

router.post('/', agentController.createAgent);
router.get('/', agentController.getAllAgents);

module.exports = router;
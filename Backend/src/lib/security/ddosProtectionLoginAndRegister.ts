import rateLimit from 'express-rate-limit';

const ddosProtectionLoginAndRegister = rateLimit({
	windowMs: 10 * 60 * 1000, 
	max: 8, // Limit each IP to 100 
	standardHeaders: true, 
	legacyHeaders: false,
    message: 'Too much requests from your Ip.',
});

export default ddosProtectionLoginAndRegister
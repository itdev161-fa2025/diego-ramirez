import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import cors from 'cors';

// Initialize express application
const app = express();

// Connect Database
connectDatabase();

// Configure Middleware
app.use(express.json({extended: false}));
app.use(cors({origin: "http://localhost:3000"}));

// API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register User
 */
app.post(
  '/api/users',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check(
      'password',
      'Please enter password of at least 6 characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }else{
        return res.send(req.body);
    }
  }
);

// Connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`)); 

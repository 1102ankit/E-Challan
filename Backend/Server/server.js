var express      = require('express'),
bodyParser   = require('body-parser'),
app          = express(),
cors         = require('cors');
router       = express.Router(),
routes       = require('./routes');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('', router);

router.get("/",routes.challana);
router.post("/register",routes.CreateUser);
router.post("/login",routes.login);
router.get("/getDetails",routes.challan);
router.get("/paychallan",routes.PayChallan);
router.post("/report",routes.Report);
router.post("/feedback",routes.Feedback);
router.get("/Challan",routes.genChallan);
router.get("/PucRead",routes.PucRead);
router.get("/mail",routes.sendEmail);
app.listen(3000);
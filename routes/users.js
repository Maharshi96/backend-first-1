var express = require('express');
var router = express.Router();
// var sqlConnectionObject = require("../app");
var sqlConnectionObject = require("../sqlconnection");
const {spawn} = require('child_process');

router.get('/asn', function(req, res, next) {
  let sqlQuery = `Select * From `
  res.send('respond with a resource');
});

router.get('/asndetails', function(req, res, next) {
  let sqlQuery = `select ilpn, ilpn_status from project1`
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      console.log(result)
      res.json(result);
    }
  })
  // res.send('respond with a resource');
});

router.post('/asndetailssearch', function(req, res, next) {
  console.log("inside search api")
  var flag = true;
  let sqlQuery = `select ilpn, ilpn_status from project1`
  if (req.body.ilpn || req.body.asn){
  sqlQuery = sqlQuery + " where"
    if (req.body.ilpn){
      sqlQuery = sqlQuery + ` ilpn = ${req.body.ilpn}`
      if (req.body.asn){
        sqlQuery = sqlQuery + ` or ASN = ${req.body.asn}`
        flag = false;
      }
    }
    if (req.body.asn && flag){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn}`
    }
  }
  // console.log(sqlQuery)
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      // console.log(result)
      res.json(result);
    }
  })
  // res.send('respond with a resource');
});

router.post('/lpn', function(req, res, next) {
  console.log("inside search api")
  let sqlQuery = `select ilpn, ilpn_status, qty, Current_location, SKU from project1`
  if (req.body.lpnStatus || req.body.asn || req.body.lpn){
  sqlQuery = sqlQuery + " where"
    if (req.body.lpnStatus && req.body.asn && req.body.lpn){
      sqlQuery = sqlQuery + ` ilpn= ${req.body.lpn} or ASN = ${req.body.asn} or ilpn_status = '${req.body.lpnStatus}'`
    }
    else if (req.body.lpnStatus && req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn} or ilpn_status = '${req.body.lpnStatus}'`
    }

    else if (req.body.lpn && req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn} or ilpn= ${req.body.lpn}`
    }

    else if (req.body.lpn && req.body.lpnStatus){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn} or ilpn= ${req.body.lpnStatus}`
    }

    else if (req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn}`
    }

    else if (req.body.lpn){
      sqlQuery = sqlQuery + ` ilpn= ${req.body.lpn}`
    }

    else if (req.body.lpnStatus){
      sqlQuery = sqlQuery + ` ilpn_status = '${req.body.lpnStatus}'`
    }

  }
  // console.log(sqlQuery)
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      // console.log(result)
      res.json(result);
    }
  })
  // res.send('respond with a resource');
});

router.post('/asn', function(req, res, next) {
  console.log("inside search api asn")
  let sqlQuery = `select ASN, count(distinct PO) as no_po, count(ilpn) as no_ilpn, ASN_Status from project1`
  if (req.body.asnStatus || req.body.asn || req.body.po){
  sqlQuery = sqlQuery + " where"
    if (req.body.asnStatus && req.body.asn && req.body.po){
      sqlQuery = sqlQuery + ` PO= ${req.body.po} or ASN = ${req.body.asn} or ASN_Status = '${req.body.asnStatus}'`
    }
    else if (req.body.asnStatus && req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn} or ASN_Status = '${req.body.asnStatus}'`
    }

    else if (req.body.po && req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn} or PO= ${req.body.po}`
    }

    else if (req.body.po && req.body.asnStatus){
      sqlQuery = sqlQuery + ` ASN_Status = '${req.body.asnStatus}' or PO= ${req.body.po}`
    }

    else if (req.body.asn){
      sqlQuery = sqlQuery + ` ASN = ${req.body.asn}`
    }

    else if (req.body.po){
      sqlQuery = sqlQuery + ` PO= ${req.body.po}`
    }

    else if (req.body.asnStatus){
      sqlQuery = sqlQuery + ` ASN_Status = '${req.body.asnStatus}'`
    }

  }
  sqlQuery = sqlQuery + ` group by ASN`
  console.log(sqlQuery)
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      // console.log(result)
      res.json(result);
    }
  })
});

router.post('/findbox', function(req, res, next) {
  console.log("inside search api asn")
  let sqlQuery = `select ilpn, ilpn_status from project1 where 
(ASN_status = "Receiving Started" and ilpn_status = "In transit")
or (ASN_status = "Receiving verified" and ilpn_status = "Not received but shipment verified")`
  console.log(sqlQuery)
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      // console.log(result)
      res.json(result);
    }
  })
});

router.post('/lpndetails', function(req, res, next) {
  let sqlQuery = `select * from project1 where ilpn = ${req.body.lpnNo}`
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      var resultObj = result[0];
      console.log(resultObj)
      res.json(resultObj);
    }
  })
});

router.post('/findparticularcontainer', function(req, res, next) {
  let sqlQuery = `SELECT * FROM asn.locations where ilpn = ${req.body.ilpn}`
  let query = sqlConnectionObject.query(sqlQuery,(err, result)=>{
    if (err) {console.log(err)}
    else{
      var resultObj = result[0];
      console.log(resultObj)
      res.json(resultObj);
    }
  })
});

router.get('/pythonhello', function(req, res, next) {
  console.log("inside api")
  const python = spawn('python', ['findbox.py']);

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...'+data);
    var dataToSend = data.toString();
    // res.send(dataToSend)
  });
  python.stdout.flush()
});


module.exports = router;

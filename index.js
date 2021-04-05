const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;
app.use(express.urlencoded({extends:false}));


const conn = mysql.createConnection({
    host        : "localhost",
    user        : "root",
    password    : "",
    database    : "week1"

});


conn.connect((err)=>{
    if (err) {
        console.log("error");
    }else{
        console.log("succses");
    }
});


app.get("/api/food", (req, res)=>{
    let sql =  "SELECT * FROM foods";
    conn.query(sql, (err, result)=>{
        if (err) {
            res.send({
                msg : "gate failed",
                status : 500,
                err,
            });
            
        }else{
            res.send({
                msg : "succes",
                status : 200,
                data : result,
            });
        }
    });
});


app.post("/api/food", (req,res)=>{
    let {body} = req;
    let sql = "INSERT INTO foods SET ?";
    conn.query(sql,body,(err,result)=>{
        if (err) {
            res.send({
                msg : "add error",
                status : 500,
                err, 
            })
            
        }else{
            let newbody ={
                id : result.insertid,
                ...body,
            };
            res.send({
                msg:"Success Add data",
                status:200,
                data: newbody
            })
        }
    })
})


app.get("/api/food/:id", (req,res)=>{
    let {id} = req.params;
    let sql = `SELECT * FROM foods WHERE id=${id}`;
    conn.query(sql,(err, result)=>{
        if (err) {
            res.send({
                msg : "get error",
                status :   500,
                err,
            })
       
            
        }else{
            res.send({
                msg : "get data succes",
                status : 200,
                data : result,
            })
        }
    })
})


app.delete("/api/food/:id", (req, res) => {
    let {id} =req.params;
    let sql = `DELETE FROM foods WHERE id=${id}`;
    conn.query(sql,(err, result)=>{
        if (err) {
            res.send({
                msg : "delete error",
                status : 500,
                err,
            })
        }else{
            res.send({
                msg : "delete data succes",
                status : 200,
                data : result,
            })
        }
    })
});


// app.post('/api/food/edit/:id',(req, res)=>{
//     let {body} = req.params;
//     let sql = `UPDATE foods SET nama_food=?, harga=? where id=?`;
//     conn.query(sql,(err,result)=>{
//         if (err) {
//             res.send({
//                 msg : "update error",
//                 status : 500,
//                 err,
//             })
//         }
//     })

// });

app.put("/api/food/:id", (req,res)=>{
    let {body} = req;
    let {id} =req.params;
    // let sql = `UPDATE foods SET nama_food = ?, harga = ? WHERE id=${id}`;
    let sql = `UPDATE foods SET ? WHERE id=${id}`;
    // let sql = "UPDATE foods SET nama_food = 'soto', harga = '700'  WHERE id='7'";
    conn.query(sql,body,(err,result)=>{
        if (err) {
            res.send({
                msg : "add error",
                status : 500,
                err, 
            })
            
        }else{
            let newbody ={
                id : result.insertid,
                ...body,
            };
            res.send({
                msg:"Success Add data",
                status:200,
                data: newbody
            })
        }
    })
})

// app.put("/api/food/edit/:id", (req, res) => {
//     let { id } = req;
//     let { body } = req.params;
//     // let sql = "UPDATE foods SET nama_food = 'soto', harga = '700'  WHERE id='9'";
//     var sql = `UPDATE foods SET ? WHERE id=${id}`;
//     conn.query(sql, body, (err, results) => {
//         if (err) {
//             res.send({
//                 msg: "Update data failed",
//                 status: 500,
//                 err,
//             })
//         } else {
//             let newBody = {
//                 id : result.insertid,
//                 ...body,
//             }
//             res.send({
//                 msg: "Success update data",
//                 status: 200,
//                 data: newBody,
//             })
//         }
//     })
// })


app.listen(port ,()=>{
    console.log("server conncect"+ port);
});
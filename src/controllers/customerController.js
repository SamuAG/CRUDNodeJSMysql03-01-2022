const controller = {};

controller.list = function (req, res) {
    req.getConnection(function (err, conn) {
        conn.query("SELECT * FROM customer", function (err, customers) {
            if (err) {
                res.json(err);
            }
            console.log(customers);
            res.render("customers", {
                data: customers
            });
        })
    });
};

controller.save = function (req, res) {
    const data = req.body;
    req.getConnection(function (err, conn) {
        if (err) {
            res.json(err);
        }
        conn.query("INSERT INTO customer set ?", [data], function (err, row) {
            res.redirect("/");
        });
    })
}

controller.delete = function (req, res) {
    const id = req.params.id;
    req.getConnection(function (err, conn) {
        if (err) {
            res.json(err);
        }
        conn.query("DELETE FROM customer WHERE id = ?", [id], function (err, row) {
            res.redirect("/");
        });
    })
}

controller.edit = function (req, res) {
    const id = req.params.id;
    req.getConnection(function (err, conn) {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], function(err, customer){
            res.render("customer_edit", {
                data: customer[0]
            });
        });
    });
}

controller.update = function(req, res){
    const id = req.params.id;
    const newCustomer = req.body;
    req.getConnection(function (err, conn) {
        conn.query("UPDATE customer set ? WHERE id = ?", [ newCustomer,id], function(err, rows){
            res.redirect("/");
        });
    });
}

module.exports = controller;
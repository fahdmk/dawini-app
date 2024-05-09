import express from "express";
import mysql from "mysql2/promise";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3002;


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
// Configure MySQL connection directly
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fahd",
  database: "dawini4",
});

// Handle database connection errors
try {
  console.log('Connected to MySQL');

  //Define root route
  app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
  });

  // Define appointments route
  app.get("/appointments", async (req, res) => {
    const q = "SELECT * FROM appointment";

    try {
      const [data] = await db.execute(q);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Define API route
  app.get("/api", async (req, res) => {
    const q1 = "SELECT ct.`idCaretaker`, ct.`full name` AS CareTakerName, COUNT(a.`idAppointment`) AS NumberOfAppointments FROM `DAWINI4`.`Caretaker` ct LEFT JOIN `DAWINI4`.`Appointment` a ON ct.`idCaretaker` = a.`Caretaker_idCaretaker` WHERE a.`accepted/declined` = 'Accepted' GROUP BY ct.`idCaretaker`, CareTakerName ORDER BY NumberOfAppointments DESC;";

    try {
      const [data] = await db.execute(q1);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Define user route
  app.get("/user", async (req, res) => {
    const q2 = "SELECT COUNT(*) AS NumberOfUsers FROM `DAWINI4`.`User`;";
  
    try {
      const [data] = await db.execute(q2);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/nbappointments", async (req, res) => {
    const q4 = "SELECT COUNT(*) AS NumberOfAcceptedAppointments FROM DAWINI4.Appointment WHERE `accepted/declined` = 'Accepted';";
  
    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/sales", async (req, res) => {
    const q5 = "SELECT SUM(Price) AS TotalSumOfPrices FROM DAWINI4.receipt;";
  
    try {
      const [data] = await db.execute(q5);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/caretakers", async (req, res) => {
    const q3 = "SELECT COUNT(*) AS NumberOfCaretakers FROM `DAWINI4`.`Caretaker`;";
  
    try {
      const [data] = await db.execute(q3);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 
  app.post("/createProduct", async (req, res) => {
    try {
      console.log(req.body);
      const {
        productname,
        description,
        price,
        company,
        producer,
        stock,
        discounts,
      } = req.body;

      // Assuming your 'product' table has these columns, modify accordingly
      const [rows] = await db.execute(
        "INSERT INTO product (productName, description, Price, Deliverycompany, Producer, Stock, discounts) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [productname, description, price, company, producer, stock, discounts]
      );

      res.json({ success: true, message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'aaaaInternal Server Error' });
    }
  });
  app.delete("/product/:id", async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Assuming your 'product' table has the column 'idproducts'
      const [result] = await db.execute(
        "DELETE FROM product WHERE idproducts = ?",
        [productId]
      );
  
      if (result.affectedRows > 0) {
        res.json({ success: true, message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

} catch (err) {
  console.error('Error connecting to MySQL:', err);
  process.exit(1); // Exit the process if unable to connect
}
app.get("/caretaker", async (req, res) => {
  const q6= "SELECT c.`idCare taker`, c.`full name` AS CaretakerName, c.`Role` AS Role, c.`Working area` AS WorkingArea, COUNT(a.`idAppointment`) AS NumberOfAppointments FROM `DAWINI4`.`Caretaker` c LEFT JOIN `DAWINI4`.`Appointment` a ON c.`idCare taker` = a.`Care taker_idCare taker` GROUP BY c.`idCare taker`, c.`full name`, c.`Role`, c.`Working area` ORDER BY NumberOfAppointments DESC;";
  try {
    const [data] = await db.execute(q6);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/orders", async (req, res) => {
 const q7= "SELECT r.`idreceipt` AS ReceiptID, u.`fullname` AS Customer, r.`time` AS Time, r.`Price` AS Price FROM `DAWINI4`.`receipt` r JOIN  `DAWINI4`.`User` u ON r.`User_idUser` = u.`idUser`;" ;
  try {
    const [data] = await db.execute(q7);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/thisyear", async (req, res) => {
  const q8= "SELECT MONTH(time) AS month, YEAR(time) AS year, SUM(price) AS totalSales FROM dawini4.receipt WHERE YEAR(time) = 2024 GROUP BY YEAR(time), MONTH(time) ORDER BY YEAR(time), MONTH(time);" ;
   try {
     const [data] = await db.execute(q8);
     res.json(data);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
 app.get("/lastyear", async (req, res) => {
  const q9= "SELECT MONTH(time) AS month, YEAR(time) AS year, SUM(price) AS totalSales FROM dawini4.receipt WHERE YEAR(time) = 2023 GROUP BY YEAR(time), MONTH(time) ORDER BY YEAR(time), MONTH(time);" ;
   try {
     const [data] = await db.execute(q9);
     res.json(data);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
 app.get("/product", async (req, res) => {
  const q10= "SELECT * from dawini4.product" ;
   try {
     const [data] = await db.execute(q10);
     res.json(data);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
 app.get("/users", async (req, res) => {
  const q11= "SELECT * from dawini4.user" ;
   try {
     const [data] = await db.execute(q11);
     res.json(data);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });
const express = require("express");

const projectRoutes = require("./routes/project.routes");

const app = express();
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.listen(process.env.PORT, () =>
   console.log(`Server running on port ${process.env.PORT}`))

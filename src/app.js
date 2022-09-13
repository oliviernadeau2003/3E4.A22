import dayjs from "dayjs";
import express from "express";
import router from "./routes/planets-routes.js";

import database from "./libs/database.js";

import httpError from "http-error"

import planetsRoutes from "./routes/planets-routes.js";

database();
const app = express();
app.use(express.json());    // *** Permet à notre serveur de comprendre le json reçu ***

//TODO: Ajouter du code ici
app.get("/premiere", (req, res) => {
    res.status(200);
    res.set("Content-Type", "text/plain");
    res.send("Première route avec express");
});

app.get("/date", (req, res) => {
    res.status(200);
    res.set("Content-Type", "text/plain");
    const today = dayjs();
    res.send(today.format("YYYY-MM-DD"));
});

app.get("/maths/:operation", (req, res) => {
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    let anwser = 0;

    const operation = req.params.operation;

    switch (operation) {
        case "somme":
            anwser = a + b;
            break;

        case "difference":
            anwser = a - b;
            break;

        case "produit":
            anwser = a * b;
            break;

        case "quotient":
            anwser = a / b;
            break;

        case "reste":
            anwser = b % a;
            break;

        default:
            anwser = "Opération non définie"
            break;
    }

    res.status(200);
    res.set("Content-Type", "text/plain");
    res.send(anwser.toString());

});

app.use("/planets", planetsRoutes);

app.use(Error)



export default app;
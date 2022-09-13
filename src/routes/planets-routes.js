import express from 'express';
import { HttpError } from 'http-error';
import PLANETS from "../data/planets.js";

const router = express.Router();

class PlanetsRoutes {
    // Nous somme déja sous le path /planets
    constructor() {
        router.get("/", this.getAll); // /planets
        router.get("/:idPlanet", this.getOne);  // /planets/:idPlanet
        router.post("/", this.post); // /planets
        router.delete("/:idPlanet", this.delete);
    }

    delete(req, res, next) {
        const idPlanet = parsInt(req.params.idPlanet, 10);

        const index = PLANETS.findIndex(p => p.id === idPlanet);
        if (index === -1) {
            return next(HttpError.NotFound(`La planete avec l'identifiant ${idPlanet} n'existe pas`));
        }
        PLANETS.splice(index, 1);
        res.status(204).end();

    }

    getAll(req, res, next) {
        res.status(200);
        res.json(PLANETS);
    }

    // /planets/400
    getOne(req, res, next) {

        // for(let planet of PLANETS){
        //     if (planet.id === idPlanet) {
        //         // Trouver la planete recherchée    
        //         res.status(200);
        //         res.json(planet);
        //         break;
        //     }
        // }
        // res.status(404);
        // res.end();
        const idPlanet = parseInt(req.params.idPlanet, 10);
        const planet = PLANETS.filter(p => p.id === idPlanet);
        if (planet.length > 0) {
            res.status(200);
            res.json(planet[0]);
        } else {
            return next(HttpError.NotFound(`La planete avec l'identifiant ${idPlanet} n'existe pas`));

        }

    }

    post(req, res, next) {
        const newPlanet = req.body;

        if (newPlanet) {
            const index = PLANETS.findIndex(p => p.id === req.body.id);
            if (index === -1) {
                PLANETS.push(newPlanet);
                res.status(201).json(newPlanet);
                res.end();
            } else {
                return next(HttpError.Conflict(`Une planète avec l'identifiant ${req.body.id}`));
            }
        } else {
            return next(HttpError.BadRequest("Aucune information transmise"));
        }
    }
}

new PlanetsRoutes();
export default router;
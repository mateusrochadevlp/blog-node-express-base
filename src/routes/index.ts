import { Router} from "express";
import {SectionControler} from "../controller/SectionController"

const sectionControler =  new SectionControler()

const routes = Router()

routes.post("/sign-in", sectionControler.signIn)
routes.post("/sign-up", sectionControler.signUp)

export {routes}
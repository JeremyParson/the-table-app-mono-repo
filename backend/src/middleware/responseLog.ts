import {Request, Response} from "express"

// Log the route being visited
export default function routeLog (req: Request, res: Response, next: Function) {
    next()
}

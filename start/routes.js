'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");
Route.get("/index", "AuthController.index");

Route.get("/app", "AppController.index").middleware(["auth"]);

Route.group(()=>{
  Route.resource("institution", "InstitutionController").apiOnly();
  Route.resource("court", "CourtController").apiOnly();
  Route.resource("reserv", "CourtReservationController").apiOnly();
}).middleware('auth');
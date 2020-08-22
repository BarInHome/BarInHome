import express from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportCustom from 'passport-custom';
import { Strategy as LocalStrategy } from 'passport-local';


export class Strategy extends passportCustom.Strategy{
    constructor(verify: passportCustom.VerifyCallback){
        super(verify);
    }
}
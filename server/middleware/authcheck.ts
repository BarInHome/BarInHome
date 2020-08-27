import * as jwt from 'jsonwebtoken';
// import jwtObj from '../config/jwt';
import { Request, Response, NextFunction } from 'express';
const process_env = require('../secret');
import express from 'express';
import passport from './passport/passport';
import JwtToken from  './jwt/JwtToken';


// 사용할 때 

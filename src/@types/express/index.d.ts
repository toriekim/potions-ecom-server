/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
declare global {
  namespace Express {
    export interface Request {
      user?: any
    }
  }
}

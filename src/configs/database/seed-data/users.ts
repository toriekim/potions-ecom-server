import { User } from '../../../types'

export const users: User[] = [
  {
    firstName: 'Grace',
    lastName: 'Chopper',
    username: 'GraceChopper',
    password: 'chopchop',
    email: 'grace@example.com',
    isAdmin: true
  },
  {
    firstName: 'Gordon',
    lastName: 'Ramsay',
    username: 'GordonRamsay',
    password: 'itsraw',
    email: 'gordon@chopper.com',
    isAdmin: false
  },
  {
    firstName: 'Guy',
    lastName: 'Fieri',
    username: 'GuyFieri',
    password: 'flavortown',
    email: 'guy@chopper.com',
    isAdmin: false
  },
  {
    firstName: 'Rachel',
    lastName: 'Ray',
    username: 'RachelRay',
    password: 'evoo',
    email: 'rachel@chopper.com',
    isAdmin: false
  }
]

import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { config } from "~/config"
import { UserDB } from "~/type"

/**
 * usersDatabase
 */
const usersDatabase: readonly UserDB[] = [
  {
    id: uuid(),
    username: "Snoopy",
    email: "snoopy@101.lu",
    password: bcrypt.hashSync("SnoopyPassword", config.appKey),
  },
  {
    id: uuid(),
    username: "Pepper",
    email: "pepper@101.lu",
    password: bcrypt.hashSync("PepperPassword", config.appKey),
  },
  {
    id: uuid(),
    username: "Whisky",
    email: "whisky@101.lu",
    password: bcrypt.hashSync("WhiskyPassword", config.appKey),
  },
  {
    id: uuid(),
    username: "Tiplouf",
    email: "tiplouf@101.lu",
    password: bcrypt.hashSync("TiploufPassword", config.appKey),
  },
]
export default usersDatabase

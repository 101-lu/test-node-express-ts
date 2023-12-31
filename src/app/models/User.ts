import { A, D, G } from "@mobily/ts-belt"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { InternalServerException } from "../exceptions/InternalServerException"
import { config } from "~/config"
import usersDatabase from "../database/users"
import { UserDB } from "~/type"

/**
 * User model
 */
export default class User {
  protected static database = usersDatabase
  public _id: string
  public username: string
  public email: string
  public password: string

  constructor({ id, username, email, password }: UserDB) {
    this._id = id
    this.username = username
    this.email = email
    this.password = password
  }

  /**
   * findAll
   */
  public static async findAll() {
    return A.map(this.database, (user) => new User(user))
  }

  /**
   * findOne
   */
  public static async findOne(id: string) {
    return User.findBy("id", id)
  }

  /**
   * findBy
   */
  public static async findBy<T extends keyof UserDB>(field: T, value: UserDB[T]) {
    const user = A.find(User.database, (user) => user[field] === value)
    if (G.isNullable(user)) return undefined
    return new User(user)
  }

  /**
   * create
   */
  public static async create(user: Omit<UserDB, "id">) {
    const newUser = { ...user, id: uuid() }
    User.database = A.append(User.database, newUser)
    return new User(newUser)
  }

  /**
   * id getter
   */
  public get id() {
    return this._id
  }

  /**
   * json
   */
  public json() {
    return { id: this.id, ...D.selectKeys(this, ["username", "email"]) }
  }

  /**
   * save
   */
  public async save() {
    const index = A.getIndexBy(User.database, (user) => user.id === this.id)
    if (G.isNullable(index)) throw new InternalServerException("try to update a non existant user")
    const user = {
      ...this.json(),
      password:
        User.database[index].password === this.password ? this.password : bcrypt.hashSync(this.password, config.appKey),
    }
    User.database = A.replaceAt(User.database, index, user)
  }

  /**
   * delete
   */
  public async delete() {
    const index = A.getIndexBy(User.database, (user) => user.id === this.id)
    if (G.isNullable(index)) throw new InternalServerException("try to delete a non existant user")
    User.database = A.removeAt(User.database, index)
  }

  /**
   * merge
   */
  public async merge(user: Partial<UserDB>) {
    D.keys(user).forEach((key) => {
      if (key !== "id") {
        this[key] = user[key] as string
      }
    })
    return this
  }

  /**
   * comparePassword
   */
  public async comparePassword(password: string) {
    return bcrypt.hashSync(password, config.appKey) === this.password
  }
}

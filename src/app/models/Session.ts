import { A, D, G } from "@mobily/ts-belt"
import { v4 as uuid } from "uuid"
import { InternalServerException } from "../exceptions/InternalServerException"
import JWTtoken from "~/helpers/JWTtoken"
import sessionDatabase from "../database/session"
import { SessionDB } from "~/type"

/**
 * Session model
 */
export default class Session {
  protected static database = sessionDatabase
  public _id: string
  public userId: string
  public token: string

  constructor({ id, userId, token }: SessionDB) {
    this._id = id
    this.userId = userId
    this.token = token
  }

  /**
   * findAll
   */
  public static async findAll() {
    return A.map(this.database, (session) => new Session(session))
  }

  /**
   * findOne
   */
  public static async findOne(id: string) {
    const session = A.find(Session.database, (session) => session.id === id)
    if (G.isNullable(session)) return undefined
    return new Session(session)
  }

  /**
   * create
   */
  public static async create(session: Omit<SessionDB, "id" | "token">) {
    const id = uuid()
    const token = JWTtoken.generate({ user: session.userId, session: id })
    const newSession = { ...session, id, token }
    Session.database = A.append(Session.database, newSession)
    return new Session(newSession)
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
    return { id: this.id, ...D.selectKeys(this, ["userId", "token"]) }
  }

  /**
   * save
   */
  public async save() {
    const index = A.getIndexBy(Session.database, (session) => session.id === this.id)
    if (G.isNullable(index)) throw new InternalServerException("try to update a non existant session")
    Session.database = A.replaceAt(Session.database, index, this.json())
  }

  /**
   * delete
   */
  public async delete() {
    const index = A.getIndexBy(Session.database, (session) => session.id === this.id)
    if (G.isNullable(index)) throw new InternalServerException("try to delete a non existant session")
    Session.database = A.removeAt(Session.database, index)
  }

  /**
   * merge
   */
  public async merge(session: Partial<SessionDB>) {
    D.keys(session).forEach((key) => {
      if (key !== "id") {
        this[key] = session[key] as string
      }
    })
  }
}

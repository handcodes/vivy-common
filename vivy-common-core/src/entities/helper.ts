// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MappedEntity = <T>(t: T): T => {
  return class Empty {} as T
}

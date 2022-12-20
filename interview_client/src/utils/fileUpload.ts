export const handelFileChange = (e: string) => {
  const splitString = `C:\\fakepath\\`
  const fileName = e.split(splitString)
  return fileName[1]
}
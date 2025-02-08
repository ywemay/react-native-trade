export interface APIEvents {
  onSuccess?: (d:any) => void,
  onError?: (e:any) => void,
  onSettled?: (d:any, e:any) => void,
}
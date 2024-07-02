declare module 'validatorhw-alp' {
  export function isValidEmailFormat(email: string): boolean; //paket içindeki fonksiyonların parametre ve döndürdükleri değer türlerinin tanımlanması..
  export function isEmailTaken(email: string): Promise<boolean>;
}

export interface UserDto {
  uid: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  imageProfile: string;
  birthdate: Date | null;
  deviceId: string | null;
}

export interface AdminProfile {
  id: number;
  firstName: string;
  lastName: string;
  firstNameInArabic: string | null;
  lastNameInArabic: string | null;
  email: string;
  address: string | null;
  isdeleted: boolean | null;
  createdAt: string | null;
  lastLogin: string | null;
  gender: string | null;
  nationality: string | null;
  birthDate: string | null;
  religion: string | null;
  nationalNumber: number | null;
  roleId: number | null;
  roleName: string | null;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  firstNameInArabic: string;
  lastNameInArabic: string;
  email: string;
  address: string;
  gender: string;
  nationality: string;
  birthDate: string;
  religion: string;
  nationalNumber: number | null;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

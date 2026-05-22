import api from "../Api/api";
import {
  type CreateUser,
  type CreateUserResponse,
  type UpdateStatusPayload,
  type UpdateStatusResponse,
  type UpdateUserPayload,
  type UpdateUserResponse,
  type Users,
} from "../types/user.types";
export const fetchUsers = async (): Promise<Users> => {
  const { data } = await api.get<Users>("/users");
  return data;
};

export const createUser = async (
  user: CreateUser,
): Promise<CreateUserResponse> => {
  const { data } = await api.post<CreateUserResponse>("/users", user);
  return data;
};

export const updateUser = async ({
  id,
  ...payload
}: UpdateUserPayload): Promise<UpdateUserResponse> => {
  const { data } = await api.patch<UpdateUserResponse>(`/users/${id}`, payload);
  return data;
};

export const updateStatus = async ({
  id,
  status,
}: UpdateStatusPayload): Promise<UpdateStatusResponse> => {
  const { data } = await api.patch<UpdateStatusResponse>(
    `/users/${id}/status`,
    { status },
  );
  return data;
};

export const fetchActiveUsers = async (): Promise<Users> => {
  const { data } = await api.get<Users>("/users?status=true");
  return data;
};

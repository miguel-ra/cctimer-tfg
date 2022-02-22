export interface AuthRepository {
  signup(email: string, password: string): Promise<void>;
}

import { AuthInfo } from "./Auth";

export interface AuthRepository {
  login(email: string, password: string): Promise<void>;
  signup(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  subscribe(notify: (authInfo: AuthInfo) => void): () => void;
}

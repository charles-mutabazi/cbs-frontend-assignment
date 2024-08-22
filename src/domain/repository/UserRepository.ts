interface UserRepository {
  getAllUsers(): void

  createUserAccount(user: User): Promise<User | undefined>

  getUserById(id: string): Promise<User | undefined>

  loginUser(email: string, password: string)
}

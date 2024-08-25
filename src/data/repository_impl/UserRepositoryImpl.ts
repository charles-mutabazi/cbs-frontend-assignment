import { useAuthStore } from '@/data/stores/authStore'

class UserRepositoryImpl implements UserRepository {
  async loginUser(email: string, password: string) {
    const userStore = useAuthStore()

    userStore.$patch({
      isLoading: true,
      error: null
    })

    try {
      // make a post request to the server to log in the user
      const response = await fetch(BASE_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const token = await response.json()
        userStore.$patch({
          isLoading: false,
          error: null,
          jwt: token
        })
      } else {
        userStore.$patch({
          isLoading: false,
          error: 'Invalid email or password'
        })
      }
    } catch (e) {
      console.error('Error', e)
      userStore.$patch({
        isLoading: false,
        error: 'An error occurred trying to login'
      })
    }
  }

  async createUserAccount(user: User): Promise<User | undefined> {
    try {
      const userStore = useAuthStore()

      // Set the loading state to true
      userStore.$patch({
        isLoading: true
      })

      const response = await fetch(BASE_URL + '/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      userStore.$patch({
        isLoading: false
      })

      if (response.ok) {
        const createdUser: User = await response.json()
        // Set the loading state to false
        userStore.$patch({
          users: [...userStore.users, createdUser]
        })
        return createdUser
      } else {
        console.error('Error creating user account', response.statusText)
        return undefined
      }
    } catch (e) {
      console.error('Error', e)
      return undefined
    }
  }
}

const userRepository: UserRepository = new UserRepositoryImpl()
export default userRepository

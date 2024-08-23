import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = 'http://localhost:3000' // api base url

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    currentUser: useStorage('currentUser', {} as User) as User,
    jwt: useStorage('jwt', null) as string,
    isLoading: false,
    info_message: null,
    error: null
  }),
  actions: {
    logoutUser() {
      this.jwt = null
      this.currentUser = null
      // Explicitly remove from storage if necessary
      localStorage.removeItem('currentUser');
      localStorage.removeItem('jwt');
    },

    async loginUser(email: string, password: string, accountType: string): Promise<boolean> {
      this.isLoading = true
      this.error = null

      try {
        // make a post request to the server to log in the user
        const response = await fetch(API_BASE_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password, accountType }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          this.error = 'Invalid email, password or account type'
          return false
        }
        const data = await response.json()
        this.jwt = data.token
        const incomingUser = validateUser(jwtDecode(this.jwt))
        this.currentUser = { ...incomingUser, accountType }
        return true
      } catch (e) {
        console.error('Error', e)
        this.error = 'An error occurred trying to login'
      }

      this.isLoading = false
    },
    async createUserAccount(accountInfo: NewAccount, accountType): Promise<boolean> {
      try {
        const endpoint = accountType === 'driver' ? '/drivers' : '/users'
        // Set the loading state to true
        this.isLoading = true

        const response = await fetch(API_BASE_URL + `${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(accountInfo),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        this.isLoading = false
        if (!response.ok) {
          console.error('Error Code: ', response.statusText)
          this.error = 'An error occurred trying to create the account'
          return false
        }
        this.info_message = 'Account created successfully'
        return true
      } catch (e) {
        console.error('Error', e)
        this.error = 'An error occurred trying to create the account'
      }
    }
  }
})

function validateUser(data: any): User {
  // Define default values to ignore unknown fields
  const defaultUser: User = {
    id: 0,
    names: '',
    email: '',
    accountType: '',
    hierarchyLevel: -1
  }

  // Return only the properties that match the User interface
  return {
    id: typeof data.id === 'number' ? data.id : defaultUser.id,
    names: typeof data.names === 'string' ? data.names : defaultUser.names,
    email: typeof data.email === 'string' ? data.email : defaultUser.email,
    accountType: typeof data.accountType === 'string' ? data.accountType : defaultUser.accountType,
    hierarchyLevel:
      typeof data.hierarchyLevel === 'number' ? data.hierarchyLevel : defaultUser.hierarchy
  }
}
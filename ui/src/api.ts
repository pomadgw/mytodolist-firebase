import axios, { AxiosResponse } from 'axios'

const API_URL = import.meta.env.SNOWPACK_PUBLIC_TODOLIST_URL

const main = axios.create({
  baseURL: API_URL
})

export interface Todo {
  todo: string
  is_marked_done: boolean
}

export type Todolist = Todo[]

export default {
  getTodos(): Promise<AxiosResponse<Todolist>> {
    return main.get('/api/todos');
  }
}

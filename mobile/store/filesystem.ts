import { create } from "zustand"


type File = {
  name: string
  type: "folder" | "file"
  path: string
}


type State = {
  fileslist: File[]
  path: string
  setFileslist: (fileslist: File[]) => void
  setPath: (path: string) => void
}

export const useFilesystem = create<State>((set) => ({
  fileslist: [],
  path: "/home",
  setFileslist: (fileslist) => set({fileslist}),
  setPath: (path) => set({path})
}))


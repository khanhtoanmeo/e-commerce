import { create } from "zustand";

const useMyPostsStore = create((set) => {
  return {
    posts: [],
    setPosts: (posts) => set(() => ({ posts })),
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  };
});

export default useMyPostsStore;

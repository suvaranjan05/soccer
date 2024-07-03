// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    myEmail: null,
    setMyEmail: (email) => set({ myEmail: email }),
    myRole: null,
    setMyRole: (role) => set({ myRole: role }),
    myPassword: null,
    setMyPassword: (pass) => set({ myPassword: pass }),
    myUserName: null,
    setMyUserName: (name) => set({ myUserName: name }),
    headerData: null,
    setHeaderData: (data) => set({ headerData: data }),
    profileData: null,
    setProfileData: (data) => set({ profileData: data }),
    notificationCount: 0,
    setNotificationCount: (num) => set({ notificationCount: num }),
    decrementNotificationCount: () => set((state) => ({ notificationCount: state.notificationCount - 1 })),
}));

export default useStore;
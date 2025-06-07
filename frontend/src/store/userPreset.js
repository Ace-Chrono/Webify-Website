import { create } from "zustand";

export const useUserPresetStore = create((set) => ({
    userPresets: [],
    setUserPresets: (userPresets) => set({ userPresets }), 
    createUserPreset: async (newUserPreset, token) => {
        if(!newUserPreset.name || !newUserPreset.settings || !newUserPreset.image || newUserPreset.isPublished === undefined) {
            return {success: false, message: "Please fill in all fields."};
        }

        const formData = new FormData();
        formData.append("name", newUserPreset.name);
        formData.append("settings", newUserPreset.settings);
        formData.append("image", newUserPreset.image);
        formData.append("isPublished", newUserPreset.isPublished);

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File -> name: ${value.name}, type: ${value.type}, size: ${value.size}`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        console.log(token);

        try {
            const res = await fetch("/api/userpresets", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Upload failed");

            set((state) => ({ userPresets: [...state.userPresets, data.data] }));
            return { success: true, message: "User preset created successfully" };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.message };
        }
    },
    fetchUserPresets: async () => {
        const res = await fetch("/api/userpresets");
        const data = await res.json();
        set({ userPresets: data.data});
    },
}));
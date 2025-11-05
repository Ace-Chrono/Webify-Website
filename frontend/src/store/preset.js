import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const usePresetStore = create((set) => ({
    presets: [],
    setPresets: (presets) => set({ presets }), 
    createPreset: async (newPreset) => {
        if(!newPreset.name || !newPreset.settings || !newPreset.image) {
            return {success: false, message: "Please fill in all fields."};
        }

        const formData = new FormData();
        formData.append("name", newPreset.name);
        formData.append("settings", newPreset.settings);
        formData.append("image", newPreset.image);

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File -> name: ${value.name}, type: ${value.type}, size: ${value.size}`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/presets`, {
            method: "POST",
            body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Upload failed");

            set((state) => ({ presets: [...state.presets, data.data] }));
            return { success: true, message: "Preset created successfully", data: data.data };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.message };
        }
    },
    fetchPresets: async () => {
        const res = await fetch(`${API_BASE_URL}/api/presets`);
        const data = await res.json();
        set({ presets: data.data});
    },
    fetchPreset: async (pid) => {
        const res = await fetch(`${API_BASE_URL}/api/presets/${pid}`);
        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message };
        }
        return { success: true, message: data.message, data: data.data };
    },
    deletePreset: async (pid) => {
        const res = await fetch(`${API_BASE_URL}/api/presets/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message };
        }
        set(state => ({ presets: state.presets.filter(preset => preset._id !== pid) }));
        return { success: true, message: data.message };
    }
}));


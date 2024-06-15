import { create } from "zustand";
import { Weather } from "@/lib/weather";

export type ModalType = "contact" | "menu";

interface ModalData {
    temperature?: Weather["temperature"];
    weatherCode?: Weather["weatherCode"];
    weatherLabel?: Weather["weatherLabel"];
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
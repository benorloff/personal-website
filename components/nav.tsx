"use client"

import { Briefcase, Home, MessageCircleMore, User } from "lucide-react";

export const Nav = () => {
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-6">
            <div><Home size={16} className="text-accent"/></div>
            <div><User size={16} /></div>
            <div><Briefcase size={16} /></div>
            <div><MessageCircleMore size={16} /></div>
        </div>
    )
}
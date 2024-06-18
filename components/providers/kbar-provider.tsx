"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
    ActionId,
    ActionImpl,
} from "kbar";
import { 
    ClipboardPlus, 
    CodeSquare, 
    Home, 
    MailIcon, 
    Mailbox, 
    Moon, 
    Newspaper, 
    PencilLine, 
    Sun, 
    UserCircle 
} from "lucide-react";
import { 
    Post, 
    allPosts, 
} from "@/.contentlayer/generated";
import { cn } from "@/lib/utils";
import { useTheme } from 'next-themes'

type Action = {
    id: ActionId;
    name: string;
    shortcut?: string[];
    keywords?: string;
    section?: string;
    icon?: string | React.ReactElement | React.ReactNode;
    subtitle?: string;
    perform?: (currentActionImpl: ActionImpl) => any;
    parent?: ActionId;
};

const posts: Post[] = allPosts.sort();

function RenderResults() {
    const { results } = useMatches();

    const ResultItem = ({ item, active }: {
        item: ActionImpl;
        active: boolean;
    }) => {
        return (
            <div 
                className={cn(
                    "flex justify-between cursor-pointer text-ellipsis border-l-2 px-4 py-3",
                    active ? "border-accent bg-muted" : "border-transparent",
                )}    
            >
                <div className="flex flex-1 max-w-full gap-2 items-center">
                    <div className="flex items-center justify-center">
                        {item.icon}
                    </div>
                    <div className="truncate">{item.name}</div>
                </div>
                {item.shortcut?.length ? (
                    <div className="flex flex-1 justify-end">
                        {item.shortcut.map((shortcut) => (
                            <div className="flex w-6 h-6 justify-center items-center aspect-square border custom-border-color rounded-sm bg-muted uppercase text-sm">{shortcut}</div>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }
        
    return (
        <div className="bg-background rounded-b-sm border-x border-b border-border">
            <KBarResults
                items={results}
                onRender={({ item, active }) =>
                    typeof item === "string" ? (
                        <div 
                            className="text-xs text-muted-foreground uppercase p-4"
                        >
                            {item}
                        </div>
                    ) : (
                        <ResultItem item={item} active={active} />
                    )
                }
            />
        </div>
    );
}

export const KbarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const router = useRouter();

    const { theme, setTheme } = useTheme();

    let mode: string = theme?.split("-")[0] || '';
    let color: string = theme?.split("-")[1] || '';

    useEffect(() => {
        if (theme) {
            mode = theme.split("-")[0];
            color = theme.split("-")[1];
        }
    }, [theme])

    const actions: Action[] = [
        {
            id: "send-message",
            name: "Send me a message",
            section: "Quick Actions",
            shortcut: ["m"],
            keywords: "email message touch",
            icon: <MailIcon className="h-4 w-4"/>,
            perform: () => router.push('/contact'),
        },
        {
            id: "copy-link",
            name: "Copy link",
            section: "Quick Actions",
            shortcut: ["l"],
            keywords: "copy link",
            icon: <ClipboardPlus className="h-4 w-4"/>,
            perform: () => navigator.clipboard.writeText(window.location.href),
        },
        {
            id: "theme",
            name: "Change theme",
            section: "Quick Actions",
            shortcut: ["t"],
            keywords: "theme dark light",
            icon: <Sun className="h-4 w-4"/>,
        },
        {
            id: "blog",
            name: "Search blog posts...",
            section: "Blog",
            shortcut: ["s"],
            keywords: "writing articles posts blog guides tutorials",
            icon: <PencilLine className="h-4 w-4"/>,
        },
        {
            id: "theme-mode-dark",
            name: "Dark",
            section: "Theme > Mode",
            parent: "theme",
            shortcut: ["d"],
            keywords: "theme mode dark",
            icon: <Moon className="h-4 w-4"/>,
            perform: () => setTheme(`dark-${color}`),
        },
        {
            id: "theme-mode-light",
            name: "Light",
            section: "Theme > Mode",
            parent: "theme",
            shortcut: ["l"],
            keywords: "theme mode light",
            icon: <Sun className="h-4 w-4"/>,
            perform: () => setTheme(`light-${color}`),
        },
        {
            id: "theme-color-red",
            name: "Red",
            section: "Theme > Color",
            parent: "theme",
            shortcut: ["r"],
            keywords: "theme color red",
            icon: <div className="w-4 h-4 bg-red-500 rounded-full"/>,
            perform: () => setTheme(`${mode}-red`),
        },
        {
            id: "theme-color-green",
            name: "Green",
            section: "Theme > Color",
            parent: "theme",
            shortcut: ["g"],
            keywords: "theme color green",
            icon: <div className="w-4 h-4 bg-green-500 rounded-full"/>,
            perform: () => setTheme(`${mode}-green`),
        },
        {
            id: "theme-color-blue",
            name: "Blue",
            section: "Theme > Color",
            parent: "theme",
            shortcut: ["b"],
            keywords: "theme color blue",
            icon: <div className="w-4 h-4 bg-blue-500 rounded-full"/>,
            perform: () => setTheme(`${mode}-blue`),
        },
        {
            id: "home",
            name: "Home",
            section: "Go To",
            shortcut: ["h"],
            keywords: "go back home",
            icon: <Home className="h-4 w-4"/>,
            perform: () => router.push('/'),
        },
        {
            id: "about",
            name: "About",
            section: "Go To",
            shortcut: ["a"],
            keywords: "about",
            icon: <UserCircle className="h-4 w-4"/>,
            perform: () => router.push('/about'),
        },
        {
            id: "work",
            name: "Work",
            section: "Go To",
            shortcut: ["w"],
            keywords: "case studies work portfolio projects",
            icon: <CodeSquare className="h-4 w-4"/>,
            perform: () => router.push('/work'),
        },
        {
            id: "contact",
            name: "Contact",
            section: "Go To",
            shortcut: ["c"],
            keywords: "contact email touch message",
            icon: <Mailbox className="h-4 w-4"/>,
            perform: () => router.push('/contact'),
        },
    ]
    
    const generatedActions: Action[] = [
        ...actions,
        ...posts.map((post) => ({
            id: post._raw.flattenedPath,
            name: post.title,
            parent: "blog",
            section: "Blog",
            keywords: post.tags?.join(" ") || "article post",
            icon: <Newspaper className="h-4 w-4"/>,
            perform: () => router.push(`blog/${post._raw.flattenedPath.replace(/posts\/?/, '')}`),
        })),
    ]

    return (
        <KBarProvider 
            actions={generatedActions}
            options={{
                enableHistory: true,
            }}
        >
            <KBarPortal>
                <KBarPositioner className="bg-background/10 backdrop-blur-sm p-4">
                    <KBarAnimator>
                        <KBarSearch className="w-96 p-4 bg-background border-b text-primary rounded-t-sm border-t border-x border-border outline-0"/>
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    )
}
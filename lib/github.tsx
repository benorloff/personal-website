import React from "react";
import { 
    ArrowUpFromLine, 
    BookOpenCheck, 
    BookPlus, 
    FileCode, 
    FlagTriangleRight, 
    GitBranch, 
    GitPullRequestArrow, 
    Heart, 
    MessageCircleCode, 
    PackageCheck, 
    Star, 
    Trash2, 
    User 
} from "lucide-react";

const baseUrl = 'https://api.github.com';
const username = 'benorloff';

interface GithubEvent {
    event: string;
    outputText: string;
    icon: React.ReactNode;
}

export const githubEventTypes: GithubEvent[] = [
    {
        event: 'CreateEvent',
        outputText: 'created',
        icon: <BookPlus size={16} />,
    },
    {
        event: 'DeleteEvent',
        outputText: 'deleted',
        icon: <Trash2 size={16} />,
    },
    {
        event: 'ForkEvent',
        outputText: 'forked',
        icon: <GitBranch size={16} />,
    },
    {
        event: 'GollumEvent',
        outputText: 'edited a wiki',
        icon: <FileCode size={16} />,
    },
    {
        event: 'IssuesEvent',
        outputText: 'opened an issue',
        icon: <FlagTriangleRight size={16} />,
    },
    {
        event: 'IssueCommentEvent',
        outputText: 'commented on an issue',
        icon: <MessageCircleCode size={16} />,
    },
    {
        event: 'MemberEvent',
        outputText: 'added a collaborator',
        icon: <User size={16} />,
    },
    {
        event: 'PublicEvent',
        outputText: 'open sourced',
        icon: <BookOpenCheck size={16} />,
    },
    {
        event: 'PullRequestEvent',
        outputText: 'opened a pull request',
        icon: <GitPullRequestArrow size={16} />,
    },
    {
        event: 'PullRequestReviewEvent',
        outputText: 'reviewed a pull request',
        icon: <GitPullRequestArrow size={16} />,
    },
    {
        event: 'PullRequestReviewCommentEvent',
        outputText: 'commented on a pull request',
        icon: <GitPullRequestArrow size={16} />,
    },
    {
        event: 'PullRequestReviewThreadEvent',
        outputText: 'commented on a pull request thread',
        icon: <GitPullRequestArrow size={16} />,
    },
    {
        event: 'PushEvent',
        outputText: 'pushed to',
        icon: <ArrowUpFromLine size={16} />,
    },
    {
        event: 'ReleaseEvent',
        outputText: 'released',
        icon: <PackageCheck size={16} />,
    },
    {
        event: 'SponsorshipEvent',
        outputText: 'sponsored',
        icon: <Heart size={16} />,
    },
    {
        event: 'WatchEvent',
        outputText: 'starred',
        icon: <Star size={16} />,
    },
];

export const getRecentGithubEvents = async ({
    per_page,
    page,
}: {
    per_page: number;
    page: number;
}) => {
    const params = new URLSearchParams({
        per_page: per_page ? per_page.toString() : '30',
        page: page ? page.toString() : '1',
    })
    let data;
    try {
        const res = await fetch(`${baseUrl}/users/${username}/events?${params}`);
        data = await res.json();
    } catch (e) {
        console.error(e);
    }
    return data;
};
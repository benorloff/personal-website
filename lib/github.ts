import React, { cache } from "react";
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
}

export const githubEventTypes: GithubEvent[] = [
    {
        event: 'CreateEvent',
        outputText: 'created',
    },
    {
        event: 'DeleteEvent',
        outputText: 'deleted',
    },
    {
        event: 'ForkEvent',
        outputText: 'forked',
    },
    {
        event: 'GollumEvent',
        outputText: 'edited a wiki',
    },
    {
        event: 'IssuesEvent',
        outputText: 'opened an issue',
    },
    {
        event: 'IssueCommentEvent',
        outputText: 'commented on an issue',
    },
    {
        event: 'MemberEvent',
        outputText: 'added a collaborator',
    },
    {
        event: 'PublicEvent',
        outputText: 'open sourced',
    },
    {
        event: 'PullRequestEvent',
        outputText: 'opened a pull request',
    },
    {
        event: 'PullRequestReviewEvent',
        outputText: 'reviewed a pull request',
    },
    {
        event: 'PullRequestReviewCommentEvent',
        outputText: 'commented on a pull request',
    },
    {
        event: 'PullRequestReviewThreadEvent',
        outputText: 'commented on a pull request thread',
    },
    {
        event: 'PushEvent',
        outputText: 'pushed to',
    },
    {
        event: 'ReleaseEvent',
        outputText: 'released',
    },
    {
        event: 'SponsorshipEvent',
        outputText: 'sponsored',
    },
    {
        event: 'WatchEvent',
        outputText: 'starred',
    },
];

export const preload = ({
    per_page,
    page,
}: {
    per_page: number;
    page: number;
}) => {
    void getRecentGithubEvents({ per_page, page });
}

export const getRecentGithubEvents = cache(async ({
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
});
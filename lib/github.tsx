import { ArrowUpFromLine, BookPlus } from "lucide-react";
import React from "react";

const baseUrl = 'https://api.github.com';
const username = 'benorloff';

interface GithubEvent {
    event: string;
    outputText: string;
    icon: React.ReactNode;
}

// TODO: Add icons to all event types
export const githubEventTypes: GithubEvent[] = [
    {
        event: 'CreateEvent',
        outputText: 'created',
        icon: <BookPlus />,
    },
    {
        event: 'DeleteEvent',
        outputText: 'deleted',
        icon: 'trash',
    },
    {
        event: 'ForkEvent',
        outputText: 'forked',
        icon: 'git-branch',
    },
    {
        event: 'GollumEvent',
        outputText: 'edited a wiki',
        icon: 'book-open',
    },
    {
        event: 'IssuesEvent',
        outputText: 'opened an issue',
        icon: 'issue-opened',
    },
    {
        event: 'IssueCommentEvent',
        outputText: 'commented on an issue',
        icon: 'comment',
    },
    {
        event: 'MemberEvent',
        outputText: 'added a collaborator',
        icon: 'user-follow',
    },
    {
        event: 'PublicEvent',
        outputText: 'open sourced',
        icon: 'repo',
    },
    {
        event: 'PullRequestEvent',
        outputText: 'opened a pull request',
        icon: 'git-pull-request',
    },
    {
        event: 'PullRequestReviewEvent',
        outputText: 'reviewed a pull request',
        icon: 'git-pull-request',
    },
    {
        event: 'PullRequestReviewCommentEvent',
        outputText: 'commented on a pull request',
        icon: 'comment-discussion',
    },
    {
        event: 'PullRequestReviewThreadEvent',
        outputText: 'commented on a pull request thread',
        icon: 'comment-discussion',
    },
    {
        event: 'PushEvent',
        outputText: 'pushed to',
        icon: <ArrowUpFromLine />,
    },
    {
        event: 'ReleaseEvent',
        outputText: 'released',
        icon: 'tag',
    },
    {
        event: 'SponsorshipEvent',
        outputText: 'sponsored',
        icon: 'heart',
    },
    {
        event: 'WatchEvent',
        outputText: 'starred',
        icon: 'star',
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
    const res = await fetch(`${baseUrl}/users/${username}/events?${params}`);
    const data = await res.json();
    return data;
};
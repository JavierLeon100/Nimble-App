import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
    query GetAllTasks($homeId: String) {
        getAllTasks(homeId: $homeId) {
            _id
            title
            date
            img
            notes
            rewardPoints
            urgent
            focusMode
            childId
            homeId
            status
        }
    }
`;

export const GET_TASKS_BY_CHILD = gql`
    query GetTasksByChild($childId: String) {
        getTasksByChild(childId: $childId) {
            status
            childId
            homeId
            focusMode
            urgent
            rewardPoints
            notes
            img
            date
            title
            _id
        }
    }
`;

export const GET_CHILDREN = gql`
    query GetChildren($homeId: String) {
        getChildren(homeId: $homeId) {
            name
            _id
        }
    }
`;

export const GET_REWARDS = gql`
    query GetAllRewards($homeId: String) {
        getAllRewards(homeId: $homeId) {
            _id
            title
            cost
            img
            url
            notes
            homeId
            childId
        }
    }
`;

export const GET_ACTIVITY = gql`
    query GetActivity($homeId: String) {
        getActivity(homeId: $homeId) {
            activity
            homeId
        }
    }
`;

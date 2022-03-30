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

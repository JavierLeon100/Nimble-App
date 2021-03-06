import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CreateTask($task: TaskInput) {
        createTask(task: $task) {
            _id
            title
            date
            img
            notes
            rewardPoints
            urgent
            focusMode
            homeId
            childId
            status
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($task: TaskInput, $updateTaskId: String) {
        updateTask(task: $task, id: $updateTaskId) {
            _id
            title
            date
            img
            notes
            rewardPoints
            urgent
            focusMode
            homeId
            childId
            status
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: String) {
        deleteTask(id: $deleteTaskId)
    }
`;

export const CREATE_REWARD = gql`
    mutation CreateReward($reward: RewardInput) {
        createReward(reward: $reward) {
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

export const CREATE_ACTIVITY = gql`
    mutation CreateActivity($activity: ActivityInput) {
        createActivity(activity: $activity) {
            homeId
            activity
        }
    }
`;

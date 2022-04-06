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

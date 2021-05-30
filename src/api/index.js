import {loginUser, registerUser} from "./LoginApi";
import {fetchExercises} from "./ExerciseApi";
import {
    createTrainingPlan, deleteTrainingPlan, editTrainingPlan,
    fetchTrainingPlans, getUserTrainingPlans
} from "./TrainingPlanApi";
import {
    getPlanExercises,
    addExerciseToTrainingPlan,
    deleteExerciseFromTrainingPlan,
    updateExerciseFromTrainingPlan
} from './TrainingPlanExerciseApi'
import {addRun, deleteRun, updateRun, getUserRuns, getAnalize} from "./RunStatisticApi";
import {
    getStatisticToPlan,
    addStatisticToPlan,
    deleteStatisticFromPlan,
    updateStatisticInPlan
} from "./planStatisticApi";

export {
    loginUser,
    registerUser,
    fetchExercises,
    createTrainingPlan,
    deleteTrainingPlan,
    editTrainingPlan,
    fetchTrainingPlans,
    getUserTrainingPlans,
    getPlanExercises,
    addExerciseToTrainingPlan,
    addRun,
    deleteRun,
    updateRun,
    getUserRuns,
    getAnalize,
    deleteExerciseFromTrainingPlan,
    updateExerciseFromTrainingPlan,
    getStatisticToPlan,
    addStatisticToPlan,
    deleteStatisticFromPlan,
    updateStatisticInPlan
}

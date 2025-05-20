import { API_ENDPOINTS } from '../config/api';
import { PerformanceGoal, TeamPerformance, PerformanceGoalCreate, PerformanceGoalUpdate } from '../types/performance';
import { fetchApi } from './api';
export const performanceService = {
  getAllGoals: () => fetchApi<PerformanceGoal[]>(`${API_ENDPOINTS.performance}/goals`),
  getTeamPerformance: () => fetchApi<TeamPerformance[]>(`${API_ENDPOINTS.performance}/teams`),
  createGoal: (goal: PerformanceGoalCreate) => fetchApi<PerformanceGoal>(`${API_ENDPOINTS.performance}/goals`, {
    method: 'POST',
    body: JSON.stringify(goal)
  }),
  updateGoal: (id: number, goal: PerformanceGoalUpdate) => fetchApi<PerformanceGoal>(`${API_ENDPOINTS.performance}/goals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(goal)
  }),
  deleteGoal: (id: number) => fetchApi<void>(`${API_ENDPOINTS.performance}/goals/${id}`, {
    method: 'DELETE'
  })
};
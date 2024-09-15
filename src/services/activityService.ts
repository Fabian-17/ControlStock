import { Activity } from '../models/activity';
import { ActivityDetails } from '../models/activityDetails';
import { AppError } from '../utils/errorService';



export class ActivityService {

  public async getActivities(): Promise<Activity[]> {
    try {
      const activities = await Activity.findAll({
        include: [
          {
            model: ActivityDetails,
            as: 'activityDetails',
          },
        ],
      });
      return activities;
    } catch (error: unknown) {
      throw new AppError('Error getting activities', 500);
    };
  };


  public async getActivityById(id: number): Promise<Activity | null> {
    try {
      const activity = await Activity.findByPk(id, {
        include: [
          {
            model: ActivityDetails,
            as: 'activityDetails',
          },
        ],
      });
      return activity;
    } catch (error: unknown) {
      throw new AppError('Error getting activity', 500);
    };
  };


  public async createActivity(activityData: Partial<Activity> ): Promise<Activity> {
    try {
      const activity = await Activity.create(activityData);
      return activity;
    } catch (error: unknown) {
      throw new AppError('Error creating activity', 500);
    };
  };


  public async updateActivity(id: number, activityData: Partial<Activity>): Promise<Activity | null> {
    try {
      const activity = await Activity.findByPk(id);
      if (!activity) throw new AppError('Activity not found', 404);
      await activity.update(activityData);
      return activity;
    } catch (error: unknown) {
      throw new AppError('Error updating activity', 500);
    };
  };


  public async deleteActivity(id: number): Promise<void> {
    try {
      const activity = await Activity.findByPk(id);
      if (!activity) throw new AppError('Activity not found', 404);
      await activity.destroy();
    } catch (error: unknown) {
      throw new AppError('Error deleting activity', 500);
    };
  };


  public async createActivityDetails(detailsData: Partial<ActivityDetails>): Promise<ActivityDetails> {
    try {
      const activityDetails = await ActivityDetails.create(detailsData);
      return activityDetails;
    } catch (error: unknown) {
      throw new AppError('Error creating activity details', 500);
    };
  };
};
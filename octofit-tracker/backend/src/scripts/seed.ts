import mongoose, { Types } from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userProfiles = [
      { name: 'Mona Octocat', email: 'mona@example.com', age: 16 },
      { name: 'Terry Octocat', email: 'terry@example.com', age: 17 },
    ];
    const users = await Promise.all(
      userProfiles.map(async (profile) => {
        const existingUser = await User.findOne({ email: profile.email });
        return existingUser ?? User.create(profile);
      }),
    );

    let team = await Team.findOne({ name: 'Octocats' });
    if (!team) {
      team = await Team.create({ name: 'Octocats', description: 'Mergington fitness team' });
    }
    for (const user of users) {
      if (!team.memberIds.some((memberId: Types.ObjectId) => memberId.equals(user._id))) {
        team.memberIds.push(user._id);
      }
      if (!user.teamId) {
        user.teamId = team._id;
        await user.save();
      }
    }
    await team.save();

    const seedDay = new Date();
    seedDay.setUTCHours(0, 0, 0, 0);
    const activities = [
      {
        userId: users[0]._id,
        type: 'running' as const,
        durationMinutes: 25,
        distanceKm: 3.2,
        points: 32,
      },
      {
        userId: users[1]._id,
        type: 'walking' as const,
        durationMinutes: 35,
        distanceKm: 2.4,
        points: 24,
      },
    ];
    for (const activity of activities) {
      const existingActivity = await Activity.findOne({
        userId: activity.userId,
        type: activity.type,
        performedAt: seedDay,
      });
      if (!existingActivity) {
        await Activity.create({ ...activity, performedAt: seedDay });
      }
    }

    const leaderboardEntries = [
      { userId: users[0]._id, points: 32, rank: 1 },
      { userId: users[1]._id, points: 24, rank: 2 },
    ];
    let leaderboard = await Leaderboard.findOne({
      name: 'Weekly Octocats Challenge',
      period: 'weekly',
    });
    if (!leaderboard) {
      leaderboard = await Leaderboard.create({
        name: 'Weekly Octocats Challenge',
        period: 'weekly',
        entries: leaderboardEntries,
      });
    } else {
      leaderboard.entries = leaderboardEntries;
      await leaderboard.save();
    }

    const workouts = [
      {
        title: 'Easy Run',
        description: 'A steady outdoor run at a comfortable pace.',
        category: 'running' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 20,
      },
      {
        title: 'Brisk Walk',
        description: 'A continuous walk with a brisk, sustainable pace.',
        category: 'walking' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 30,
      },
      {
        title: 'Bodyweight Circuit',
        description: 'A short circuit of squats, push-ups, and lunges.',
        category: 'strength' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 15,
      },
    ];
    for (const workout of workouts) {
      const existingWorkout = await Workout.findOne({ title: workout.title });
      if (!existingWorkout) {
        await Workout.create(workout);
      }
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();

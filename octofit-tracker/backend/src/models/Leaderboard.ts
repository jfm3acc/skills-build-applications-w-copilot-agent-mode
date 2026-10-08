import { model, models, Schema } from 'mongoose';

const LeaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const LeaderboardSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' },
    entries: { type: [LeaderboardEntrySchema], default: [] },
  },
  { timestamps: true },
);

export default models.Leaderboard || model('Leaderboard', LeaderboardSchema);
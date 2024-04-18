export const EVENT_STATE = {
  ACTIVE: 'active',
  FAILED: 'failed',
  WAITING: 'waiting',
  RESUMED: 'resumed',
  CLEANED: 'cleaned',
  REMOVED: 'removed',
  PROGRESS: 'progress',
  COMPLETED: 'completed',
};

export const EVENT_STATE_OPTIONS = [
  { title: 'All', value: '' },
  { title: 'Active', value: EVENT_STATE.ACTIVE },
  { title: 'Failed', value: EVENT_STATE.FAILED },
  { title: 'Waiting', value: EVENT_STATE.WAITING },
  { title: 'Resumed', value: EVENT_STATE.RESUMED },
  { title: 'Removed', value: EVENT_STATE.REMOVED },
  { title: 'Cleaned', value: EVENT_STATE.CLEANED },
  { title: 'Progress', value: EVENT_STATE.PROGRESS },
  { title: 'Completed', value: EVENT_STATE.COMPLETED },
];